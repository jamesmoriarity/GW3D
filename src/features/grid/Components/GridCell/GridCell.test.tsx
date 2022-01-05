import { RenderResult } from "@testing-library/react";
import { GridCell } from "./GridCell";
import * as selectors from "../../State/Selectors/CellSelectors";
import { renderWithAppStore } from "../../../../TestUtil/RenderWithAppStore";
import { clearDom } from "../../../../TestUtil/clearDom";
import { SpyManager } from "../../../../TestUtil/SpyManager";

let cellSDKValueSpy: jest.SpyInstance
let centerNotesSpy: jest.SpyInstance
let pencilNotesSpy: jest.SpyInstance
let spyManager:SpyManager
const setUpSpies = function(){
  spyManager = new SpyManager()
  cellSDKValueSpy = spyManager.addSpy(selectors, "selectCellSDKValue");
  centerNotesSpy = spyManager.addSpy(selectors, "selectCellCenterNotes");
  pencilNotesSpy = spyManager.addSpy(selectors, "selectCellPencilNotes");
}

beforeEach(()=>{
  setUpSpies()
})
afterEach(()=>{
  spyManager.restoreSpies()
  clearDom()
})

test( "renders a value when value is 1-9, notes don't render",
() => {
  let testIndex = 5
  let data:SpyMockData = {  mockSDKValue:9, 
                            mockCenterNotes:[1,2,3], 
                            mockPencilNotes:[7,8,9]}
  setSpyMockData(data)
  let renderResult:RenderResult = renderGridCellWithStore(testIndex)
  confirmCellExists(renderResult)
  confirmValueNodeWithValueOf(renderResult, data.mockSDKValue);
  confirmBothNotesHaveCountOf(0, renderResult)
})

test("renders notes if value is 0, and notes have values", 
() => {
  let testIndex = 5
  let spyData:SpyMockData = { mockSDKValue:0, 
                              mockCenterNotes:[1,2,3], 
                              mockPencilNotes:[7,8,9]}
  setSpyMockData(spyData)
  let renderResult:RenderResult = renderGridCellWithStore(testIndex)
  confirmBothNotesHaveCountOf(1, renderResult)
  confirmCenterNotesValueOf(spyData.mockCenterNotes, renderResult)
  confirmPencilNotesValueOf(spyData.mockPencilNotes, renderResult)
  confirmValueNodeIsMissing(renderResult)
})
test("renders pencil notes but not centers notes and value is zero", 
() => {
  let testIndex = 5
  let spyData:SpyMockData = { mockSDKValue:0, 
                              mockCenterNotes:[], 
                              mockPencilNotes:[7,8,9]}
  setSpyMockData(spyData)
  let renderResult:RenderResult = renderGridCellWithStore(testIndex)
  confirmCenterNotesHaveCountOf(0, renderResult)
  confirmPencilNotesHaveCountOf(1, renderResult)
  confirmPencilNotesValueOf(spyData.mockPencilNotes, renderResult)
  confirmValueNodeIsMissing(renderResult)
})
test("doesn't render any children when there's no notes and no value", 
() => {
  let testIndex = 5
  let spyData:SpyMockData = { mockSDKValue:0, 
                              mockCenterNotes:[], 
                              mockPencilNotes:[]}
  setSpyMockData(spyData)
  let renderResult:RenderResult = renderGridCellWithStore(testIndex)
  confirmBothNotesHaveCountOf(0, renderResult)
  confirmValueNodeIsMissing(renderResult)
  // confirmRendered
})
test("doesn't render a value or notes nodes", 
() => {
  let testIndex = 5
  let spyData:SpyMockData = { mockSDKValue:0, 
                              mockCenterNotes:[], 
                              mockPencilNotes:[]}
  setSpyMockData(spyData)
  let renderResult:RenderResult = renderGridCellWithStore(testIndex)
  confirmBothNotesHaveCountOf(0, renderResult)
  confirmValueNodeIsMissing(renderResult)
})
export interface SpyMockData{
  mockSDKValue:number
  mockCenterNotes:number[]
  mockPencilNotes:number[]
}
const setSpyMockData = function(mockData:SpyMockData){
  let {mockSDKValue, mockCenterNotes, mockPencilNotes} = mockData
  cellSDKValueSpy.mockReturnValue(mockData.mockSDKValue);
  centerNotesSpy.mockReturnValue(mockData.mockCenterNotes);
  pencilNotesSpy.mockReturnValue(mockData.mockPencilNotes);
}
const renderGridCellWithStore = function(index:number){
  return renderWithAppStore(
    <svg><GridCell index={index} /></svg>
  );
}
const confirmCenterNotesHaveCountOf = function(n:number, renderResult:RenderResult){
  let cellCenterNotes = renderResult.container.getElementsByClassName("cell-center-values");
  expect(cellCenterNotes.length).toEqual(n);
}
const confirmCenterNotesValueOf = function(n:number[], renderResult:RenderResult){
  let cellCenterNotes = renderResult.container.getElementsByClassName("cell-center-values");
  expect(cellCenterNotes.length).toEqual(1);
  let centerNotesNode  = cellCenterNotes[0]
  expect(centerNotesNode.innerHTML).toEqual(n.join(''))
}
const confirmPencilNotesHaveCountOf = function(n:number, renderResult:RenderResult){
  let cellPencilNotes = renderResult.container.getElementsByClassName("cell-pencil-values");
  expect(cellPencilNotes.length).toEqual(n);
}
const confirmPencilNotesValueOf = function(n:number[], renderResult:RenderResult){
  let cellPencilNotes = renderResult.container.getElementsByClassName("cell-pencil-values");
  expect(cellPencilNotes.length).toEqual(1);
  let pencilNotesNode  = cellPencilNotes[0]
  expect(pencilNotesNode.innerHTML).toEqual(n.join(''))
}
const confirmBothNotesHaveCountOf = function(n:number, renderResult:RenderResult){
  confirmCenterNotesHaveCountOf(n, renderResult)
  confirmPencilNotesHaveCountOf(n, renderResult)
}
const confirmValueNodeWithValueOf = function(renderResult:RenderResult, val:number){
  let cellValueNodes = renderResult.container.getElementsByClassName("cell-value");
  expect(cellValueNodes.length).toEqual(1);
  let cellValue: string | undefined = cellValueNodes[0].innerHTML;
  expect(cellValue).toEqual(val.toString());
}
const confirmValueNodeIsMissing = function(renderResult:RenderResult){
  let cellValueNodes = renderResult.container.getElementsByClassName("cell-value");
  expect(cellValueNodes.length).toEqual(0);
}
const confirmCellExists = function(renderResult:RenderResult){
  let cell = renderResult.container.querySelector("g")
  expect(cell).toBeTruthy()
}
