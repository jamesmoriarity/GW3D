import { RenderResult } from "@testing-library/react";
import { Grid } from "./Grid";
import { renderWithAppStore } from "../../../../TestUtil/RenderWithAppStore";

test("renders grid of 81 cells with outlines and control panel", () => {
  const renderResult:RenderResult = renderWithAppStore(<Grid />);
  const cellGroup = renderResult.container.querySelector(".cells-group");
  expect(cellGroup).toBeTruthy()
  if(cellGroup){
    expect(cellGroup.childNodes.length).toEqual(81);
  }
  const controlPanel = renderResult.container.querySelector('.control-panel')
  expect(controlPanel).toBeDefined()
  const outlines = renderResult.container.querySelector('.outlines')
  expect(outlines).toBeDefined()
});
