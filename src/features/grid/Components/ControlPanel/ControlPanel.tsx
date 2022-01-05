import { useAppDispatch} from "../../../../app/hooks";
import { ColorControlPanel } from "./ColorControlPanel/ColorControlPanel";
import { INPUTMODE_COLORS, INPUTMODE_VALUES, INPUTMODE_PENCILS, INPUTMODE_CENTERS } from "../../Util/GridInputModes";
import { NumberControlPanel } from "./NumberControlPanel/NumberControlPanel";
import { ModeSelector } from "../ModeSelector/ModeSelector";
import { ResetButton } from "../ResetButton/ResetButton";
import { AppDispatch } from "../../../../app/store";
import { updateCenters, updateColors, updatePencils, updateSDKValues } from "../../gridSlice";
import { useState } from "react";
import { validateKey } from "../../Util/KeyRules";
export interface ControlPanelProps{
  inputMode:string
}
export function getSubControlPanel(inputMode:string, clickHandler:Function):JSX.Element | null{
    let numberControlPanelModes:string[] = 
      [INPUTMODE_VALUES, INPUTMODE_CENTERS, INPUTMODE_PENCILS]
    if(numberControlPanelModes.includes(inputMode)){
      return <NumberControlPanel inputMode={inputMode} clickHandler={clickHandler}/>
    }
    if(inputMode === INPUTMODE_COLORS){ 
      return <ColorControlPanel inputMode={inputMode} clickHandler={clickHandler} />
    }
    return null
}
export function ControlPanel(props:ControlPanelProps) {
  let initialInputMode:string = (props.inputMode) ? props.inputMode : INPUTMODE_VALUES
  let [inputMode, setInputMode] = useState(initialInputMode)
  const dispatch: AppDispatch = useAppDispatch();
  let onInput:Function = (input:any) => {
    let num:number = parseInt(input) 
    switch(inputMode){
      case INPUTMODE_VALUES:
        if (isNaN(num)){ return }
        dispatch(updateSDKValues(num))
        break;
      case INPUTMODE_CENTERS:
        if (isNaN(num)){ return }
        dispatch(updateCenters(num))
        break;
      case INPUTMODE_PENCILS:
        if (isNaN(num)){ return }
        dispatch(updatePencils(num))
        break;
      case INPUTMODE_COLORS:
        dispatch(updateColors(input))
        break;
    }
  }
  let modeButtonClickHandler = (mode:string) => {
    setInputMode(mode)
  }
  document.onkeydown = function (e) {
    if(inputMode === INPUTMODE_COLORS){ return }
    let validatedKey: number = validateKey(e.key, inputMode);
    if (validatedKey !== -1) {
      onInput(validatedKey);
    }
  };
  return (
    <div className="control-panel">
        <ModeSelector inputModeSetter={modeButtonClickHandler} currentMode={inputMode} />
        {getSubControlPanel(inputMode, onInput)}
        <ResetButton />
    </div>
  );
}