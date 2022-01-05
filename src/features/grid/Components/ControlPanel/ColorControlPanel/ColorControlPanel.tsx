import { ColorCPButton } from "./ColorCPButton";
export const colorChoices:string[] = [
    'bg-light-pink', 'bg-light-purple', 'bg-light-blue',
    'bg-light-green', 'bg-light-yellow', 'bg-light-orange'
]
export interface ColorControlPanelProps{
    inputMode:string,
    clickHandler:Function
}
export function ColorControlPanel(props:ColorControlPanelProps){
    const colorButtons:JSX.Element[] = colorChoices.map((colorChoice:string) => {
        return <ColorCPButton colorClass={colorChoice} key={colorChoice} clickHandler={props.clickHandler}/>
    })
    return (      
        <div className="color-control-panel">
            {colorButtons}
            <button className="clear" onClick={(e) => { props.clickHandler('')}}>clear</button>
        </div>
    )
}