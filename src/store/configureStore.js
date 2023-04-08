import { configureStore, combineReducers } from "@reduxjs/toolkit";
import imagesReducer from "./images";
import authReducer from "./auth";
import duaReducer from "./dua";
import messageReducer from "./message";
import uiReducer from "./ui";

export default configureStore({
  reducer: {
    entities: combineReducers({
      images: imagesReducer,
      dua: duaReducer,
      message: messageReducer,
    }),
    auth: authReducer,
    ui: uiReducer,
  },
});
