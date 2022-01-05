import { createSlice } from '@reduxjs/toolkit';
import { GridState, GridStateUtil } from './State/GridState';
import * as mutators from './State/Mutators/GridStateMutators';
const initialState: GridState = GridStateUtil.getInitialState()
export const gridSlice: any = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        reset:              mutators.resetPuzzle,
        updateSDKValues:    mutators.setSDKValues,
        updateCenters:      mutators.setCenterNotes,
        updatePencils:      mutators.setPencilNotes,
        updateColors:       mutators.setColors,
        handleSelectCell:   mutators.handleCellSelection,
        nextStep:           mutators.goToNextStep,
        prevStep:           mutators.goToPrevStep
    }
});
export const { reset, updateSDKValues, updateCenters, updatePencils, updateColors, handleSelectCell, nextStep, prevStep} = gridSlice.actions;
export default gridSlice.reducer;