import * as hooks from "../../../../../app/hooks";
import * as selectors from "../../../State/Selectors/CellSelectors";
import { RenderResult } from "@testing-library/react";
import { CellBackground, tagName, getClassNames, baseClassName} from "./CellBackground";
import { renderSVGElmWithAppStore } from "../../../../../TestUtil/RenderSVGElmWithAppStore";
import { clearDom } from "../../../../../TestUtil/clearDom";
import { SpyManager } from "../../../../../TestUtil/SpyManager";

let appSelectorSpy:jest.SpyInstance
let bgSelectorSpy:jest.SpyInstance
let selectIsCellValidSpy:jest.SpyInstance
let spyManager:SpyManager
const setUpSpies = function(){
  spyManager = new SpyManager()
  appSelectorSpy = spyManager.addSpy(hooks, "useAppSelector");
  bgSelectorSpy = spyManager.addSpy(selectors, "selectCellBackgroundClass"); 
  selectIsCellValidSpy = spyManager.addSpy(selectors, "selectIsCellValid");
}
describe("CellBackground Test", () => {
  beforeEach(()=>{
    setUpSpies()
  })
  afterEach(()=>{
    spyManager.restoreSpies()
    clearDom()
  })

  it("renders with correct background class", () => {
    let mockId:number = 0
    let mockClassName:string = "bg-light-pink"
    bgSelectorSpy.mockReturnValue(mockClassName)
    const renderResult:RenderResult = renderSVGElmWithAppStore(
        <CellBackground id={mockId} isOriginal={true} />
    );
    allSpiesWereCalledCorrectly(mockId)
    rendersWithClassName(renderResult, mockClassName )
  });
  it("doesn't render when there's no background class", () => {
    let mockId:number = 0
    let mockClassName:string = '' // no class
    bgSelectorSpy.mockReturnValue(mockClassName)
    const renderResult:RenderResult = renderSVGElmWithAppStore(
        <CellBackground id={mockId} isOriginal={false} />
    );
    doesntRender(renderResult)
  });
  it('handles getClassNames color pink, original true, valid true', ()=>{
    let props = {id:1, isOriginal:true}
    let cNames:string = getClassNames(props, 'pink', true)
    expect(cNames.includes('pink')).toBeTruthy()
    expect(cNames.includes('original')).toBeFalsy()
  })
  it('handles getClassNames color empty, original true, valid true', ()=>{
    let props = {id:1, isOriginal:true}
    let cNames:string = getClassNames(props, '', true)
    expect(cNames.includes('original')).toBeTruthy()
  })
  it('handles getClassNames color pink, original true, valid false', ()=>{
    let props = {id:1, isOriginal:true}
    let cNames:string = getClassNames(props, 'pink', false)
    expect(cNames.includes('pink')).toBeTruthy()
    expect(cNames.includes('invalid')).toBeTruthy()
  })
  it('has true statements',()=>{
    expect(baseClassName).toBe('cell-background')
    expect(tagName).toBe('rect')
  })
});

export const rendersWithClassName = function(renderResult:RenderResult, mockClassName:string){
  const bgNode = getBGNode(renderResult)
  expect(bgNode).toBeTruthy();
  if(bgNode){
    expect(bgNode.classList.contains(mockClassName)).toBeTruthy();
  }
}
export const doesntRender = function(renderResult:RenderResult){
  const bgNode = getBGNode(renderResult)
  expect(bgNode).toBeFalsy();
}
export const getBGNode = function(renderResult:RenderResult){
  return renderResult.container.querySelector(tagName + "." + baseClassName);
}
export const allSpiesWereCalledCorrectly = function(mockId:number){
  expect(appSelectorSpy).toHaveBeenCalledTimes(2);
  expect(bgSelectorSpy).toHaveBeenCalledTimes(2);
  expect(bgSelectorSpy).toHaveBeenCalledWith(expect.anything(), mockId);
  expect(selectIsCellValidSpy).toHaveBeenCalledTimes(2);
  expect(selectIsCellValidSpy).toHaveBeenCalledWith(expect.anything(), mockId);
}
