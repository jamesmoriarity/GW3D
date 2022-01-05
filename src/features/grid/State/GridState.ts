import { Patch } from "immer";
export interface PatchSet{
    patches:Patch[],
    inversePatches:Patch[]
}
export interface GridState {
    sdkValues: number[],
    initialNumbers: number[]
    centerNotes: number[][],
    pencilNotes: number[][],
    selectedCellIndexes: number[],
    colorClasses:string[],
    inValidCellIndexes: number[],
    inValidRowIndexes: number[],
    inValidColumnIndexes: number[],
    inValidBoxIndexes: number[],
    history:any[],
    historyCursor:number,
    answers:number[]
}
export class GridStateUtil {
    static getInitialState(): GridState {
        let gs:GridState = {
            sdkValues: GridStateUtil.getEasyGrid(),
            initialNumbers: GridStateUtil.getEasyGrid(),
            centerNotes: GridStateUtil.buildEmptyNotes(),
            pencilNotes: GridStateUtil.buildEmptyNotes(),
            colorClasses:GridStateUtil.buildEmptyClasses(),
            selectedCellIndexes: [],
            inValidCellIndexes: [],
            inValidBoxIndexes: [],
            inValidRowIndexes: [],
            inValidColumnIndexes: [],
            history: [],
            historyCursor:-1,
            answers:GridStateUtil.getEasyGridAnswers()
        }
        return gs
    }
    static getBlankPuzzleInitialState():GridState {
        let initState:GridState = GridStateUtil.getInitialState()
        initState.initialNumbers = GridStateUtil.buildEmptyGrid()
        initState.sdkValues = initState.initialNumbers
        return initState
    }

    static buildEmptyGrid() {
        const grid: number[] = []
        for (let i = 0; i < 81; i++) {
            grid.push(0)
        }
        return grid
    }
    static stringToGrid(puzzleString: string) {
        const stringArray: string[] = puzzleString.split('')
        const numArray: number[] = stringArray.map(
            (s: string) => { return parseInt(s) }
        )
        return numArray
    }
    static getEasyGridAnswers() {
        const answer:string = '527831649894672531163549827738415962651928374249763185382157496475396218916284753'
        return GridStateUtil.stringToGrid(answer)
    }
    static getEasyGrid() {
        const puzzleString: string = "520800640804672531003000020008000000000908070240060185380057490470306000910000003"
        return GridStateUtil.stringToGrid(puzzleString)
    }
    static buildEmptyNotes = () => {
        const grid: number[][] = []
        for (let i = 0; i < 81; i++) {
            grid.push([])
        }
        return grid
    }
    static buildEmptyClasses = () => {
        const grid: string[] = []
        for (let i = 0; i < 81; i++) {
            grid.push('')
        }
        return grid
    }
}