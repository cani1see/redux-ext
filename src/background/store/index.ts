import {createWrapStore} from 'webext-redux';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {slices} from "./slices";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {appStorageInstance} from "@/app/common/utils/indexeddb.ts";
import {onStoreReady} from "@/background/onStoreReady.ts";


const rootReducer = combineReducers(slices);
export type RawState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage: appStorageInstance,
  stateReconciler: autoMergeLevel2,
  debug: false,
  serialize: false,
  deserialize: false,
  writeFailHandler: (err: Error) => {
    console.error("redux persist write fail", err.message);
  },
};

const serializableCheckConfig = {
  serializableCheck: {
    ignoredActions: ["persist/PERSIST"],
  },
};

const persistedReducer = persistReducer<RawState>(persistConfig, rootReducer);
export type BackgroundState = ReturnType<typeof persistedReducer>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware(serializableCheckConfig).concat(logger);
    }
    return getDefaultMiddleware(serializableCheckConfig);
  },
})
const wrapStore = createWrapStore();
wrapStore(store);
const persistor = persistStore(store);
export type BackgroundDispatch = typeof store.dispatch;

persistor.subscribe(() => {
  if (persistor.getState().bootstrapped) {
    onStoreReady();
  }
});
