import {createWrapStore} from 'webext-redux';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {slices} from "./slices";
import logger from "redux-logger";

const rootReducer = combineReducers(slices);
export type RawState = ReturnType<typeof rootReducer>;
export type BackgroundState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
})
const wrapStore = createWrapStore();
wrapStore(store);

export type BackgroundDispatch = typeof store.dispatch;
