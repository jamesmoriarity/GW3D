import { RenderResult } from "@testing-library/react";
import { clearDom } from "../../../../TestUtil/clearDom";
import { renderSVGElmWithAppStore } from "../../../../TestUtil/RenderSVGElmWithAppStore";
import { SpyManager } from "../../../../TestUtil/SpyManager";
import * as selectors from "../../State/Selectors/GridStateSelectors";
import { InvalidGridShapes } from "./InvalidGridShapes";

let selectorSpy:jest.SpyInstance
const spyManager:SpyManager = new SpyManager()
const setSpies = function(){
    selectorSpy = spyManager.addSpy(selectors, 'selectInvalidObjects')
}
beforeEach(()=>{
    setSpies()
})
afterEach(()=>{
    spyManager.restoreSpies()
    clearDom()
})

describe("Invalid Grid Shapes", () => {
    it("displays an invalid cell for each invalid cell index",()=>{
        let badObjects:number[][] = [[1,2,3], [0], [0], []]
        selectorSpy.mockReturnValue(badObjects)    
        const renderResult:RenderResult = renderSVGElmWithAppStore(<InvalidGridShapes/>)
        let invalidCellsGroup:HTMLElement | null = document.getElementById('invalid-cells')
        expect(invalidCellsGroup).toBeDefined()
        if(invalidCellsGroup){
            expect(invalidCellsGroup.getElementsByTagName('rect').length === badObjects[0].length)
        }
        let invalidBoxesGroup:HTMLElement | null = document.getElementById('invalid-boxes')
        expect(invalidBoxesGroup).toBeDefined()
        if(invalidBoxesGroup){
            expect(invalidBoxesGroup.getElementsByTagName('rect').length === badObjects[1].length)
        }
        let invalidRowsGroup:HTMLElement | null = document.getElementById('invalid-rows')
        expect(invalidRowsGroup).toBeDefined()
        if(invalidRowsGroup){
            expect(invalidRowsGroup.getElementsByTagName('rect').length === badObjects[2].length)
        }
        let invalidColumnsGroup:HTMLElement | null = document.getElementById('invalid-columns')
        expect(invalidColumnsGroup).toBeDefined()
        if(invalidColumnsGroup){
            expect(invalidColumnsGroup.getElementsByTagName('rect').length === badObjects[3].length)
        }
    })
})