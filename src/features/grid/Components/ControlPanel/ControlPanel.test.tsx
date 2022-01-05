import { RenderResult } from "@testing-library/react";
import *  as modes from "../../Util/GridInputModes";
import { renderWithAppStore } from "../../../../TestUtil/RenderWithAppStore";
import { clearDom } from "../../../../TestUtil/clearDom";
import { ControlPanel } from "./ControlPanel";

afterEach(()=>{
  clearDom()
})
describe("Control Panel", () => {
  it("renders mode selector and reset always", () => {
    const renderResult:RenderResult = renderWithAppStore(<ControlPanel inputMode={modes.INPUTMODE_VALUES} />);
    const modeSelector = renderResult.container.querySelector('.mode-selector')
    expect(modeSelector).toBeDefined()
    const resetButton = renderResult.container.querySelector('.reset')
    expect(resetButton).toBeDefined()
  });
  it("renders color control panel when mode === color", () => {
    const renderResult:RenderResult = renderWithAppStore(<ControlPanel inputMode={modes.INPUTMODE_COLORS} />);
    renderedColorControlPanel(renderResult)
    didntRenderNumberControlPanel(renderResult)
  });
  it("renders number control panel when mode === values", () => {
    const renderResult:RenderResult = renderWithAppStore(<ControlPanel inputMode={modes.INPUTMODE_VALUES} />);
    renderedNumberControlPanel(renderResult)
    didntRenderColorControlPanel(renderResult)
  });
  it("renders number control panel when mode === centers", () => {
    const renderResult:RenderResult = renderWithAppStore(<ControlPanel inputMode={modes.INPUTMODE_CENTERS} />);
    renderedNumberControlPanel(renderResult)
    didntRenderColorControlPanel(renderResult)
  });
  it("renders number control panel when mode === pencils", () => {
    const renderResult:RenderResult = renderWithAppStore(<ControlPanel inputMode={modes.INPUTMODE_PENCILS} />);
    renderedNumberControlPanel(renderResult)
    didntRenderColorControlPanel(renderResult)
  });
});
export const renderedNumberControlPanel = function(renderResult:RenderResult){
    const modeSelector = renderResult.container.querySelector('.number-control-panel')
    expect(modeSelector).toBeDefined()
}
export const didntRenderNumberControlPanel = function(renderResult:RenderResult){
    const modeSelector = renderResult.container.querySelector('.number-control-panel')
    expect(modeSelector).toBeNull()
}
export const renderedColorControlPanel = function(renderResult:RenderResult){
    const modeSelector = renderResult.container.querySelector('.color-control-panel')
    expect(modeSelector).toBeDefined()
}
export const didntRenderColorControlPanel = function(renderResult:RenderResult){
    const modeSelector = renderResult.container.querySelector('.color-control-panel')
    expect(modeSelector).toBeNull()
}
