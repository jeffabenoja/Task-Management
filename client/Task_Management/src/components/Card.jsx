import { useState } from "react"
import CustomModal from "./modal/CustomModal"
import EditTaskForm from "./modal/EditTaskForm"
import api from "../controller/services/api"

const Card = ({ task, columns }) => {
  const [openModal, setOpenModal] = useState(false)

  // Lift task state to the Card component
  const [currentTask, setCurrentTask] = useState(task)

  const [updatedSubtask, { isLoading, error }] = api.useUpdatedSubtaskMutation()

  const toggleModal = () => {
    setOpenModal((prev) => !prev)
  }

  // This function will be passed to EditTaskForm to update the task state
  const handleTaskUpdate = async (updatedTask) => {
    try {
      setCurrentTask(updatedTask)

      await updatedSubtask({
        id: task?._id,
        subtasks: updatedTask.subtasks,
      }).unwrap()
    } catch (error) {
      console.log(error)
    }
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
            onTaskUpdate={handleTaskUpdate}
          />
        </CustomModal>
      )}
    </>
  )
}

export default Card
