import { fireEvent, RenderResult } from "@testing-library/react";
import { renderWithAppStore } from "../../../../TestUtil/RenderWithAppStore";
import { clearDom } from "../../../../TestUtil/clearDom";
import { ResetButton } from "./ResetButton";
import { SpyManager } from "../../../../TestUtil/SpyManager";

let spyManager:SpyManager
const setSpies = function(){
  spyManager = new SpyManager()
}

describe("Number Control Panel Button", () => {
  beforeEach(()=>{
    setSpies()
  })
  afterEach(()=>{
    spyManager.restoreSpies()
    clearDom()
  })
  it("renders", () => {
    expect(button_did_render(renderButton()))
  });
  it("dispatches handleReset with number when clicked", ()=>{
    const mockNumber:number = 9;
    expect(button_dispatched_handleReset(renderButton()))
  })
});

export const renderButton = function(){
  const renderResult:RenderResult = renderWithAppStore(<ResetButton />); 
  return renderResult
}
export const button_did_render = function(renderResult:RenderResult){        
    const node = renderResult.container.querySelector("button") // find by tag name
    expect(node).toBeTruthy()
    if(node){
        expect(node.innerHTML).toEqual("Reset Puzzle")
    } 
}
export const button_dispatched_handleReset = function(renderResult:RenderResult){
    const node = renderResult.getAllByRole("button")[0]
    expect(node).toBeTruthy()
    if(node){
        fireEvent.click(node);
        expect(spyManager.dispatchSpy).toHaveBeenCalledTimes(1);
        expect(spyManager.dispatchSpy).toHaveBeenCalledWith({type:'grid/reset', payload:undefined});
    }

}
