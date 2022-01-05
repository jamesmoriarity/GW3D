import { MouseEventHandler } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { prevStep, nextStep } from "../../gridSlice"
import { historyHasNext, historyHasPrev } from "../../State/Selectors/HistorySelectors"


export const HistoryControls = function(){
    const dispatch = useAppDispatch()
    const prevClickHandler:MouseEventHandler<HTMLElement> = (e:React.MouseEvent) => { 
        dispatch(prevStep()) 
    }
    const nextClickHandler:MouseEventHandler<HTMLElement> = (e:React.MouseEvent) => { 
        dispatch(nextStep()) 
    }
    const hasPrev:boolean = useAppSelector(historyHasPrev)
    const hasNext:boolean = useAppSelector(historyHasNext)
    return(
        <div>
        <button disabled={!hasPrev} onClick={prevClickHandler}>Previous</button>
        <button disabled={!hasNext} onClick={nextClickHandler}>Next</button>
        </div>
    )
}