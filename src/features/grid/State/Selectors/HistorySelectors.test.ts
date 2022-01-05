import { store } from "../../../../app/store"
import { GridState, GridStateUtil} from "../GridState"
import * as historySelectors from "./HistorySelectors"

describe('testing history selectors',()=>{
    describe("testing historyCursorAtEnd *not* a selector",
    ()=>{   
        it('selects whether cursor is at end of history array', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            state.history = [[],[]]
            let result_cursorAtEnd:boolean = historySelectors.historyCursorAtEnd(state)
            expect(result_cursorAtEnd).toBe(false)
            state.history = []
            result_cursorAtEnd = historySelectors.historyCursorAtEnd(state)
            expect(result_cursorAtEnd).toBe(true)
        })
    })
    describe("testing historyHasNext selector",
    ()=>{   
        it('selects whether theres a next history item, cursor is not at end', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            state.history = [[],[]]
            let result_cursorAtEnd:boolean = historySelectors.historyHasNext.resultFunc(state)
            expect(result_cursorAtEnd).toBe(true)
            state.history = []
            result_cursorAtEnd = historySelectors.historyHasNext.resultFunc(state)
            expect(result_cursorAtEnd).toBe(false)
        })
    })
    describe("testing historyHasNext selector",
    ()=>{   
        it('selects whether cursor is at end', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            state.history = [[],[]]
            let result_cursorAtEnd:boolean = historySelectors.historyHasNext.resultFunc(state)
            expect(result_cursorAtEnd).toBe(true)
            state.history = []
            result_cursorAtEnd = historySelectors.historyHasNext.resultFunc(state)
            expect(result_cursorAtEnd).toBe(false)
        })
    })
    describe("testing historyCursorAtStart *not* a selector",
    ()=>{   
        it('selects whether cursor is at start', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            let result_cursorAtStart:boolean = historySelectors.historyCursorAtStart(state)
            expect(result_cursorAtStart).toBe(true)
            state.history = [[],[],[]]
            state.historyCursor = 1
            result_cursorAtStart = historySelectors.historyCursorAtStart(state)
            expect(result_cursorAtStart).toBe(false)
        })
    })
    describe("testing historyHasPrev selector",
    ()=>{   
        it('selects whether theres a prev history element, cursor is not at the start', ()=>{
            let state:GridState = GridStateUtil.getBlankPuzzleInitialState()
            state.history = [[],[],[]]
            let result_hasPrev:boolean = historySelectors.historyHasPrev.resultFunc(state)
            expect(result_hasPrev).toBe(false)
            state.historyCursor = 1
            result_hasPrev = historySelectors.historyHasPrev.resultFunc(state)
            expect(result_hasPrev).toBe(true)
        })
    })
})