import { useState } from "react"
import CustomModal from "./modal/CustomModal"
import AddColumnForm from "./modal/AddColumnForm"
import { useGenerateColors } from "../hooks/useGenerateColors"
import Card from "./Card"

const Board = ({ board }) => {
  const [openModal, setOpenModal] = useState(false)

  const generateRandomColor = useGenerateColors()
  const fixedColors = ["#49C4E5", "#67E2AE", "#8471F2"]

  // Generate an array of colors based on the number of columns
  // const columnColors = useMemo(() => {
  //   if (!board?.columns) return [] // Check if board.columns exists
  //   return board?.columns?.map((_, index) => {
  //     return index < fixedColors.length
  //       ? fixedColors[index]
  //       : generateRandomColor()
  //   })
  // }, [board?.columns, generateRandomColor])

  const toggleModal = () => {
    setOpenModal((prev) => !prev)
  }

  return (
    <>
      {board?.columns?.length > 0 && (
        <div className='w-full h-full overflow-x-auto flex px-4 py-6 md:px-6 gap-6'>
          {board?.columns?.map((c, index) => (
            <div key={c?._id || index} className='flex flex-col shrink-0 gap-5'>
              {/* Column Header */}
              <div className='flex gap-3 items-center text-secondary-200 '>
                <div
                  className='w-[15px] h-[15px] rounded-full'
                  style={{ backgroundColor: c.color }}
                ></div>
                <h2 className='text-secondary-200 font-bold text-xs tracking-[2.4px] uppercase'>
                  {c?.name} <span>({c?.tasks?.length})</span>
                </h2>
              </div>
              <div className='h-full w-[280px] flex flex-col gap-5'>
                {/* Column Tasks */}
                {c?.tasks?.map((t, taskIndex) => (
                  <Card
                    task={t}
                    key={t._id || taskIndex}
                    columns={board?.columns}
                    boardId={board?._id}
                  />
                ))}
              </div>
            </div>
          ))}
          {/* Add Column */}
          <div
            className='flex justify-center items-center cursor-pointer h-full w-[280px] shrink-0'
            onClick={toggleModal}
          >
            <h2 className='text-2xl font-bold text-secondary-200 text-center'>
              + New Column
            </h2>
          </div>
        </div>
      )}

      {board?.columns?.length === 0 && (
        <div className='p-8 dark:bg-primary-500 w-full h-full flex justify-center items-center'>
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
