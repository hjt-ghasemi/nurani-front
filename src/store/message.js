import { createSelector, createSlice } from "@reduxjs/toolkit";
import messageService from "../services/messageService";
import { toast } from "react-toastify";

const slice = createSlice({
  name: "message",
  initialState: {
    content: "",
    initialValue: "",
    isFetched: false,
  },
  reducers: {
    messageUpdated: (message, action) => {
      message.content = action.payload;
    },
    messageReceived: (message, action) => {
      message.content = action.payload;
      message.isFetched = true;
    },
    messageInitialValueUpdated: (message, action) => {
      message.initialValue = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { messageUpdated, messageReceived, messageInitialValueUpdated } =
  slice.actions;

// Selectors
export const getMessage = createSelector(
  (state) => state.entities.message.content,
  (content) => content
);

export const getInitialMessage = createSelector(
  (state) => state.entities.message.initialValue,
  (initialValue) => initialValue
);

export const isMessageModified = createSelector(
  (state) => state.entities.message.content,
  (state) => state.entities.message.initialValue,
  (current, initial) => current !== initial
);

// Action creators
export const loadMessage = async (dispatch, getState) => {
  dispatch({ type: "Loading message" });
  if (getState().entities.message.isFetched) return;
  try {
    const {
      data: {
        content: { seti_val: message },
      },
    } = await messageService.getMessage();
    dispatch(messageReceived(message));
    dispatch(messageInitialValueUpdated(message));
  } catch (ex) {
    if (ex.response.status !== 404) {
      toast.error(ex.response.data.message.toUpperCase());
    } else {
      dispatch(messageReceived(""));
      dispatch(messageInitialValueUpdated(""));
    }
  }
};

export const discardMessageChanges = (dispatch, getState) => {
  dispatch({ type: "Discarding message changes" });
  dispatch(messageUpdated(getInitialMessage(getState())));
};

export const updateMessage = (value) => (dispatch) => {
  dispatch(messageUpdated(value));
};

export const saveMessage = async (dispatch, getState) => {
  dispatch({ type: "Saving message" });
  try {
    const {
      data: {
        content: { seti_val: message },
      },
    } = await messageService.setMessage(getMessage(getState()));
    dispatch(messageUpdated(message));
    dispatch(messageInitialValueUpdated(message));
  } catch (ex) {
    const error = ex.response.data.errors && ex.response.data.errors.value[0];
    toast.error(error);
    dispatch(discardMessageChanges);
  }
};
