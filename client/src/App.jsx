import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import DashboardLayout from "./Layout/DashboardLayout"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import Private from "./components/Private"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Route */}
        <Route path='/' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        {/* Main Layout Private Route */}
        <Route element={<Private />}>
          <Route path='/dashboard' element={<DashboardLayout />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App
