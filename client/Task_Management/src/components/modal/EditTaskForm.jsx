import { useState } from "react"
import chevronUp from "../../assets/icon-chevron-up.svg"
import chevronDown from "../../assets/icon-chevron-down.svg"
import api from "../../controller/services/api"

const EditTaskForm = ({ task, columns, toggleModal }) => {
  const [updateTask] = api.useUpdateTaskMutation()
  const [data, setData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    subtasks: [
      {
        title: task?.subtasks[0]?.title || "",
        isCompleted: task?.subtasks[0]?.isCompleted || false,
      },
      {
        title: task?.subtasks[1]?.title || "",
        isCompleted: task?.subtasks[1]?.isCompleted || false,
      },
    ],
    status: task?.status,
    ...task,
  })

  const [dropDown, setDropDown] = useState(false)

  const handleDeleteSubtask = (index) => {
    if (data.subtasks.length > 1) {
      const subtask = data.subtasks.filter((_, subIndex) => subIndex !== index)
      setData((prevData) => ({ ...prevData, subtasks: subtask }))
    }
  }

  const handleSubtaskChange = (index, e) => {
    const subtask = [...data.subtasks]
    subtask[index].title = e.target.value
    setData((prevData) => ({ ...prevData, subtasks: subtask }))
  }

  const addNewSubtask = () => {
    setData((prevData) => ({
      ...prevData,
      subtasks: [...prevData.subtasks, { title: "", isCompleted: false }],
    }))
  }

  const handleDropDown = (c) => {
    setData({ ...data, columnId: c._id, status: c.name })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateTask(data)
      toggleModal()
    } catch (error) {
      console.error("Error submitting the task:", error)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-6'>
        <h3 className='heading-l'>Edit New Task</h3>
        <form
          className='flex flex-col gap-6 text-secondary-200'
          onSubmit={handleSubmit}
        >
          {/* Task Title */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='taskTitle' className='body-l'>
              Title
            </label>
            <input
              id='taskTitle'
              type='text'
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder='e.g Take Coffee Break'
              className='text-black dark:text-primary-100 py-2 px-4 border border-secondary-200 border-opacity-25 rounded-md outline-transparent bg-transparent
              focus:border-primary-400 focus:outline-none active:border-primary-400 active:outline-none hover:border-primary-400'
              required
            />
          </div>

          {/* Description */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='description' className='body-l'>
              Title
            </label>
            <textarea
              id='description'
              rows='4'
              placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
              type='text'
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className='leading-6 text-black dark:text-primary-100 py-2 px-4 border border-secondary-200 border-opacity-25 rounded-md outline-transparent bg-transparent
              focus:border-primary-400 focus:outline-none active:border-primary-400 active:outline-none hover:border-primary-400'
            />
          </div>

          {/* Subtasks */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='subTask' className='body-l'>
              Subtasks
            </label>
            <div className='flex flex-col gap-3'>
              {data.subtasks.map((s, index) => (
                <div
                  className='flex items-center justify-between gap-4'
                  key={index}
                >
                  <input
                    id={`subTask-${index}`}
                    placeholder={`${
                      index === 0
                        ? "e.g Make Coffee"
                        : index === 1
                        ? "e.g Drink Coffee"
                        : ""
                    }`}
                    type='text'
                    value={s.title}
                    onChange={(e) => handleSubtaskChange(index, e)}
                    className='text-black dark:text-primary-100 flex-1 py-2 px-4 border border-secondary-200 border-opacity-25 rounded-md outline-transparent bg-transparent
                    focus:border-primary-400 focus:outline-none active:border-primary-400 active:outline-none hover:border-primary-400'
                  />
                  <span
                    className='cursor-pointer'
                    onClick={() => handleDeleteSubtask(index)}
                  >
                    <svg
                      width='15'
                      height='15'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g fill='#828FA3' fillRule='evenodd'>
                        <path d='m12.728 0 2.122 2.122L2.122 14.85 0 12.728z' />
                        <path d='M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z' />
                      </g>
                    </svg>
                  </span>
                </div>
              ))}
              <button
                onClick={addNewSubtask}
                type='button'
                className='bg-[rgba(99,95,199,0.25)] dark:bg-primary-100 rounded-[20px] py-2'
              >
                <p className='text-primary-400 body-l'>+ Add New Subtask</p>
              </button>
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
                {columns.map((c) => (
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

          {/* Handle Submit */}
          <button className='bg-primary-400 rounded-[20px] py-2' type='submit'>
            <p className='text-primary-100 body-l'>Update Task</p>
          </button>
        </form>
      </div>
    </>
  )
}

export default EditTaskForm
