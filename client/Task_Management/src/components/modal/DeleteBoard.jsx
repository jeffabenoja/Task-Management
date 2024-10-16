import { useState } from "react"

const DeleteBoard = ({ board, toggleModal }) => {

  const handleDeleteBoard = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/boards/delete/${board?._id}`, {
        method: "DELETE",
        
      })
      if (res.ok) {
        console.log("Successfully deleted board")
        toggleModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-8 flex-col flex gap-6'>
      <h1 className='heading-l text-secondary-400'>Delete this board?</h1>
      <p className='body-l text-secondary-200'>
        Are you sure you want to delete the &quot;{board?.name}&quot; board?
        This action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className='flex items-center justify-between gap-4'>
        <button
          onClick={handleDeleteBoard}
          type='button '
          className='text-center flex-1 bg-secondary-400 hover:bg-secondary-300 text-primary-100 body-l cursor-pointer py-2 rounded-3xl'
        >
          Delete
        </button>
        <button
          onClick={toggleModal}
          type='button'
          className='text-center flex-1 body-l bg-secondary-100 hover:bg-secondary-200 dark:hover:bg-primary-100 text-primary-400 cursor-pointer py-2 rounded-3xl'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteBoard
