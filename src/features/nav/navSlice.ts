import { createSelector, createSlice } from '@reduxjs/toolkit';
import { NavRootState, AppThunk } from '../../app/navstore';
import { NavLinkObj } from './NavLink';

export interface NavState {
  links: NavLinkObj[];
  id:string
}

const initialState: NavState = {
  id:"navState",
  links: [
    { title: "React", href: "https://reactjs.org/" },
    { title: "Redux", href: "https://redux.js.org/" },
    { title: "Redux Tookit", href: "https://redux-toolkit.js.org/" },
    { title: "React Redux", href: "https://react-redux.js.org/" },
  ],
};



export const navSlice = createSlice({
  name: 'nav',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      //state.value += 1;
    },
    add: (state, action) => {
      state.links.push(action.payload)
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    /*     builder
          .addCase(incrementAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value += action.payload;
          }); */
  },
});

export const { increment, add } = navSlice.actions;

export const selectLinks = (state: any): NavLinkObj[] => state.nav.links;
export const selectIndex = (state: any, index: number) => index
export const selectLinkByIndex = createSelector(
  [selectLinks, selectIndex],
  (links: any[], index) => links[index]
);
export const selectLinksLength = createSelector(
  [selectLinks],
  (links: any[]) => links.length
)

export default navSlice.reducer;
