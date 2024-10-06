import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import { persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import api from "./services/api"
import { setupListeners } from "@reduxjs/toolkit/query"
import themeReducer from "./services/theme"

// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer, // Add the API slice reducer
  theme: themeReducer,
})
// Configuration object for redux-persist
const persistConfig = {
  key: "root", // Key for the storage
  storage, // Use local storage for persistence
  version: 1, // Versioning for migration
}

// Create a persisted reducer using the configuration
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }).concat(
  //     productApi.middleware
  //   ), // Ensure the middleware array is returned

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
