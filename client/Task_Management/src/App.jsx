import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import DashBoard from "./Pages/DashBoard"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/dashboard' element={<MainLayout />}>
          <Route path='' element={<DashBoard />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App
