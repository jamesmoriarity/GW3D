import { MouseEventHandler } from "react"

export interface NumberCPButtonProps{
    num:number,
    clickHandler:Function
}
export function NumberCPButton(props:NumberCPButtonProps){
    const butttonTitle:string = (props.num === 0) ? 'delete' : props.num.toString()
    const clickHandler:MouseEventHandler<HTMLElement> = (e:React.MouseEvent) => { 
        props.clickHandler(props.num)
      }
    return(
        <button onClick={clickHandler}>{butttonTitle}</button>
    )
}
