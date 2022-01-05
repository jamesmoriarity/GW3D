/*

renders a button with 
    class is either selected or not
    on click of button, dispatchSpy & changeInputModeSpy with props.mode

*/

import * as hooks from "../../../../app/hooks";
import * as handlers from "../../gridSlice";
import * as selectors from "../../State/Selectors/GridStateSelectors"
import { findByText, fireEvent, getByText, RenderResult } from "@testing-library/react";
import { renderWithAppStore } from "../../../../TestUtil/RenderWithAppStore";
import { clearDom } from "../../../../TestUtil/clearDom";
import { ModeSelectorButton } from "./ModeSelectorButton";
import { ALL_INPUTMODES, INPUTMODE_VALUES } from "../../Util/GridInputModes";
import { ModeSelector } from "./ModeSelector";

describe("Mode Selector", () => {
  it("renders with a button for each mode", () => {
    const mockMode:string = INPUTMODE_VALUES;
    const renderResult:RenderResult = renderWithAppStore(<ModeSelector />); 
    const modes:string[] = ALL_INPUTMODES
    modes.forEach(async (mode:string)=>{
        expect(getByText(renderResult.container, mode)).toBeVisible()
    })
  });
});
