import { useState } from "react"

const AddBoardForm = ({ toggleModal }) => {
  const [data, setData] = useState({
    name: "",
    columns: [{ name: "Todo" }, { name: "Doing" }],
  })

  const handleDeleteColumn = (index) => {
    if (data.columns.length > 1) {
      const newColumns = data.columns.filter(
        (_, colIndex) => colIndex !== index
      )
      setData((prevData) => ({ ...prevData, columns: newColumns }))
    }
  }

  const handleColumnChange = (index, event) => {
    const newColumns = [...data.columns]
    newColumns[index].name = event.target.value
    setData((prevData) => ({ ...prevData, columns: newColumns }))
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
      const res = await fetch(`/api/boards/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Network response was not ok")
      }

      const _data = await res.json()
      console.log("Successfully added new board", _data)
      toggleModal()
    } catch (error) {
      console.error("Error submitting the board:", error)
      // Optionally: set an error state and display it to the user
    }
  }

  return (
    <>
      <div className='flex flex-col gap-6'>
        <h3 className='heading-l'>Add New Board</h3>
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
              className='text-black text-primary-100 py-2 px-4 border border-secondary-200 border-opacity-25 rounded-md outline-transparent bg-transparent
              focus:border-primary-400 focus:outline-none active:border-primary-400 active:outline-none hover:border-primary-400'
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
                    focus:border-primary-400 focus:outline-none active:border-primary-400 active:outline-none hover:border-primary-400'
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
                className='bg-[rgba(99,95,199,0.25)] dark:bg-primary-100 rounded-[20px] py-2'
              >
                <p className='text-primary-400 body-l'>+ Add New Column</p>
              </button>
            </div>
          </div>

          {/* Handle Submit */}
          <button className='bg-primary-400 rounded-[20px] py-2' type='submit'>
            <p className='text-primary-100 body-l'>Create New Board</p>
          </button>
        </form>
      </div>
    </>
  )
}

export default AddBoardForm
