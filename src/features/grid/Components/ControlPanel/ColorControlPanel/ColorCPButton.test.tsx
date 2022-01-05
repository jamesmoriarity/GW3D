import * as hooks from "../../../../../app/hooks";
import * as handlers from "../../../gridSlice";
import { fireEvent, RenderResult } from "@testing-library/react";
import { renderWithAppStore } from "../../../../../TestUtil/RenderWithAppStore";
import { ColorCPButton } from "./ColorCPButton";
import { clearDom } from "../../../../../TestUtil/clearDom";
import { SpyManager } from "../../../../../TestUtil/SpyManager";

let spyManager:SpyManager
export const setSpies = function(){
  spyManager = new SpyManager()
}
describe("Color Control Panel Button", () => {
  beforeEach(()=>{
    setSpies()
  })
  afterEach(()=>{
    spyManager.restoreSpies()
    clearDom()
  })
  it("renders", () => {
    const mockColor:string = "bg-light-pink";
    const renderResult = renderButtonWithColor(mockColor)
    expect(button_did_render_with(mockColor, renderResult))
  });
  it("dispatches its color when clicked", ()=>{
    const mockColor:string = "bg-light-pink";
    const mockClickHandler = jest.fn()
    const renderResult = renderButtonWithColor(mockColor, mockClickHandler)
    const node = renderResult.getAllByRole("button")[0]
    expect(node).toBeTruthy()
    fireEvent.click(node);
    expect(mockClickHandler).toBeCalledTimes(1)
    expect(mockClickHandler).toBeCalledWith(mockColor)
  })
});

export const renderButtonWithColor = function(mockColor:string, mockClickHandler:any  | null= null){
  if(!mockClickHandler){ mockClickHandler = jest.fn() }
  const renderResult:RenderResult = renderWithAppStore(<ColorCPButton clickHandler={mockClickHandler} colorClass={mockColor}/>); 
  return renderResult
  }
  export const button_did_render_with = function(mockColor:string, renderResult:RenderResult){        
    const node = renderResult.container.querySelector("button") // find by tag name
    expect(node).toBeTruthy()
    expect(node?.classList.contains(mockColor))
  }
  export const button_dispatched_handleInput_with = function(mockColor:string, renderResult:RenderResult){
    const node = renderResult.getAllByRole("button")[0]
    expect(node).toBeTruthy()
    fireEvent.click(node);
    // expect that 
  }

