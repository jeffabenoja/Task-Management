import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import sessionStorage from "redux-persist/lib/storage/session" // Import sessionStorage
import api from "./services/api"
import userAPI from "./services/userAPI"
import { setupListeners } from "@reduxjs/toolkit/query"
import themeReducer from "./services/theme"

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  theme: themeReducer,
})

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(api.middleware)
      .concat(userAPI.middleware),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
