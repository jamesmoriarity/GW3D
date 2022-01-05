import { useAppSelector } from "../../../../app/hooks"
import { selectInvalidObjects } from "../../State/Selectors/GridStateSelectors"

export const InvalidGridShapes = function(){
    // get invalid shapes from a selector
    let [invalidCells, invalidBoxes, invalidRows, invalidColumns] = useAppSelector(selectInvalidObjects)
    return(
        <g id="invalid-grid-shapes">
            <g id="invalid-rows">
                {invalidRows.map((rowIndex:number)=>{
                    return <rect className={'row-' + rowIndex} key={rowIndex}></rect>
                })}
            </g>
            <g id="invalid-columns">
                {invalidColumns.map((columnIndex:number)=>{
                    return <rect className={'column-' + columnIndex} key={columnIndex} />
                })}
            </g>
            <g id="invalid-boxes">
                {invalidBoxes.map((boxIndex:number)=>{
                    return <rect className={'box-' + boxIndex} key={boxIndex} />
                })}
            </g>
            <g id="invalid-cells">
                {invalidCells.map((cellIndex:number)=>{
                    return <rect className={'cell-' + cellIndex} key={cellIndex} />
                })}
            </g>
        </g>
    )

}