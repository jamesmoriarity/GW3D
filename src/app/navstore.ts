import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navReducer from '../features/nav/navSlice';

export const navstore = configureStore({
    reducer: {
        nav: navReducer,
    },
});
export function getNavStore() {
    return configureStore({ reducer: { nav: navReducer, } });
}

export type AppDispatch = typeof navstore.dispatch;
export type NavRootState = ReturnType<typeof navstore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    NavRootState,
    unknown,
    Action<string>
>;