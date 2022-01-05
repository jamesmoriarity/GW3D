import { useAppDispatch } from "../../../../app/hooks";
import { reset } from "../../gridSlice";
import { MouseEventHandler } from "react";

export function ResetButton() {
    const dispatch = useAppDispatch();
    const clickHandler:MouseEventHandler<HTMLButtonElement> = (e:React.MouseEvent) => { 
        dispatch(reset()) 
    }
    return (
        <div className="reset">
            <button onClick={clickHandler}>Reset Puzzle</button>
        </div>

    );
}