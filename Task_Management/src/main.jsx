import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { store, persistor } from "./controller/store.js"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import ThemeProvider from "./context/ThemeProvider.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </StrictMode>
)
