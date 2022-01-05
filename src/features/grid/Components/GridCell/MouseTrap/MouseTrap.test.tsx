import * as hooks from "../../../../../app/hooks";
import * as selectors from "../../../State/Selectors/CellSelectors";
import { fireEvent, RenderResult } from "@testing-library/react";
import { MouseTrap } from "./MouseTrap";
import { renderSVGElmWithAppStore } from "../../../../../TestUtil/RenderSVGElmWithAppStore";
import { clearDom } from "../../../../../TestUtil/clearDom";
import { SpyManager } from "../../../../../TestUtil/SpyManager";

let appSelectorSpy:   jest.SpyInstance
let isSelectedSpy:    jest.SpyInstance
let spyManager:       SpyManager
const setUpSpies = function(){
  spyManager        = new SpyManager()
  appSelectorSpy    = spyManager.addSpy(hooks, "useAppSelector")
  isSelectedSpy     = spyManager.addSpy(selectors, "selectIsSelected");
}
describe("MouseTrap Test", () => {
  beforeEach(()=>{
    setUpSpies()
  })
  afterEach(()=>{
    spyManager.restoreSpies()
    clearDom()
  })
  it("calls isSelected selector, renders correctly", () => {
    let mockIndex:number = 0
    isSelectedSpy.mockReturnValue(true)
    const renderResult:RenderResult = renderMouseTrap(mockIndex)
    expect(appSelectorSpy).toHaveBeenCalledTimes(1);
    expect(isSelectedSpy).toHaveBeenCalledTimes(2); //selectors get called twice
    expect(isSelectedSpy).toHaveBeenCalledWith(expect.anything(), mockIndex);
  });
  it("fires click event, dispatches to selectHandler", () => {
    let mockIndex:number = 10
    const renderResult:RenderResult = renderMouseTrap(mockIndex)
    const button = renderResult.getAllByRole("button")[0]
    expect(button).toBeTruthy()
    fireEvent.click(button);
    expect(spyManager.dispatchSpy).toHaveBeenCalledTimes(1);
    expect(spyManager.dispatchSpy).toHaveBeenCalledWith({type:'grid/handleSelectCell', payload:{ index: mockIndex, meta: false }});
  });
});

export const renderMouseTrap = function(id:number){
  return renderSVGElmWithAppStore(<MouseTrap id={id} />);
}



