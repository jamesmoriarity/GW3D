import { createSelector } from "@reduxjs/toolkit";
import { GridState } from "../GridState";
import { selectGrid, selectIndex } from '../Selectors/GridStateSelectors'

export const selectIsCellValid = createSelector(
    [selectGrid, selectIndex], (grid: GridState, index:number) => {
        return !grid.inValidCellIndexes.includes(index)
    }
)
export const selectGridSDKValues = createSelector(
    [selectGrid],
    (grid: GridState) => grid.sdkValues
)
export const selectCellSDKValue = createSelector(
    [selectGrid, selectIndex],
    (grid: GridState, index) => {
        return grid.sdkValues[index]
    }
);
export const selectGridCenterNotes = createSelector(
    [selectGrid],
    (grid: GridState) => {
        return grid.centerNotes;
    }
)
export const selectCellCenterNotes = createSelector(
    [selectGrid, selectIndex],
    (grid:GridState, index:number) => {
        return grid.centerNotes[index]
    }
)
export const selectGridPencilNotes = createSelector(
    [selectGrid],
    (gridState: GridState) => {
        return gridState.pencilNotes;
    }
)
export const selectCellPencilNotes = createSelector(
    [selectGrid, selectIndex],
    (grid:GridState, index:number) => grid.pencilNotes[index]
)
export const selectIsSelected = createSelector(
    [selectGrid, selectIndex],
    (grid:GridState, index: number) => grid.selectedCellIndexes.includes(index)
)
export const selectCellBackgroundClass = createSelector(
    [selectGrid, selectIndex],
    (grid:GridState, index: number) => grid.colorClasses[index]
)
export const isOriginal = function(state:GridState, cellIndex:number){
    return (state.initialNumbers[cellIndex] !== 0)
}