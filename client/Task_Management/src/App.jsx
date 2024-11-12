import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import DashBoard from "./Pages/DashBoard"
import SignUp from "./Pages/SignUp"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Route */}
        <Route path='/sign-up' element={<SignUp />} />
        {/* Main Layout Private Route */}
        <Route path='/dashboard' element={<MainLayout />}>
          <Route path='' element={<DashBoard />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App
