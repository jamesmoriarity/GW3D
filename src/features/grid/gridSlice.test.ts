import { INPUTMODE_CENTERS, INPUTMODE_COLORS, INPUTMODE_PENCILS, INPUTMODE_VALUES } from './Util/GridInputModes';
import gridReducer, { handleSelectCell, updateCenters, updateColors, updatePencils, updateSDKValues } from './gridSlice';
import { GridState, GridStateUtil } from "./State/GridState"
import {enablePatches} from "immer"
describe('Grid Reducer', () => {
    enablePatches()
  const initialState: GridState = GridStateUtil.getBlankPuzzleInitialState()
    it('Grid should handle initialState', () => {
        const actual: GridState = gridReducer(initialState, { type: 'GridState' });
        expect(actual.sdkValues.length).toEqual(81);
        expect(actual.initialNumbers.length).toEqual(81);
        expect(actual.pencilNotes.length).toEqual(81);
        expect(actual.centerNotes.length).toEqual(81);
        expect(actual.selectedCellIndexes.length).toEqual(0);
        expect(actual.inValidCellIndexes.length).toEqual(0);
    });
    it('should execute handleSelectCell', () => {
        const mockIndex:number = 0
        let state:GridState = gridReducer(initialState, handleSelectCell({meta:false, index:mockIndex}));
        expect(state.selectedCellIndexes.length).toEqual(1);
        expect(state.selectedCellIndexes[0]).toEqual(mockIndex);
    })
    it('updates sdk values for selected cells', () => {
        const mockIndex:number = 0
        let state:GridState = gridReducer(initialState, handleSelectCell({meta:false, index:mockIndex}));
        state = gridReducer(state, updateSDKValues(9));
        expect(state.sdkValues[mockIndex]).toEqual(9);
    })
    it('updates pencil notes for selected cells', () => {
        const mockIndex:number = 0
        let state:GridState = gridReducer(initialState, handleSelectCell({meta:false, index:mockIndex}));
        state = gridReducer(state, updatePencils(5));
        state = gridReducer(state, updatePencils(1));
        expect(state.pencilNotes[0]).toEqual([1,5]);
        state = gridReducer(state, updatePencils(5));
        state = gridReducer(state, updatePencils(1));
        expect(state.pencilNotes[0]).toEqual([]);
    })
    it('updates center notes for selected cells', () => {
        const mockIndex:number = 0
        let state:GridState = gridReducer(initialState, handleSelectCell({meta:false, index:mockIndex}));
        state = gridReducer(state, updateCenters(5));
        state = gridReducer(state, updateCenters(1));
        expect(state.centerNotes[mockIndex]).toEqual([1,5]);
        state = gridReducer(state, updateCenters(5));
        state = gridReducer(state, updateCenters(1));
        expect(state.centerNotes[mockIndex]).toEqual([]);

    })
    it('updates colors for selected cells', () => {
        let newState:GridState = gridReducer(initialState, handleSelectCell({meta:false, index:0}));
        newState = gridReducer(newState, updateColors('bg-light-pink'));
        expect(newState.colorClasses[0]).toBe('bg-light-pink')
    });
});
