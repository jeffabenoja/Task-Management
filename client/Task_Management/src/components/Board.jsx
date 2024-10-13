import Column from "./Column"
import { useState } from "react"
import CustomModal from "./modal/CustomModal"
import AddColumnForm from "./modal/AddColumnForm"
import { useScrollWheel } from "../hooks/useScrollWheel"
import { useFromUrlParams } from "../hooks/useFromUrl"
import api from "../controller/services/api"

const Board = () => {
  const [openModal, setOpenModal] = useState(false)
  const { searchTerm: tab } = useFromUrlParams("tab")
  const columnsRef = useScrollWheel()

  const { data: board = [], error, isLoading } = api.useGetBoardQuery(tab)

  const toggleModal = () => {
    setOpenModal((prev) => !prev)
  }

  return (
    <>
      {board?.columns?.length > 0 ? (
        <div
          className='h-full w-full grid grid-flow-col auto-cols-[280px] gap-6 overflow-x-auto 
        px-4 py-6 md:px-6 scrollbar-hide'
          ref={columnsRef} // Apply ref to the scrollable container
        >
          <Column board={board} />
        </div>
      ) : (
        <div className='p-8 dark:bg-primary-500 h-full w-full flex justify-center items-center'>
          <div className='w-[343px] md:w-[493px] text-center text-secondary-200'>
            <h1 className='heading-l mb-6'>
              This board is empty. Create a new column to get started.
            </h1>
            <button
              onClick={toggleModal}
              className='bg-primary-400 text-primary-100 rounded-3xl px-[18px] py-3.5 cursor-pointer'
            >
              <span className='heading-m'>+ Add New Column</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Column Form */}
      {openModal && (
        <CustomModal toggleModal={toggleModal}>
          <AddColumnForm board={board} toggleModal={toggleModal} />
        </CustomModal>
      )}
    </>
  )
}

export default Board
