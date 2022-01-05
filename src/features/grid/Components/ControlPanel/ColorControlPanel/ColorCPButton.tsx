import { MouseEventHandler } from "react"
export interface ColorCPButtonProps{
    colorClass:string,
    clickHandler:Function
}
export function ColorCPButton(props:ColorCPButtonProps){
    const clickHandler:MouseEventHandler<HTMLElement> = (e:React.MouseEvent) => { 
        props.clickHandler(props.colorClass)
      }
    return(
        <button className={props.colorClass} onClick={clickHandler}>.</button>
    )
}
