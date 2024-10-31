import { useState, useEffect } from "react"
import ellipsis from "../../assets/icon-vertical-ellipsis.svg"
import chevronUp from "../../assets/icon-chevron-up.svg"
import chevronDown from "../../assets/icon-chevron-down.svg"

const EditTaskForm = ({ task, columns, onTaskUpdate }) => {
  const [data, setData] = useState({
    id: task?._id,
    title: task?.title,
    description: task?.description,
    status: task?.status,
    subtasks: task?.subtasks,
    columns: columns ? columns : [],
  })
  const [dropDown, setDropDown] = useState(false)

  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    // Create a copy of the subtasks
    const updatedSubtasks = data.subtasks.map((subtask, i) =>
      i === index
        ? { ...subtask, isCompleted: !subtask.isCompleted }
        : { ...subtask }
    )

    // Update the state
    const updatedTask = { ...data, subtasks: updatedSubtasks }

    // Update the state
    setData(updatedTask)

    // Call the parent's update function
    onTaskUpdate(updatedTask)
  }

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center gap-4'>
          <h3 className='heading-l'>{data.title}</h3>
          <img src={ellipsis} alt='' className='cursor-pointer' />
        </div>
        <p className='text-secondary-200 body-l !font-medium'>
          {data.description ? data.description : "No description provided"}
        </p>
        <div className='flex flex-col'>
          <p className='body-l text-secondary-200 mb-4'>
            Subtask{" "}
            {data.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
            {data.subtasks.length}
          </p>
          <div className='flex flex-col gap-2'>
            {data.subtasks.map((subtask, index) => (
              <label
                htmlFor={`subtask-${index}`} // Updated id for uniqueness
                className='pl-3 pr-2 py-3.5 flex items-center gap-4 bg-secondary-100 dark:bg-primary-500 cursor-pointer rounded'
                key={`subtask-${index}`}
              >
                <input
                  type='checkbox'
                  id={`subtask-${index}`} // Updated id for uniqueness
                  checked={subtask.isCompleted}
                  onChange={() => handleCheckboxChange(index)} // Handle change
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
              {data.status}
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
              {data.columns.map((c) => (
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
      </div>
    </>
  )
}

export default EditTaskForm
