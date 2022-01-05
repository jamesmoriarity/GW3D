import * as hooks from "../../../../../app/hooks";
import * as selectors from "../../../State/Selectors/CellSelectors";
import { RenderResult } from "@testing-library/react";
import { CellSDKValue } from "./CellSDKValue";
import { renderSVGElmWithAppStore } from "../../../../../TestUtil/RenderSVGElmWithAppStore";
import { clearDom } from "../../../../../TestUtil/clearDom";
import { SpyManager } from "../../../../../TestUtil/SpyManager";

let appSelectorSpy:jest.SpyInstance
let selectorSpy:jest.SpyInstance
let spyManager:SpyManager
const setUpSpies = function(){
  spyManager = new SpyManager()
  appSelectorSpy = spyManager.addSpy(hooks, "useAppSelector");
  selectorSpy = spyManager.addSpy(selectors, "selectCellSDKValue");
}
describe("CellValue Test", () => {
  beforeEach(()=>{
    setUpSpies()
  })
  afterEach(()=>{
    spyManager.restoreSpies()
    clearDom()
  })
  it("calls appSelector and selector correctly", ()=>{
    const testId:number = 0; 
    const mockReturn:number = 9;
    const cellValueNode = renderCellValueNode(mockReturn, testId)
    expect(appSelectorSpy).toHaveBeenCalledTimes(1);
    expect(selectorSpy).toHaveBeenCalledTimes(2);
    expect(selectorSpy).toHaveBeenCalledWith(expect.anything(), testId);
  })
  it("renders when the value is 1-9", () => {
    const mockReturn: number = 9;
    const cellValueNode = renderCellValueNode(mockReturn)
    expect(cellValueNode).toBeTruthy()
    if(cellValueNode){
      expect(cellValueNode.innerHTML).toEqual(mockReturn.toString());
    }
  });
  it("doesn't render when cell value is 0", () => {
    const mockReturn: number = 0;
    const cellValueNode = renderCellValueNode(mockReturn)
    expect(cellValueNode).toBeFalsy()
  });
});

export const renderCellValueNode = function(mockReturn:number = 9, testId:number = 0){
  selectorSpy.mockReturnValue(mockReturn)
  const renderResult:RenderResult = renderSVGElmWithAppStore( <CellSDKValue id={testId} /> )
  return renderResult.container.querySelector("text")
}
