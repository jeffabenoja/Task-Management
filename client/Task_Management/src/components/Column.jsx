import { useState } from "react"
import CustomModal from "./modal/CustomModal"
import AddColumnForm from "./modal/AddColumnForm"
import { useGenerateColors } from "../hooks/useGenerateColors"

const Column = ({ columns, toggleModal }) => {
  const generateRandomColor = useGenerateColors()

  // Define fixed colors for the first three columns
  const fixedColors = ["#49C4E5", "#67E2AE", "#8471F2"]

  return (
    <>
      {columns.map((c, index) => {
        const columnColor =
          index < fixedColors.length
            ? fixedColors[index]
            : generateRandomColor()
        return (
          <div className='flex flex-col gap-4 text-secondary-200 ' key={c.name}>
            <div className='flex gap-3 items-center'>
              <div
                className='w-[15px] h-[15px] rounded-full'
                style={{ backgroundColor: columnColor }}
              ></div>
              <h2 className='text-sencondary-200 font-bold text-xs tracking-[2.4px] uppercase'>
                {/* {c.name} <span>({c.tasks.length})</span> */} {c.name}
              </h2>
            </div>

            {/* Tasks Card */}
          </div>
        )
      })}

      {/* Add Column */}
      <div
        className='flex justify-center items-center cursor-pointer '
        onClick={toggleModal}
      >
        <h2 className='text-2xl font-bold text-secondary-200 text-center'>
          + New Column
        </h2>
      </div>
    </>
  )
}

export default Column
