import { GridState } from "../State/GridState"

export class DuplicationError{
    num:number
    cellIndexes:number[]
    type:string
    mxIndex:number
    constructor(num:number, cellIndexes:number[], type:string, mxIndex:number){
        this.num = num
        this.cellIndexes = cellIndexes
        this.type = type
        this.mxIndex = mxIndex
    }
}
export class Validator{
    static validate = (draft:GridState): DuplicationError[] => {
        let duplicationErrors:DuplicationError[] = checkForDuplicates(draft.sdkValues)
        return duplicationErrors
    }
    static checkSDKValues = (gridState:GridState) =>{
        let sdkErrors:number[] = []
        gridState.sdkValues.forEach((value:number, index:number) => {
            if( value !== 0 && value !== gridState.answers[index]) { sdkErrors.push(index) }
        })
        return sdkErrors
    }
}
export abstract class CellMatrix{
    index:number
    sdkValues:number[]
    rows:number
    columns:number
    type:string
    constructor(index:number, sdkValues:number[], rows:number, columns:number, type:string){
        this.index = index
        this.sdkValues = sdkValues
        this.rows = rows
        this.columns = columns
        this.type = type
    } 
    getBounds = () => {
        let x0 = Math.floor(this.index/this.rows) * this.rows
        let x1 = x0 + (this.rows - 1)
        let y0 = (this.index % this.rows) * this.columns
        let y1 = y0 + (this.columns - 1)
        return[x0, x1, y0, y1]
    }   
    getCellIndexes = ():number[] => {
        let cellsInRow:number = 9
        let cellIndexes:number[] = []
        let [x0, x1, y0, y1] = this.getBounds()
        for(let x = x0; x <= x1; x++){
            for(let y = y0; y <= y1; y++){
                let num = (x * cellsInRow) + y
                cellIndexes.push(num)
            }  
        }
        return cellIndexes
    }
    getCellValues = ():number[] => {
        const cellIndexes:number[] = this.getCellIndexes()
        return cellIndexes.map((cellIndex:number) => {
            return this.sdkValues[cellIndex]
        })
    }
    getIndexesContainingNumber = (num:number) => {
        let indexesWithNumber:number[] = this.getCellIndexes().filter((cellIndex:number) => {
            return this.sdkValues[cellIndex] === num
        })
        return indexesWithNumber
    }
    getDuplicationErrors = ():DuplicationError[] => {
        const numbersTried:number[] = []
        const dupeErrors:DuplicationError[] = []
        let cellValues:number[] = this.getCellValues()
        cellValues.forEach((cellValue:number)=>{
            let hasBeenTried:boolean = numbersTried.includes(cellValue)
            if(cellValue !== 0 && !hasBeenTried){
                numbersTried.push(cellValue)
                let indexesContainingNumber:number[] = this.getIndexesContainingNumber(cellValue)
                if(indexesContainingNumber.length > 1){
                    let dupeError:DuplicationError = new DuplicationError(cellValue,indexesContainingNumber, this.type, this.index )
                    dupeErrors.push(dupeError)
                }
            }
        })
        return dupeErrors
    }
}
export class BoxMatrix extends CellMatrix{
    constructor(index:number, sdkValues:number[]){
        super(index, sdkValues, 3, 3, 'box')
    } 
}
export class RowMatrix extends CellMatrix{
    constructor(index:number, sdkValues:number[]){
        super(index, sdkValues, 1, 9, 'row')
    } 
}
export class ColumnMatrix extends CellMatrix{
    constructor(index:number, sdkValues:number[]){
        super(index, sdkValues, 9, 1, 'column')
    } 
}
export const checkForDuplicates = function(sdkValues:number[]):DuplicationError[] {
    let dupeErrors:DuplicationError[] = []
    let matrices:CellMatrix[] = []
    for(let i = 0; i < 9; i++){
        matrices.push(new BoxMatrix(i, sdkValues))
        matrices.push(new ColumnMatrix(i, sdkValues))
        matrices.push(new RowMatrix(i, sdkValues))
    }
    matrices.forEach((cellMatrix)=>{
        let mxDupeErrors:DuplicationError[] = cellMatrix.getDuplicationErrors()
        if(mxDupeErrors.length > 0){
            dupeErrors = dupeErrors.concat(mxDupeErrors)
        }
    })
    return dupeErrors
}