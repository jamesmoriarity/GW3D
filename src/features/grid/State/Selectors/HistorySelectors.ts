import { createSelector } from "@reduxjs/toolkit"
import { GridState } from "../GridState"
import { selectGrid } from "../Selectors/GridStateSelectors"

export const historyCursorAtEnd = function(state:GridState){
    return state.historyCursor >= state.history.length - 1
}
export const historyHasNext = createSelector(
    [selectGrid], (gridState: GridState) => {
        return !historyCursorAtEnd(gridState)
    }
)
export const historyCursorAtStart = function(state:GridState){
    return (state.historyCursor === -1)
}
export const historyHasPrev = createSelector(
    [selectGrid], (grid: GridState) => {
        return !historyCursorAtStart(grid)
    }
) 