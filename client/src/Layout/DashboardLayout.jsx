import Header from "./Header"
import DashBoard from "../Pages/DashBoard"
import api from "../controller/services/api"
import { useSelector } from "react-redux"

const DashboardLayout = () => {
  const { currentUser } = useSelector((state) => state.user)

  // Only make the API call if userId is available
  const { data: boards = [], error } = api.useGetBoardsQuery(currentUser?._id, {
    skip: !currentUser?._id, // Skip query if userId is not se
  })

  return (
    <>
      <Header boards={boards} />
      <DashBoard boards={boards} />
    </>
  )
}

export default DashboardLayout
