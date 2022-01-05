import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gridReducer from "../features/grid/gridSlice"
import { GridState } from '../features/grid/State/GridState';

export const store = configureStore({
    reducer: {
        grid:gridReducer,
    },
});
export interface AppRootState{
    grid:GridState
}

export type AppDispatch = typeof store.dispatch;
export type RootState = AppRootState;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    GridState,
    unknown,
    Action<string>
>;