import * as hooks from "../../../../../app/hooks";
import * as selectors from "../../../State/Selectors/CellSelectors";
import { RenderResult } from "@testing-library/react";
import { PencilNotes } from "./PencilNotes";
import { renderSVGElmWithAppStore } from "../../../../../TestUtil/RenderSVGElmWithAppStore";
import { clearDom } from "../../../../../TestUtil/clearDom";
import { SpyManager } from "../../../../../TestUtil/SpyManager";

let pencilNotesSpy:jest.SpyInstance;
let appSelectorSpy:jest.SpyInstance;
let spyManager:SpyManager
const setUpSpies = function(){
  spyManager = new SpyManager()
  appSelectorSpy = spyManager.addSpy(hooks, "useAppSelector")
  pencilNotesSpy = spyManager.addSpy(selectors, "selectCellPencilNotes");
}
describe("PencilNotes Test", () => {
  beforeEach(()=>{
    setUpSpies()
  })
  afterEach(()=>{
    spyManager.restoreSpies()
    clearDom()
  })
  it("calls its selector with {testId} and renders", () => {
    const mockData:number[] = [1,2,3]
    const testId:number = 0
    const renderResult = getNewRenderResult(testId, mockData )
    expect(pencilsSelector_wasCalledWith(testId))
    expect(pencilsComp_didRender(renderResult, mockData))
  });
  it("doesn't render when there are no pencil valure", () => {
    const mockData:number[] = []
    const testId:number = 0
    const renderResult = getNewRenderResult(testId, mockData )
    expect(pencilsSelector_wasCalledWith(testId))
    expect(pencilsComp_nullRendered(renderResult))
  });
});

export const getNewRenderResult = function(testId:number, mockReturn:number[]){
  pencilNotesSpy.mockReturnValue(mockReturn)
  const renderResult:RenderResult = renderSVGElmWithAppStore(<PencilNotes id={testId} />); 
  return renderResult
}
export const pencilsSelector_wasCalledWith = function(testId:number){
  expect(appSelectorSpy).toHaveBeenCalledTimes(1);
  expect(pencilNotesSpy).toHaveBeenCalledTimes(2); //2 for selector (is called twice)
  expect(pencilNotesSpy).toHaveBeenCalledWith(expect.anything(), testId);
}
export const pencilsComp_didRender = function(renderResult:RenderResult, mockReturn:number[]){
  const cellPencilNodes = renderResult.container.getElementsByClassName("cell-pencil-values");
  expect(cellPencilNodes.length).toEqual(1);
  expect(cellPencilNodes[0].innerHTML).toEqual(mockReturn.join(''));
}
export const pencilsComp_nullRendered = function(renderResult:RenderResult){
  const cellPencilNodes = renderResult.container.getElementsByClassName("cell-pencil-values");
  expect(cellPencilNodes.length).toEqual(0);
}
