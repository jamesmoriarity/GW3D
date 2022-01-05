import * as hooks from "../../../../../app/hooks";
import * as selectors from "../../../State/Selectors/GridStateSelectors";
import { RenderResult } from "@testing-library/react";
import { NumberControlPanel } from "./NumberControlPanel";
import *  as modes from "../../../Util/GridInputModes";
import { renderWithAppStore } from "../../../../../TestUtil/RenderWithAppStore";
import { clearDom } from "../../../../../TestUtil/clearDom";
import { SpyManager } from "../../../../../TestUtil/SpyManager";

const nodeClass:string = "number-control-panel"
afterEach(()=>{
  clearDom()
})
describe("Number Control Panel", () => {
  it("renders 1-9 buttons plus delete in values mode", () => {
    let mockInputMode:string = modes.INPUTMODE_VALUES
    let clickHandler:Function = ()=>{}
    const renderResult:RenderResult = renderWithAppStore(<NumberControlPanel inputMode={mockInputMode} clickHandler={clickHandler} />);
    expect(panel_didRenderWithButtons(renderResult, [1,2,3,4,5,6,7,8,9,0]))
  });
  it("renders 1-9 buttons no delete in centers mode", () => {
    let mockInputMode:string = modes.INPUTMODE_PENCILS
    let clickHandler:Function = ()=>{}
    const renderResult:RenderResult = renderWithAppStore(<NumberControlPanel inputMode={mockInputMode} clickHandler={clickHandler}  />);
    expect(panel_didRenderWithButtons(renderResult, [1,2,3,4,5,6,7,8,9]))
  });
  it("renders 1-9 buttons no delete in pencils mode", () => {
    let mockInputMode:string = modes.INPUTMODE_CENTERS
    let clickHandler:Function = ()=>{}
    const renderResult:RenderResult = renderWithAppStore(<NumberControlPanel inputMode={mockInputMode} clickHandler={clickHandler} />);
    expect(panel_didRenderWithButtons(renderResult, [1,2,3,4,5,6,7,8,9]))
  });
});
export const panel_didRenderWithButtons = function(renderResult:RenderResult, buttonValues:number[]){
  const panelNodes = renderResult.container.getElementsByClassName(nodeClass);
  expect(panelNodes.length).toBe(1)
  const buttons = renderResult.container.getElementsByTagName('button')
  expect(buttons.length).toEqual(buttonValues.length)
  buttonValues.forEach((buttonValue:number)=>{
      const textValue:string = (buttonValue === 0) ? "delete" : buttonValue.toString()
      let button = renderResult.getByText(textValue)
      expect(button).toBeTruthy()
  })



}
