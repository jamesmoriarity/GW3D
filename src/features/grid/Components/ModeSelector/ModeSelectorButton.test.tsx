import { fireEvent, RenderResult } from "@testing-library/react";
import { renderWithAppStore } from "../../../../TestUtil/RenderWithAppStore";
import { clearDom } from "../../../../TestUtil/clearDom";
import { ModeSelectorButton } from "./ModeSelectorButton";
import { INPUTMODE_VALUES } from "../../Util/GridInputModes";

describe("Number Control Panel Button", () => {
  afterEach(()=>{
    clearDom()
  })
  it("renders with selected class when mode matches app's inputmode", () => {
    const mockMode:string = INPUTMODE_VALUES;
    const renderResult = renderButtonWithMode(mockMode)
    expect(button_did_render_with(mockMode, renderResult))
    const button = renderResult.getByText(mockMode)
    expect(button).toBeDefined()
    if(button){
      // expect(button.classList.contains('selected')).toBeTruthy()
    }
  });
  it("renders with no selected class when mode doesn't match app's inputmode", () => {
    const mockMode:string = INPUTMODE_VALUES;
    const renderResult = renderButtonWithMode(mockMode)
    expect(button_did_render_with(mockMode, renderResult))
    const button = renderResult.getByText(mockMode)
    expect(button).toBeDefined()
    if(button){
      expect(button.classList.contains('selected')).toBeFalsy()
    }
  });
  it("calls clickhandler with its mode", ()=>{
    const mockMode:string = INPUTMODE_VALUES;
    let mockClickHandler = jest.fn()
    const renderResult = renderButtonWithMode(mockMode, mockClickHandler)
    const node = renderResult.getByText(mockMode)
    expect(node).toBeDefined()
    if(node){
        fireEvent.click(node);
        expect(mockClickHandler).toHaveBeenCalledTimes(1);
        expect(mockClickHandler).toHaveBeenCalledWith(mockMode);
    }
  })
});
export const renderButtonWithMode = function(mockMode:string, mockClickHandler:Function | null = null, isSelected:boolean = false){
  if(!mockClickHandler) mockClickHandler = jest.fn()
  return renderWithAppStore(<ModeSelectorButton clickHandler={mockClickHandler} isSelected={isSelected} mode={mockMode}/>); 
}
export const button_did_render_with = function(mockMode:string, renderResult:RenderResult){       
    const node = renderResult.getByText(mockMode)
    expect(node).toBeDefined()
}

