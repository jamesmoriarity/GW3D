import { store } from "../../../../app/store"
import { GridState, GridStateUtil} from "../GridState"
import {    
    selectColorClasses, selectGrid, selectIndex, 
    selectInvalidObjects, selectIsPuzzleValid, 
    selectSelectedCellIndexes, selectState } from "./GridStateSelectors"

describe('testing grid state selectors',()=>{
    describe("testing selectIsPuzzleValid selector",
    ()=>{   
        it('selects IsValid to be false when invalid cell indexes exist', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            state.inValidCellIndexes = [1,2,3]
            let expected_isValid:boolean = ( state.inValidCellIndexes.length === 0 )
            let result_isValid:boolean = selectIsPuzzleValid.resultFunc(state)
            expect(result_isValid).toBe(expected_isValid)
        })   
        it('selects IsValid to be true when no invalid cell indexes exist', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            state.inValidCellIndexes = []
            let expected_isValid:boolean = ( state.inValidCellIndexes.length === 0 )
            let result_isValid:boolean = selectIsPuzzleValid.resultFunc(state)
            expect(result_isValid).toBe(expected_isValid)
        })
    })
    describe("testing selectInvalidObjects selector", ()=>{ 
        it('selectInvalidObjects returns all invalid arrays',()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            state.inValidCellIndexes = [16]
            state.inValidBoxIndexes = [2]
            state.inValidRowIndexes = [1]
            state.inValidColumnIndexes = [8]
            let [inValidCellIndexes, inValidBoxIndexes, inValidRowIndexes, inValidColumnIndexes] = 
                selectInvalidObjects.resultFunc(state)
            expect(inValidCellIndexes).toStrictEqual([16])
            expect(inValidBoxIndexes).toStrictEqual([2])
            expect(inValidRowIndexes).toStrictEqual([1])
            expect(inValidColumnIndexes).toStrictEqual([8])
        })
    })

    describe("testing selectState selector", ()=>{    
        it('selectInputMode returns state', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let expectedState:GridState = state
            let resultInputMode:string = selectState(state)
            expect(resultInputMode).toBe(expectedState)
        })
    })
    describe("testing selectState selector", ()=>{    
        it('selectState returns state', ()=>{
            let appState = store.getState()
            let expected_appState = appState
            let result_appState = selectState(appState)
            expect(result_appState).toBe(expected_appState)
        })
    })
    describe("testing selectGrid selector", ()=>{    
        it('selectGrid returns state.grid', ()=>{
            let appState = store.getState()
            let expected_grid = appState.grid
            let result_grid = selectGrid(appState)
            expect(result_grid).toBe(expected_grid)
        })
    })
    describe("testing selectIndex selector", ()=>{    
        it('selectIndex returns index sent in', ()=>{
            let appState = store.getState()
            let expected_index = 0
            let result_index = selectIndex(appState, expected_index)
            expect(result_index).toBe(expected_index)
        })
    })
    describe("testing selectSelectedCellIndexes selector", ()=>{    
        it('selectSelectedCellIndexes returns selectedCells', ()=>{
            let appState = store.getState()
            let newGrid:GridState = GridStateUtil.getBlankPuzzleInitialState()
            newGrid.selectedCellIndexes = []
            appState.grid = newGrid
            let expected = newGrid.selectedCellIndexes
            let result = selectSelectedCellIndexes(appState)
            expect(result).toStrictEqual(expected)
        }),
        it('selectSelectedCellIndexes returns selectedCells', ()=>{
            let appState = store.getState()
            let newGrid:GridState = GridStateUtil.getBlankPuzzleInitialState()
            newGrid.selectedCellIndexes = [1,2,3]
            appState.grid = newGrid
            let expected = newGrid.selectedCellIndexes
            let result = selectSelectedCellIndexes(appState)
            expect(result).toStrictEqual(expected)
        })
    })
    describe("testing selectColorClasses selector", ()=>{    
        it('selectColorClasses returns colorClasses when blank', ()=>{
            let appState = store.getState()
            let newGrid:GridState = GridStateUtil.getBlankPuzzleInitialState()
            newGrid.colorClasses = []
            appState.grid = newGrid
            let expected = newGrid.colorClasses
            let result = selectSelectedCellIndexes(appState)
            expect(result).toStrictEqual(expected)
        }),    
        it('selectColorClasses returns colorClasses when they exist', ()=>{
            let appState = store.getState()
            let newGrid:GridState = GridStateUtil.getBlankPuzzleInitialState()
            newGrid.colorClasses = ['bg-pink', 'bg-yellow']
            appState.grid = newGrid
            let expected = newGrid.colorClasses
            let result = selectColorClasses(appState)
            expect(result).toStrictEqual(expected)
        })
    })
})