import { useFromUrlParams } from "../hooks/useFromUrl"
import { useState } from "react"
import Board from "../components/Board"
import Sidebar from "../components/Sidebar"
import api from "../controller/services/api"

const DashBoard = () => {
  const { searchTerm: tab } = useFromUrlParams("tab")
  const [isOpen, setIsOpen] = useState(true)

  const { data: boards = [] } = api.useGetBoardsQuery()

  const selectedBoard = boards.find((board) => board.slug === tab)

  console.log(selectedBoard)

  return (
    <div className={`h-screen md:flex relative}`}>
      {/* Sidebar Wrapper */}
      <div className={`hidden md:block ${isOpen ? "" : "!hidden"}`}>
        {/* Sidebar Component */}
        <Sidebar boards={boards} setIsOpen={setIsOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`w-full h-full overflow-hidden border-l border-secondary-100 dark:border-secondary-500 ${
          isOpen ? "" : "border-none"
        }`}
      >
        {boards && tab && <Board board={selectedBoard} />}

        {boards && boards?.length === 0 && (
          <div className=' flex justify-center items-center h-full  '>
            <h1 className='text-secondary-600 text-center mt-4 text-3xl text-bold dark:text-primary-100'>
              Create board
            </h1>
          </div>
        )}

        {!tab && (
          <div className='flex justify-center items-center h-full  '>
            <h1 className='text-secondary-600 text-center mt-4 text-3xl text-bold dark:text-primary-100'>
              Select board
            </h1>
          </div>
        )}
      </div>

      {/* Toggle Button for Small Screens */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`absolute bottom-[32px] group cursor-pointer w-[36px] h-[36px] bg-primary-400 flex items-center justify-center rounded-tr-full rounded-br-full hover:bg-primary-200 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <svg
          width='16'
          height='11'
          xmlns='http://www.w3.org/2000/svg'
          className='group-hover:fill-primary-400 fill-secondary-100'
        >
          <path d='M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z' />
        </svg>
      </div>
    </div>
  )
}

export default DashBoard
