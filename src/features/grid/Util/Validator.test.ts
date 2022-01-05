import { GridState, GridStateUtil } from "../State/GridState";
import { DuplicationError, Validator } from "./Validator";
describe("Validator", () => {
    it("finds no duplicates in valid arrays", ()=>{
        let sdkValues:number[] = GridStateUtil.getEasyGrid()
        let duplicationErrors = Validator.validate(GridStateUtil.getInitialState())
        expect(duplicationErrors.length).toBe(0)
    })
    it("finds box and row duplicates in invalid arrays", ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.sdkValues[0] = 5
        state.sdkValues[1] = 5
        let duplicationErrors = Validator.validate(state)
        expect(duplicationErrors.length).toBe(2) // two fives in same row, two fives in same box
        let errorTypes:string[] = duplicationErrors.map((e:DuplicationError) => {
            return e.type
        })
        expect(errorTypes.includes('box')).toBeTruthy()
        expect(errorTypes.includes('row')).toBeTruthy()
        expect(errorTypes.includes('column')).toBeFalsy()
    })
    it("finds box duplicates in invalid arrays", ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.sdkValues[0] = 6
        state.sdkValues[10] = 6
        let duplicationErrors = Validator.validate(state)
        expect(duplicationErrors.length).toBe(1)
        expect(duplicationErrors[0].type).toBe('box')
        expect(duplicationErrors[0].num).toBe(6)
    })
    it("finds row duplicates in invalid arrays", ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.sdkValues[0] = 5
        state.sdkValues[3] = 5
        let duplicationErrors = Validator.validate(state)
        expect(duplicationErrors.length).toBe(1)
        expect(duplicationErrors[0].type).toBe('row')
        expect(duplicationErrors[0].num).toBe(5)
    })
    it("finds column duplicates in invalid arrays", ()=>{
        let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
        state.sdkValues[0] = 9
        state.sdkValues[36] = 9
        let duplicationErrors = Validator.validate(state)
        expect(duplicationErrors.length).toBe(1)
        expect(duplicationErrors[0].type).toBe('column')
        expect(duplicationErrors[0].num).toBe(9)
    })
    it("generates no errors when there are no incorrect sdk values", ()=>{
        let state:GridState = GridStateUtil.getInitialState()
        let letSDKErrors:number[] = Validator.checkSDKValues(state)
        expect(letSDKErrors.length).toBe(0)
        // item 2 anything but 7
        state.sdkValues[2] = 1
    })
    it("generates errors for each incorrect sdk value", ()=>{
        let state:GridState = GridStateUtil.getInitialState()
        state.sdkValues[2] = 1
        let letSDKErrors:number[] = Validator.checkSDKValues(state)
        expect(letSDKErrors.length).toBe(1)
        // item 2 anything but 7
    })
    it("generates errors for each correct sdk value", ()=>{
        let mainState:GridState = GridStateUtil.getInitialState()
        for(let index:number = 0; index < 81; index++){
            let correctValue:number = mainState.answers[index]
            for(let i:number = 0; i <= 9; i++){
                let state:GridState = GridStateUtil.getInitialState() // with easy puzzle loaded
                state.sdkValues[index] = i
                let letSDKErrors:number[] = Validator.checkSDKValues(state)
                const errLength:number = (i === correctValue || i === 0) ? 0 : 1
                expect(letSDKErrors.length).toBe(errLength)
                if(errLength > 0){
                    expect(letSDKErrors[0]).toBe(index)
                }
            }
        }
    })
  });