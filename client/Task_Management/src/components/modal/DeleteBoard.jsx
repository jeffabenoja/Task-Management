import api from "../../controller/services/api"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const DeleteBoard = ({ board, toggleModal }) => {
  const [deleteBoard] = api.useDeleteBoardMutation()
  const navigate = useNavigate()

  // Access the current cached data for boards
  const allBoards = useSelector(
    (state) => api.endpoints.getBoards.select()(state)?.data || []
  )

  const handleDeleteBoard = async (e) => {
    e.preventDefault()
    try {
      // Perform the deletion
      await deleteBoard(board?._id).unwrap()

      const updatedBoards = allBoards?.filter((b) => b._id !== board?._id)

      toggleModal()

      // Check if there are still boards left after deletion
      if (allBoards?.length > 1) {
        // Navigate to the first available board in the list
        navigate(`/dashboard?tab=${updatedBoards[0].slug}`)
      } else {
        // If no boards are left, navigate to the dashboard
        navigate("/dashboard")
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
          className='text-center flex-1 body-l bg-[#93A27B] hover:bg-[#112F1B]  text-[#F5B757] cursor-pointer py-2 rounded-3xl'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteBoard
