import * as hooks from "../../../../../app/hooks";
import * as selectors from "../../../State/Selectors/CellSelectors";
import { RenderResult } from "@testing-library/react";
import { baseClassName, CenterNotes} from "./CenterNotes";
import { renderSVGElmWithAppStore } from "../../../../../TestUtil/RenderSVGElmWithAppStore";
import { clearDom } from "../../../../../TestUtil/clearDom";
import { SpyManager } from "../../../../../TestUtil/SpyManager";

const queryPath:string = 'text.' + baseClassName

let appSelectorSpy:jest.SpyInstance
let centerNotesSpy:jest.SpyInstance
let spyManager:SpyManager
const setUpSpies = function(){
  spyManager = new SpyManager()
  appSelectorSpy = spyManager.addSpy(hooks, "useAppSelector");
  centerNotesSpy = spyManager.addSpy(selectors, "selectCellCenterNotes");
}

describe("CenterNotes Test", () => {
  afterEach(()=>{
    spyManager.restoreSpies()
    clearDom()
  })
  beforeEach(()=>{
    setUpSpies()
  })
  it("calls appSelector and selectCellCenterNotes correctly", () => {
    const mockValue:number[] = []
    const centerNode = renderCenterNotesNode(mockValue)
    expect(appSelectorSpy).toHaveBeenCalledTimes(1);
    expect(centerNotesSpy).toHaveBeenCalledTimes(2);
    expect(centerNotesSpy).toHaveBeenCalledWith(expect.anything(), 0);
  });
  it("renders when there are centernotes", () => {
    const mockValue = [7, 8, 9]
    const centerNode = renderCenterNotesNode(mockValue)
    expect(centerNode).toBeTruthy()
    if(centerNode){
      expect(centerNode.innerHTML).toEqual(mockValue.join(''));
    }
  });
  it("doesn't render when there are no centernotes", () => {
    const mockValue: number[] = [];
    const centerNode = renderCenterNotesNode(mockValue)
    expect(centerNode).toBeFalsy()
  });
});
export const renderCenterNotesNode = function(mockValue:number[], testId:number = 0){
  centerNotesSpy.mockReturnValue(mockValue);
  const renderResult:RenderResult = renderSVGElmWithAppStore(<CenterNotes id={testId} />)
  const cellCenterNode = renderResult.container.querySelector(queryPath);
  return cellCenterNode
}
