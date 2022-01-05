import { INPUTMODE_CENTERS, INPUTMODE_PENCILS, INPUTMODE_VALUES } from "../../../Util/GridInputModes";
import { NumberCPButton } from "./NumberCPButton";
export interface NumberControlPanelProps{
    inputMode:string,
    clickHandler:Function
}

const shouldRender = function(mode:string):boolean{
    let modesForRendering:string[] = [INPUTMODE_VALUES, INPUTMODE_CENTERS, INPUTMODE_PENCILS]
    return modesForRendering.includes(mode)
}
const render = function(props:any){
    let numberButtons:number[] = [1,2,3,4,5,6,7,8,9]
    if(props.inputMode === INPUTMODE_VALUES){ 
        numberButtons = [1,2,3,4,5,6,7,8,9,0]    
    }
    const buttons:JSX.Element[] = numberButtons.map((num:number) => {
        return <NumberCPButton clickHandler={props.clickHandler} num={num} key={num}/>
    })
    return(      
        <div className="number-control-panel">
            {buttons}
        </div>
    )
}
export function NumberControlPanel(props:NumberControlPanelProps){
    if( shouldRender(props.inputMode) ) return render(props)
    return null
}