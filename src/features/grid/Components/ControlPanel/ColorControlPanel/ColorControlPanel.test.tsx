import { RenderResult } from "@testing-library/react";
import { ColorControlPanel } from "./ColorControlPanel";
import { renderWithAppStore } from "../../../../../TestUtil/RenderWithAppStore";
import { clearDom } from "../../../../../TestUtil/clearDom";
import { INPUTMODE_COLORS } from "../../../Util/GridInputModes";

describe("Color Control Panel Test", () => {
  afterEach(()=>{
    clearDom()
  })
  it("renders", () => {
    const renderResult = renderWithAppStore(<ColorControlPanel clickHandler={jest.fn()} inputMode={INPUTMODE_COLORS} />)
    expect(panel_didRender(renderResult))
  });
});

const nodeClass:string = "color-control-panel"
export const panel_didRender = function(renderResult:RenderResult){
  const panelNodes = renderResult.container.getElementsByClassName(nodeClass);
  expect(panelNodes.length).toBe(1)
}
