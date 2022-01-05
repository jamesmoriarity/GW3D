import { DuplicationError, Validator } from "../../Util/Validator";
import { GridState, GridStateUtil} from "../GridState";
import { enablePatches, produce, applyPatches, Patch } from '@reduxjs/toolkit/node_modules/immer';
import { isOriginal } from "../Selectors/CellSelectors";
import { historyCursorAtStart, historyCursorAtEnd } from "../Selectors/HistorySelectors";
import { PayloadAction } from "@reduxjs/toolkit";

enablePatches()

export const resetPuzzle = function(state: GridState){
    state.sdkValues             = state.initialNumbers
    state.centerNotes           = GridStateUtil.buildEmptyNotes()
    state.pencilNotes           = GridStateUtil.buildEmptyNotes()
    state.colorClasses          = GridStateUtil.buildEmptyClasses()
    state.selectedCellIndexes   = []
    state.inValidCellIndexes    = []
    state.inValidBoxIndexes     = []
    state.inValidRowIndexes     = []
    state.inValidColumnIndexes  = []
}
export interface handlSelectionPayload{
    index:number, 
    meta:boolean
}
export const handleCellSelection = function (state: GridState, action:any) {
    (action.payload.meta) ? selectCell(state, action.payload.index) : singleSelectCell(state, action.payload.index)
}
export const goToPrevStep = function(state:GridState){
    if(historyCursorAtStart(state)){ return state }
    let futureState = {...state}
    let inversePatches = futureState.history[futureState.historyCursor].inversePatches
    futureState.historyCursor--
    futureState = applyPatches(futureState, inversePatches)
    return futureState
}
export const goToNextStep = function(state:GridState){
    if(historyCursorAtEnd(state)){ return state }
    let futureState = {...state}
    futureState.historyCursor++
    let forwardPatches = futureState.history[futureState.historyCursor].patches
    futureState = applyPatches(futureState, forwardPatches)
    return futureState
}
// sub handlers
export const setColors = function(state: GridState, action: PayloadAction<string>) {
    let futureState:GridState = {...state}
    produce(
        futureState,
        (draft:GridState) => setColorsInDraft(draft, action.payload),
        (patches:Patch[], iPatches:Patch[]) => {
            futureState = {...applyWithHistory(futureState, patches, iPatches)}
        }
    )
    return futureState
}
export const setSDKValues = function(state: GridState, action: PayloadAction<number>) {
    let futureState:GridState = {...state}
    produce(
        futureState, 
        (draft:GridState) => setValuesToDraft(draft, action.payload), 
        (patches:Patch[], iPatches:Patch[]) => {
            futureState = applyWithHistory(futureState, patches, iPatches)
        }
    )
    return futureState
}
export const setPencilNotes = function(state: GridState, action: PayloadAction<number>) {
    let futureState:GridState = {...state}
    produce(
        state,
        (draft:GridState) => setPencilNotesInDraft(draft, action.payload),
        (patches:Patch[], iPatches:Patch[]) => 
            futureState = applyWithHistory(futureState, patches, iPatches)
    )
    return futureState
}
export const setCenterNotes = function(state: GridState, action: PayloadAction<number>) {
    let futureState:GridState = {...state}
    produce(
        state,
        (draft:GridState) => setCenterNotesOnDraft(draft, action.payload),
        (patches:Patch[], iPatches:Patch[]) => 
            futureState = applyWithHistory(futureState, patches, iPatches)
    )
    return futureState
}
export const setColorsInDraft = function(draft:GridState, color:string){
    draft.selectedCellIndexes.forEach((cellIndex: number) => {
        draft.colorClasses[cellIndex] = color
    }) 
}
export const trimFuture = function(state:GridState){
    if(state.history.length === 0){ return }
    if( state.historyCursor === state.history.length - 1 ){ return }
    state.history.splice(state.historyCursor + 1)
}
export const selectCell = function(state: GridState, cellIndex: number) {
    addOrRemoveElement(state.selectedCellIndexes, cellIndex)
}
export const singleSelectCell = function(state: GridState, cellIndex: number) {
    const indexes = state.selectedCellIndexes
    if (indexes.includes(cellIndex)) {
        state.selectedCellIndexes = []
        return
    }
    state.selectedCellIndexes = [cellIndex]
}
export const applyDupeErrorsToDraft = function(duplicationErrors:DuplicationError[], draft:GridState){
    let invalidCells:Set<number> = new Set()
    let invalidBoxes:Set<number> = new Set()
    let invalidRows:Set<number> = new Set()
    let invalidColumns:Set<number> = new Set()
    duplicationErrors.forEach((dupeError:DuplicationError) => {
        dupeError.cellIndexes.forEach((cellIndex:number) => {
            invalidCells.add(cellIndex)
        })
        let groupSet = (dupeError.type === "box") ? invalidBoxes : (dupeError.type === "row") ? invalidRows : (dupeError.type === "column") ? invalidColumns : null
        groupSet?.add(dupeError.mxIndex)
    })
    draft.inValidCellIndexes = Array.from(invalidCells)
    draft.inValidBoxIndexes = Array.from(invalidBoxes)
    draft.inValidRowIndexes = Array.from(invalidRows)
    draft.inValidColumnIndexes = Array.from(invalidColumns)
}
export const setValuesToDraft = function(draft:GridState, value:number){
    draft.selectedCellIndexes.forEach((cellIndex: number) => {
        if(isOriginal(draft, cellIndex)){ return }
        draft.sdkValues[cellIndex] = value
    })
    // naive validation: look for duplication errors
    let duplicationErrors = Validator.validate(draft)
    applyDupeErrorsToDraft(duplicationErrors, draft)
    // look for wrong answers if auto-check
    let wrongAnswerIndexes:number[] = Validator.checkSDKValues(draft)
    wrongAnswerIndexes.forEach((cellIndex:number)=>{
        if(!draft.inValidCellIndexes.includes(cellIndex)){
            draft.inValidCellIndexes.push(cellIndex)
        }
    })
}
export const setPencilNotesInDraft = function(draft: GridState, pencilValue: number) {
    draft.selectedCellIndexes.forEach((cellIndex: number) => {
        let cellPencilNotes: number[] = [...draft.pencilNotes[cellIndex]]
        addOrRemoveElement(cellPencilNotes, pencilValue)
        cellPencilNotes.sort(function (a, b) { return a - b; });
        draft.pencilNotes[cellIndex] = cellPencilNotes
    })
}
export const setCenterNotesOnDraft = function(draft: GridState, centerValue: number) {
    draft.selectedCellIndexes.forEach((cellIndex: number) => {
        let cellCenterNotes: number[] = [...draft.centerNotes[cellIndex]]
        addOrRemoveElement(cellCenterNotes, centerValue)
        cellCenterNotes.sort(function (a, b) { return a - b; });
        draft.centerNotes[cellIndex] = cellCenterNotes
    })   
}
export const applyWithHistory = function(state: GridState, forwardPatches:Patch[], inversePatches:Patch[]){
    let futureState = addToHistory(state, forwardPatches, inversePatches)
    return applyPatches(futureState, forwardPatches)
}
export const addToHistory = function(state:GridState, patches:Patch[], inversePatches:Patch[]){
    let futureState:GridState = {...state}
    produce(
        futureState, 
        (draft:GridState)=>{
            trimFuture(draft)
            draft.history.push({patches:patches, inversePatches:inversePatches})
            draft.historyCursor = draft.history.length - 1
        },
        (patches:Patch[], iPatches:Patch[])=>{
            futureState = applyPatches(futureState, patches)
        }
    )
    return futureState
}
export const addOrRemoveElement = function(array: number[], num: number) {
    const position = array.indexOf(num);
    if (position > -1) {
        array.splice(position, 1);
        return
    }
    array.push(num)
}
