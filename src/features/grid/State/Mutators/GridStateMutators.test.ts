import { INPUTMODE_COLORS, INPUTMODE_VALUES } from "../../Util/GridInputModes"
import { DuplicationError } from "../../Util/Validator"
import { GridState, GridStateUtil, PatchSet } from "../GridState"
import { applyDupeErrorsToDraft, goToNextStep, goToPrevStep, handleCellSelection, setCenterNotes, setColors, setPencilNotes, setSDKValues, trimFuture } from "./GridStateMutators"

describe("trimFuture",
()=>{
    let state:GridState
    it('trimFuture trims all history entries after curson', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState() 
        state.history = testHistory // 2
        state.history.push(testHistory[0])
        state.history.push(testHistory[0]) // 4
        state.historyCursor = 1 
        trimFuture(state)
        expect(state.history.length).toBe(state.historyCursor + 1)
    })
    it('trimFuture does nothing if cursor is at the end', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState() 
        state.history = testHistory // has two items
        expect(state.history.length).toBe(2)
        state.history.push(testHistory[0])
        state.history.push(testHistory[0])
        expect(state.history.length).toBe(4)
        state.historyCursor = 3 
        trimFuture(state)
        expect(state.history.length).toBe(4)
    })
})
describe('applyDupeErrorsToDraft', ()=>{
    it('adds entries to invalid rows and cells',()=>{
        const mockRowId:number = 0
        const mockNum:number = 9
        const mockDupeErrorIndexes:number[] = [0,4]
        const mockDupeType:string = 'row'
        let d = new DuplicationError( mockNum, mockDupeErrorIndexes, mockDupeType, mockRowId )
        const mockRowId2:number = 3
        const mockNum2:number = 9
        const mockDupeErrorIndexes2:number[] = [27,31]
        const mockDupeType2:string = 'row'
        let d2 = new DuplicationError( mockNum2, mockDupeErrorIndexes2, mockDupeType2, mockRowId2 )
        let s:GridState = GridStateUtil.getInitialState()
        applyDupeErrorsToDraft([d,d2], s)
        expect(s.inValidCellIndexes.length).toBe(4)
        expect(s.inValidCellIndexes).toStrictEqual(mockDupeErrorIndexes.concat(mockDupeErrorIndexes2))
        expect(s.inValidRowIndexes.length).toBe(2)
        expect(s.inValidRowIndexes[0]).toBe(mockRowId)
        expect(s.inValidRowIndexes[1]).toBe(mockRowId2)
        expect(s.inValidColumnIndexes.length).toBe(0)
        expect(s.inValidBoxIndexes.length).toBe(0)
        // get a state, make some dupe errors
        // expect that after applyDupeErrorsToDraft, there would be invalid cells etc...
    }),
    it('adds entries to invalid column and cells',()=>{
        const mockColId:number = 0
        const mockNum:number = 9
        const mockDupeErrorIndexes:number[] = [0,27]
        const mockDupeType:string = 'column'
        let d = new DuplicationError( mockNum, mockDupeErrorIndexes, mockDupeType, mockColId )
        let s:GridState = GridStateUtil.getInitialState()
        applyDupeErrorsToDraft([d], s)
        expect(s.inValidCellIndexes.length).toBe(mockDupeErrorIndexes.length)
        expect(s.inValidCellIndexes).toStrictEqual(mockDupeErrorIndexes)
        expect(s.inValidColumnIndexes.length).toBe(1)
        expect(s.inValidColumnIndexes[0]).toBe(mockColId)
        expect(s.inValidRowIndexes.length).toBe(0)
        expect(s.inValidBoxIndexes.length).toBe(0)
        // get a state, make some dupe errors
        // expect that after applyDupeErrorsToDraft, there would be invalid cells etc...
    }),
    it('adds entries to invalid box and cells',()=>{
        const mockBoxId:number = 0
        const mockNum:number = 9
        const mockDupeErrorIndexes:number[] = [0,10]
        const mockDupeType:string = 'box'
        let d = new DuplicationError( mockNum, mockDupeErrorIndexes, mockDupeType, mockBoxId )
        let s:GridState = GridStateUtil.getInitialState()
        applyDupeErrorsToDraft([d], s)
        expect(s.inValidCellIndexes.length).toBe(mockDupeErrorIndexes.length)
        expect(s.inValidCellIndexes[0]).toBe(mockDupeErrorIndexes[0])
        expect(s.inValidCellIndexes[1]).toBe(mockDupeErrorIndexes[1])
        expect(s.inValidCellIndexes).toStrictEqual(mockDupeErrorIndexes)
        expect(s.inValidBoxIndexes.length).toBe(1)
        expect(s.inValidBoxIndexes[0]).toBe(mockBoxId)
        // get a state, make some dupe errors
        // expect that after applyDupeErrorsToDraft, there would be invalid cells etc...
    })
})
describe("cell mutators",
()=>{ 
    it('sets sdkvalues on selected cells', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.selectedCellIndexes = [0,1,2,8]
        let futureState:GridState = setSDKValues(state, {payload:9, type:'grid/updateSDKValues'})
        for(let i = 0; i < 81; i++){
            const expectedValue:number = (futureState.selectedCellIndexes.includes(i)) ? 9 : 0
            expect(futureState.sdkValues[i]).toBe(expectedValue)
        }
        expect(futureState.history.length).toBe(1)
    })
    it('sets colors on selected cells', () => {
        const mockBackground:string = 'test-bg'
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.selectedCellIndexes = [0,1,2,3]
        let futureState:GridState = setColors(state, {payload:mockBackground, type:'grid/updateColors'})
        for(let i = 0; i < 81; i++){
            const expectedValue:string = (futureState.selectedCellIndexes.includes(i)) ? mockBackground : ''
            expect(futureState.colorClasses[i]).toBe(expectedValue)
        }
    })
    it('sets pencil notes on selected cells', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.selectedCellIndexes = [0,1,2,3]
        let futureState:GridState = setPencilNotes(state, {payload:9, type:'grid/updatePencilNotes'})
        for(let i = 0; i < 81; i++){
            const expectedLength:number = (futureState.selectedCellIndexes.includes(i)) ? 1 : 0
            expect(futureState.pencilNotes[i].length).toBe(expectedLength)
            if(expectedLength === 1){
                expect(futureState.pencilNotes[i][0]).toBe(9)
            }
        }
    })
    it('sets center notes on selected cells', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.selectedCellIndexes = [0,1,2,3]
        let futureState:GridState = setCenterNotes(state, {payload:9, type:'grid/updateCenterNotes'})
        for(let i = 0; i < 81; i++){
            const expectedLength:number = (futureState.selectedCellIndexes.includes(i)) ? 1 : 0
            expect(futureState.centerNotes[i].length).toBe(expectedLength)
            if(expectedLength === 1){
                expect(futureState.centerNotes[i][0]).toBe(9)
            }
        }
    })
})
describe("selection mutators",
    ()=>{ 
    it('does single selection when meta is false', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.selectedCellIndexes = [0,1,2,3]
        handleCellSelection(state, {type:'grid/handleCellSelection', payload:{index:55, meta:false}})
        expect(state.selectedCellIndexes).toStrictEqual([55])
    })
    it('unselects all when selected is clicked and meta is false', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.selectedCellIndexes = [0,1,2,3]
        handleCellSelection(state, {type:'grid/handleCellSelection', payload:{index:1, meta:false}})
        expect(state.selectedCellIndexes).toStrictEqual([])
    })
    it('unselects only one when selected is clicked and meta is true', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.selectedCellIndexes = [0,1,2,3]
        handleCellSelection(state, {type:'grid/handleCellSelection', payload:{index:1, meta:true}})
        expect(state.selectedCellIndexes).toStrictEqual([0,2,3])
    })
    it('does multiple selection when meta is true', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.selectedCellIndexes = [0,1,2,3]
        handleCellSelection(state, {type:'grid/handleCellSelection', payload:{index:55, meta:true}})
        expect(state.selectedCellIndexes).toStrictEqual([0,1,2,3,55])
    })
})
describe("history mutators",
()=>{ 
    it('goes to next step', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.history = [...testHistory]
        let newState = goToNextStep(state)
        expect(newState.historyCursor).toBe(0)
    })
    it('doesnt go to next step if theres no next step', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.history = [...testHistory]
        state.historyCursor = 3
        let newState = goToNextStep(state)
        expect(newState.historyCursor).toBe(3)
    })
    it('goes to prev step', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.history = [...testHistory]
        state.historyCursor = 1
        let newState = goToPrevStep(state)
        expect(newState.historyCursor).toBe(0)
    })
    it('goes nowhere if no prev step', ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.history = [...testHistory]
        state.historyCursor = -1
        let newState = goToPrevStep(state)
        expect(newState.historyCursor).toBe(-1)
    })
})

export const testHistory:PatchSet[] = [
  {patches:[], inversePatches:[]},
  {patches:[], inversePatches:[]},
  {patches:[], inversePatches:[]},
  {patches:[], inversePatches:[]}
]