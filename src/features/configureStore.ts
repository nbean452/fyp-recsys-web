import { configureStore } from "@reduxjs/toolkit";
import {
  persistCombineReducers,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import apiSlice from "@features/apiSlice";
import rootReducer from "@features/reducers";

const persistConfig = {
  blacklist: [apiSlice.reducerPath],
  key: "root",
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const store = configureStore({
  devTools: process.env.REACT_APP_ENVIRONMENT !== "PRODUCTION",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  reducer: persistedReducer,
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default { persistor, store };
