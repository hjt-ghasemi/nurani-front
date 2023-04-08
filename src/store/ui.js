import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
  },
  reducers: {
    loadingBegan: (ui) => {
      ui.isLoading = true;
    },
    loadingEnded: (ui) => {
      ui.isLoading = false;
    },
  },
});

export default slice.reducer;

// Actions
const { loadingBegan, loadingEnded } = slice.actions;
// Selectors
export const isLoading = createSelector(
  (state) => state.ui.isLoading,
  (isLoading) => isLoading
);

// Action creators
export const beginLoading = (dispatch) => {
  dispatch(loadingBegan());
};

export const endLoading = (dispatch) => {
  dispatch(loadingEnded());
};
