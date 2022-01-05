import { store } from "../../../../app/store"
import { GridState, GridStateUtil} from "../GridState"
import * as cellSelectors from "./CellSelectors"

describe('testing cell selectors',()=>{
    describe("testing selectIsCellValid selector",
    ()=>{   
        it('selects invalid if inValidCellIndexes contains mockCellIndex', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            state.inValidCellIndexes = [1,2,3]
            let mockCellIndex:number = 1
            let expected_isValid:boolean = false
            let result_isValid:boolean = cellSelectors.selectIsCellValid.resultFunc(state, mockCellIndex)
            expect(result_isValid).toBe(expected_isValid)
        })   
        it('selects valid if inValidCellIndexes does not contain mockCellIndex', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            state.inValidCellIndexes = [2,3]
            let mockCellIndex:number = 1
            let expected_isValid:boolean = true
            let result_isValid:boolean = cellSelectors.selectIsCellValid.resultFunc(state, mockCellIndex)
            expect(result_isValid).toBe(expected_isValid)
        })
    })
    describe("testing selectGridValues selector",
    ()=>{   
        it('selects all sdk values from gridstate.values', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let mockIndex:number = 55
            let mockSDKValue:number = 9
            state.sdkValues[mockIndex] = mockSDKValue
            let result_array:number[] = cellSelectors.selectGridSDKValues.resultFunc(state)
            expect(result_array).toStrictEqual(state.sdkValues)
        }) 
    })
    describe("testing selectCellValue selector",
    ()=>{   
        it('selects a cells sdk value from gridstate.values[i]', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let mockIndex:number = 55
            let mockSDKValue:number = 9
            state.sdkValues[mockIndex] = mockSDKValue
            let result_sdkValue:number = cellSelectors.selectCellSDKValue.resultFunc(state, mockIndex)
            expect(result_sdkValue).toBe(mockSDKValue)
        }) 
    })
    describe("testing selectGridCenterNotes selector",
    ()=>{   
        it('selects all center notes from grid', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let mockIndex:number = 5
            let mockSDKValue:number[] = [9]
            state.centerNotes[mockIndex] = mockSDKValue
            let result_notes:number[][] = cellSelectors.selectGridCenterNotes.resultFunc(state)
            expect(result_notes[mockIndex]).toStrictEqual(mockSDKValue)
            expect(result_notes.length).toBe(81)
            let emptyNotes:number[][] = result_notes.filter( (notes:number[]) => ( notes.length === 0 ) )
            expect(emptyNotes.length).toBe(80)
            let filledNotes:number[][] = result_notes.filter( (notes:number[]) => ( notes.length !== 0 ) )
            expect(filledNotes.length).toBe(1)
        }) 
    })
    describe("testing selectGridPencilNotes selector",
    ()=>{   
        it('selects all pencil notes from grid', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let mockIndex:number = 5
            let mockSDKValue:number[] = [9]
            state.pencilNotes[mockIndex] = mockSDKValue
            let result_notes:number[][] = cellSelectors.selectGridPencilNotes.resultFunc(state)
            expect(result_notes[mockIndex]).toStrictEqual(mockSDKValue)
            expect(result_notes.length).toBe(81)
            let emptyNotes:number[][] = result_notes.filter( (notes:number[]) => ( notes.length === 0 ) )
            expect(emptyNotes.length).toBe(80)
            let filledNotes:number[][] = result_notes.filter( (notes:number[]) => ( notes.length !== 0 ) )
            expect(filledNotes.length).toBe(1)
        }) 
    })  
    describe("testing selectCellCenterNotes selector",
    ()=>{   
        it('selects a cell center notes from grid', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let mockIndex:number = 5
            let mockSDKValue:number[] = [9]
            state.centerNotes[mockIndex] = mockSDKValue
            let result_notes:number[] = cellSelectors.selectCellCenterNotes.resultFunc(state, mockIndex)
            expect(result_notes).toStrictEqual(mockSDKValue)
        }) 
    })  
    describe("testing selectCellPencilNotes selector",
    ()=>{   
        it('selects a cell pencil notes from grid', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let mockIndex:number = 5
            let mockSDKValue:number[] = [9]
            state.pencilNotes[mockIndex] = mockSDKValue
            let result_notes:number[] = cellSelectors.selectCellPencilNotes.resultFunc(state, mockIndex)
            expect(result_notes).toStrictEqual(mockSDKValue)
        }) 
    })   
    describe("testing selectIsSelected selector",
    ()=>{   
        it('selects isSelected true on a cell, if in selectedCellIndexes', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let mockIndex:number = 5
            state.selectedCellIndexes = [mockIndex]
            let result_isSelected:boolean = cellSelectors.selectIsSelected.resultFunc(state, mockIndex)
            expect(result_isSelected).toBe(true)
        })   
        it('selects isSelected false on a cell if not in selectedCellIndexes', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let mockIndex:number = 5
            state.selectedCellIndexes = [7,8,9]
            let result_isSelected:boolean = cellSelectors.selectIsSelected.resultFunc(state, mockIndex)
            expect(result_isSelected).toBe(false)
        }) 
    })    
    describe("testing selectCellBackgroundClass selector",
    ()=>{   
        it('selects isSelected true on a cell, if in selectedCellIndexes', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let mockIndex:number = 5
            let mockColor:string = 'pink'
            state.colorClasses[mockIndex] = mockColor
            let result_class:string = cellSelectors.selectCellBackgroundClass.resultFunc(state, mockIndex)
            expect(result_class).toBe(mockColor)
        }) 
    })
})