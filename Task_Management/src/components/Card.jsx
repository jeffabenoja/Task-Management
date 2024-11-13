import { useState } from "react"
import CustomModal from "./modal/CustomModal"
import EditTaskCard from "./modal/EditTaskCard"

const Card = ({ task, columns }) => {
  const [openModal, setOpenModal] = useState(false)

  const toggleModal = async () => {
    setOpenModal((prev) => !prev)
  }

  return (
    <>
      <div
        onClick={toggleModal}
        className='rounded-lg px-4 py-6 w-full bg-[#93A27B] dark:bg-secondary-500 shadow-lg cursor-pointer'
      >
        <h1 className='heading-m text-[#112F1B] dark:text-primary-100 mb-2'>
          {task.title}
        </h1>
        <p className='font-bold text-color'>
          {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
          {task.subtasks.length} subtasks
        </p>
      </div>
      {openModal && (
        <CustomModal toggleModal={toggleModal}>
          <EditTaskCard
            task={task}
            columns={columns}
            toggleModal={toggleModal}
          />
        </CustomModal>
      )}
    </>
  )
}

export default Card
