import { useState } from "react"
import CustomModal from "./modal/CustomModal"
import EditTaskForm from "./modal/EditTaskForm"

const Card = ({ task, columns, boardId }) => {
  const [openModal, setOpenModal] = useState(false)
  const [currentTask, setCurrentTask] = useState(task)

  const toggleModal = async () => {
    setOpenModal((prev) => !prev)
  }

  // Function to update task state when subtasks change
  const handleSubTaskUpdate = (updatedTask) => {
    setCurrentTask(updatedTask)
  }

  return (
    <>
      <div
        onClick={toggleModal}
        className='rounded-lg px-4 py-6 w-full bg-primary-100 dark:bg-secondary-500 shadow-lg cursor-pointer'
      >
        <h1 className='heading-m text-black dark:text-primary-100 mb-2'>
          {currentTask.title}
        </h1>
        <p className='font-bold text-secondary-200'>
          {currentTask.subtasks.filter((subtask) => subtask.isCompleted).length}{" "}
          of {currentTask.subtasks.length} subtasks
        </p>
      </div>
      {openModal && (
        <CustomModal toggleModal={toggleModal}>
          <EditTaskForm
            task={currentTask}
            columns={columns}
            onSubtaskUpdate={handleSubTaskUpdate}
            toggleModal={toggleModal}
          />
        </CustomModal>
      )}
    </>
  )
}

export default Card
