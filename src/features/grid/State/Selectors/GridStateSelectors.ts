import { createSelector } from "@reduxjs/toolkit"
import { GridState } from "../GridState"
export const selectState = (state: any) => state
export const selectGrid = (state: any) => state.grid
export const selectIndex = (state: any, index: number) => index
export const selectSelectedCellIndexes = (state: any) => state.grid.selectedCellIndexes
export const selectColorClasses = (state: any) => state.grid.colorClasses;
/* export const selectCellDataById = createSelector(
    [selectGrid, selectIndex],
    (grid: GridState, index: number) => {
        return {
            cellValue: grid.values[index],
            cellPencilNotes: grid.pencilNotes[index],
            cellCenterNotes: grid.centerNotes[index],
            isSelected: grid.selectedCellIndexes.includes(index)
        }
    }
); */
export const selectIsPuzzleValid = createSelector(
    [selectGrid], (grid: GridState) => {
        return grid.inValidCellIndexes.length === 0
    }
);
export const selectInvalidObjects = createSelector(
    [selectGrid], (grid: GridState) => {
        return [grid.inValidCellIndexes, grid.inValidBoxIndexes, grid.inValidRowIndexes, grid.inValidColumnIndexes]
    }
);
