import { createSelector, createSlice } from "@reduxjs/toolkit";
import duaContentSerivce from "../services/duaContentService";
import { beginLoading, endLoading } from "./ui";
import { toast } from "react-toastify";

const slice = createSlice({
  name: "dua",
  initialState: {
    content: "",
    initialValue: "",
    isFetched: false,
  },
  reducers: {
    duaUpdated: (dua, action) => {
      dua.content = action.payload;
    },
    duaReceived: (dua, action) => {
      dua.content = action.payload;
      dua.isFetched = true;
    },
    duaInitialValueUpdated: (dua, action) => {
      dua.initialValue = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { duaReceived, duaUpdated, duaInitialValueUpdated } = slice.actions;
// Selectors
export const getDua = createSelector(
  (state) => state.entities.dua.content,
  (content) => content
);

export const getInitialDua = createSelector(
  (state) => state.entities.dua.initialValue,
  (initialValue) => initialValue
);

export const isDuaModified = createSelector(
  (state) => state.entities.dua.content,
  (state) => state.entities.dua.initialValue,
  (current, initial) => current !== initial
);

// Action creators
export const loadDua = async (dispatch, getState) => {
  dispatch({ type: "Loading dua" });
  if (getState().entities.dua.isFetched) return;
  try {
    dispatch(beginLoading);
    const {
      data: {
        content: { seti_val: dua },
      },
    } = await duaContentSerivce.getDuaContent();
    dispatch(duaReceived(dua));
    dispatch(duaInitialValueUpdated(dua));
  } catch (ex) {
    if (ex.response.status !== 404) {
      toast.error(ex.response.data.message.toUpperCase());
    } else {
      dispatch(duaReceived(""));
      dispatch(duaInitialValueUpdated(""));
    }
  } finally {
    dispatch(endLoading);
  }
};

export const discardDuaChanges = (dispatch, getState) => {
  dispatch({ type: "Discarding dua changes" });
  dispatch(duaUpdated(getInitialDua(getState())));
};

export const updateDua = (value) => (dispatch) => {
  dispatch(duaUpdated(value));
};

export const saveDua = async (dispatch, getState) => {
  dispatch({ type: "Saving dua" });
  try {
    dispatch(beginLoading);
    const {
      data: {
        content: { seti_val: dua },
      },
    } = await duaContentSerivce.setDuaContent(getDua(getState()));
    dispatch(duaUpdated(dua));
    dispatch(duaInitialValueUpdated(dua));
    toast.success("Content updated successfully.");
  } catch (ex) {
    const error = ex.response.data.errors && ex.response.data.errors.value[0];
    toast.error(error);
    dispatch(discardDuaChanges);
  } finally {
    dispatch(endLoading);
  }
};
