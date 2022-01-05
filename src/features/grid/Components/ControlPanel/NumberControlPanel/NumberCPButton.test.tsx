import { fireEvent, RenderResult } from "@testing-library/react";
import { renderWithAppStore } from "../../../../../TestUtil/RenderWithAppStore";
import { clearDom } from "../../../../../TestUtil/clearDom";
import { NumberCPButton } from "./NumberCPButton";

describe("Number Control Panel Button", () => {
  afterEach(()=>{
    clearDom()
  })
  it("renders", () => {
    const mockNumber:number = 1;
    const renderResult = renderButtonWithNumber(mockNumber)
    expect(button_did_render_with(mockNumber, renderResult))
  });
  it("sends its number to the clickhandler", ()=>{
    const mockNumber:number = 9;
    let clickHandler = jest.fn()
    const renderResult = renderButtonWithNumber(mockNumber, clickHandler)
    const node = renderResult.getAllByRole("button")[0]
    expect(node).toBeTruthy()
    if(node){
        fireEvent.click(node);
        expect(clickHandler).toBeCalledTimes(1)
        expect(clickHandler).toBeCalledWith(mockNumber)
    }
  })
});
export const renderButtonWithNumber = function(mockNumber:number, mockClickHandler:Function | null = null){
  if(!mockClickHandler){mockClickHandler = jest.fn()}
  const renderResult:RenderResult = renderWithAppStore(<NumberCPButton num={mockNumber} clickHandler={mockClickHandler}/>); 
  return renderResult
}
export const button_did_render_with = function(mockNumber:number, renderResult:RenderResult){        
    const node = renderResult.container.querySelector("button") // find by tag name
    expect(node).toBeTruthy()
    if(node){
        expect(node.innerHTML).toEqual(mockNumber.toString())
    }
    
}
