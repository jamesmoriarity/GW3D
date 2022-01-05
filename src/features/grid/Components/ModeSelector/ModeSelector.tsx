import { ALL_INPUTMODES } from "../../Util/GridInputModes";
import { ModeSelectorButton } from "./ModeSelectorButton";

export interface ModeSelectorProps{
    inputModeSetter:Function,
    currentMode:string
}

export const ModeSelector = function(props:ModeSelectorProps){
    const buttons:JSX.Element[] = ALL_INPUTMODES.map(
            (mode:string) =>  {
                let isSelected:boolean = props.currentMode === mode
               return <ModeSelectorButton isSelected={isSelected} mode={mode} clickHandler={props.inputModeSetter} key={mode} />
            }
    )
    return (
        <div className="mode-selector">
            { buttons }
        </div>
    )
}