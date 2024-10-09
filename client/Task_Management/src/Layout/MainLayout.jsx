import Header from "./Header"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className='flex flex-col max-h-screen'>
      <Header />

      <Outlet />
    </div>
  )
}

export default MainLayout
