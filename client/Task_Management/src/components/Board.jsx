import { useState } from "react"
import CustomModal from "./modal/CustomModal"
import AddColumnForm from "./modal/AddColumnForm"

const Board = ({ board }) => {
  const [openModal, setOpenModal] = useState(false)
  const boards = []
  console.log(boards)
  console.log(board)

  const toggleModal = () => {
    setOpenModal((prev) => !prev)
  }

  return (
    <div className='p-8 dark:bg-primary-500 h-full w-full flex justify-center items-center'>
      {boards.length === 0 && (
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
      )}

      {/* Add Column Form */}
      {openModal && (
        <CustomModal toggleModal={toggleModal}>
          <AddColumnForm board={board} toggleModal={toggleModal} />
        </CustomModal>
      )}
    </div>
  )
}

export default Board
