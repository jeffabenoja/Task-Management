import { useState } from "react"
import ellipsis from "../../assets/icon-vertical-ellipsis.svg"
import chevronUp from "../../assets/icon-chevron-up.svg"
import chevronDown from "../../assets/icon-chevron-down.svg"
import api from "../../controller/services/api"

const EditTaskForm = ({ task, columns, onSubtaskUpdate, toggleModal }) => {
  const [updateTask] = api.useUpdateTaskMutation()
  const [dropDown, setDropDown] = useState(false)
  const [taskData, setTaskData] = useState({
    ...task,
  })
  const [columnData, setColumnData] = useState({
    columns: columns,
  })

  const handleCheckboxChange = (index) => {
    // Create a copy of the subtasks
    const updatedSubtasks = taskData.subtasks.map((subtask, i) =>
      i === index
        ? { ...subtask, isCompleted: !subtask.isCompleted }
        : { ...subtask }
    )

    const updatedSubTask = { ...taskData, subtasks: updatedSubtasks }

    setTaskData(updatedSubTask)
  }

  const handleDropDown = (column) => {
    setTaskData((prev) => ({
      ...prev,
      status: column.name,
      columnId: column._id,
    }))
    setDropDown(false)
  }

  const handleUpdate = async () => {
    try {
      await onSubtaskUpdate(taskData)
      await updateTask({
        _id: taskData._id,
        subtasks: taskData.subtasks,
        ...taskData,
      })
      toggleModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center gap-4'>
          <h3 className='heading-l'>{taskData.title}</h3>
          <img src={ellipsis} alt='' className='cursor-pointer' />
        </div>
        <p className='text-secondary-200 body-l !font-medium'>
          {taskData.description
            ? taskData.description
            : "No description provided"}
        </p>
        <div className='flex flex-col'>
          <p className='body-l text-secondary-200 mb-4'>
            Subtask{" "}
            {taskData.subtasks.filter((subtask) => subtask.isCompleted).length}{" "}
            of {taskData.subtasks.length}
          </p>
          <div className='flex flex-col gap-2'>
            {taskData.subtasks.map((subtask, index) => (
              <label
                htmlFor={`subtask-${index}`}
                className='pl-3 pr-2 py-3.5 flex items-center gap-4 bg-secondary-100 dark:bg-primary-500 cursor-pointer rounded'
                key={`subtask-${index}`}
              >
                <input
                  type='checkbox'
                  id={`subtask-${index}`}
                  checked={subtask.isCompleted}
                  onChange={() => handleCheckboxChange(index)}
                  className='checked:bg-primary-400 checked:border-primary-400 checked:text-primary-400  w-[16px] h-[16px] border border-secondary-200 outline-transparent'
                />
                <span className='font-bold'>{subtask.title}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Status Dropdown */}
        <div
          className=' relative py-2 px-4 border border-secondary-200 border-opacity-25 rounded-md outline-transparent bg-transparent
              focus:border-primary-400 focus:outline-none active:border-primary-400 active:outline-none hover:border-primary-400'
        >
          <div className='flex items-center justify-between w-full cursor-pointer '>
            <span className='text-black dark:text-primary-100'>
              {taskData.status}
            </span>

            <img
              src={dropDown ? chevronUp : chevronDown}
              alt=''
              onClick={() => setDropDown((prev) => !prev)}
            />
          </div>
          {/* DropDown */}
          {dropDown && (
            <div
              onClick={() => setDropDown(false)}
              className='absolute overflow-y-auto left-0 rounded-lg py-3 md:py-4 text-secondary-200 bg-primary-100 w-full h-[100px] scrollbar-hide'
              style={{ top: "calc(100% + 10px)" }}
            >
              {columnData.columns.map((c) => (
                <div
                  key={c.name}
                  onClick={() => handleDropDown(c)}
                  className='px-4 py-2 cursor-pointer hover:text-primary-400'
                >
                  {c.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className='bg-primary-400 rounded-[20px] py-2'
          type='button'
          onClick={handleUpdate}
        >
          <p className='text-primary-100 body-l'>Update Task</p>
        </button>
      </div>
    </>
  )
}

export default EditTaskForm
