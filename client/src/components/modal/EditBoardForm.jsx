import { useState } from "react"
import api from "../../controller/services/api"

const EditBoardForm = ({ board, toggleModal }) => {
  const [data, setData] = useState({
    boardId: board ? board._id : "",
    name: board ? board.name : "",
    columns: board ? board.columns : [],
  })

  const [updatedBoard, { isLoading, isError }] = api.useUpdateBoardMutation()

  const handleColumnChange = (index, event) => {
    const newColumns = [...data.columns]
    newColumns[index].name = event.target.value
    setData((prevData) => ({ ...prevData, columns: newColumns }))
  }

  const handleDeleteColumn = (index) => {
    if (data.columns.length > 1) {
      const columns = data.columns.filter((_, subIndex) => subIndex !== index)
      setData((prevData) => ({ ...prevData, columns: columns }))
    }
  }

  const addNewColumn = () => {
    setData((prevData) => ({
      ...prevData,
      columns: [...prevData.columns, { name: "" }],
    }))
  }

  const handleBoardSubmit = async (e) => {
    e.preventDefault()
    try {
      await updatedBoard(data).unwrap()

      console.log("Successfully updated board")

      toggleModal()
    } catch (error) {
      console.error("Error submitting the board:", error)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-6'>
        <h3 className='heading-l'>Edit Board</h3>
        <form
          className='flex flex-col gap-6 text-secondary-200'
          onSubmit={handleBoardSubmit}
        >
          {/* Board Title */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='boardName' className='body-l'>
              Board Name
            </label>
            <input
              id='boardName'
              type='text'
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder='e.g Web Design'
              className='text-black dark:text-primary-100 py-2 px-4 border border-secondary-200 border-opacity-25 rounded-md outline-transparent bg-transparent
              focus:border-[#93A27B] focus:outline-none active:border-[#93A27B] active:outline-none hover:border-[#93A27B]'
              required
            />
          </div>

          {/* Columns */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='columns' className='body-l'>
              Columns
            </label>
            <div className='flex flex-col gap-3'>
              {data.columns.map((column, index) => (
                <div
                  className='flex items-center justify-between gap-4'
                  key={index}
                >
                  <input
                    id={`columnName-${index}`}
                    type='text'
                    value={column.name}
                    onChange={(e) => handleColumnChange(index, e)}
                    className='text-black dark:text-primary-100 flex-1 py-2 px-4 border border-secondary-200 border-opacity-25 rounded-md outline-transparent bg-transparent
                    focus:border-[#93A27B] focus:outline-none active:border-[#93A27B] active:outline-none hover:border-[#93A27B]'
                    required
                  />
                  <span
                    className='cursor-pointer'
                    onClick={() => handleDeleteColumn(index)}
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
                onClick={addNewColumn}
                type='button'
                className='bg-[#93A27B] dark:bg-[#B5D8A3] rounded-[20px] py-2'
              >
                <p className='text-[#112F1B] body-l'>+ Add New Column</p>
              </button>
            </div>
          </div>

          {/* Handle Submit */}
          <button className='bg-[#112F1B] rounded-[20px] py-2' type='submit'>
            <p className='text-[#F5B757] body-l'>Update Board</p>
          </button>
        </form>
      </div>
    </>
  )
}

export default EditBoardForm
