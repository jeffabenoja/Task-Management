import { useFromUrlParams } from "../hooks/useFromUrl"
import { useState, useEffect } from "react"
import Board from "../components/Board"
import Sidebar from "../components/Sidebar"
import api from "../controller/services/api"

const DashBoard = () => {
  const { searchTerm: tab } = useFromUrlParams("tab")
  const [isOpen, setIsOpen] = useState(true)

  // const {
  //   data: boards = [], // Default to an empty array if data is undefined
  //   error,
  //   isLoading,
  // } = api.useGetBoardQuery(undefined, {
  //   selectFromResult: ({ data, error, isLoading }) => ({
  //     data: data.boards,
  //     error,
  //     isLoading,
  //   }),
  // })

  const { data, error, isLoading } = api.useGetBoardsQuery()

  // Ensure data is defined and has boards property
  const boards = data?.boards || [] // Fallback to an empty array if boards is undefined

  // Find the specific board based on the tab directly
  const board = boards.find((b) => b.name === tab) || null

  return (
    <div className={`h-screen flex flex-col md:flex-row relative}`}>
      {/* Sidebar Wrapper */}
      <div className={`hidden md:block ${isOpen ? "" : "!hidden"}`}>
        {/* Sidebar Component */}
        <Sidebar boards={boards} setIsOpen={setIsOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-grow border-l border-secondary-100 dark:border-secondary-500 ${
          isOpen ? "" : "border-none"
        }`}
      >
        {/* Render Board or Error Message */}
        {board ? (
          <Board board={board} />
        ) : (
          <h1 className='text-secondary-600 text-center mt-4 text-3xl text-bold'>
            Board does not exist
          </h1>
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
