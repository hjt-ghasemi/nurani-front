import { createSelector, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { beginLoading, endLoading } from "./ui";
import { toast } from "react-toastify";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: authService.getToken(),
  },
  reducers: {
    tokenReceived: (auth, action) => {
      auth.token = action.payload;
    },
    tokenRemoved: (auth, action) => {
      auth.token = null;
    },
  },
});

export default slice.reducer;

// Actions
const { tokenReceived, tokenRemoved } = slice.actions;

// Selectors
export const getToken = createSelector(
  (state) => state.auth.token,
  (token) => token
);

// Action creators
export const logIn = (email, password, remember) => async (dispatch) => {
  dispatch({ type: "Logging in" });
  try {
    dispatch(beginLoading);
    const token = await authService.login(email, password, remember);
    dispatch(tokenReceived(token));
  } catch (ex) {
    const { message, errors } = ex.response.data;
    const error =
      (errors && (errors.email[0] || errors.password[0])) || message;
    toast.error(error);
  } finally {
    dispatch(endLoading);
  }
};

export const logout = (dispatch) => {
  dispatch({ type: "Logging out" });
  authService.logout();
  dispatch(tokenRemoved());
};
