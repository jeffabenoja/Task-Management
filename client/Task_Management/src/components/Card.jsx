import React from "react"

const Card = ({ task }) => {
  return (
    <div className='rounded-lg px-4 py-6 w-full bg-primary-100 dark:bg-secondary-500 shadow-lg cursor-pointer'>
      <h1 className='heading-m text-black dark:text-primary-100 mb-2'>
        {task.title}
      </h1>
      <p className='font-bold text-secondary-200'>
        {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
        {task.subtasks.length} subtasks
      </p>
    </div>
  )
}

export default Card
