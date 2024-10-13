import chevronUp from "../assets/icon-chevron-up.svg"
import chevronDown from "../assets/icon-chevron-down.svg"
import addTaskBtn from "../assets/icon-add-task-mobile.svg"
import ellipsis from "../assets/icon-vertical-ellipsis.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useFromUrlParams } from "../hooks/useFromUrl"
import api from "../controller/services/api"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../controller/services/theme"
import CustomModal from "../components/modal/CustomModal"
import AddBoardForm from "../components/modal/AddBoardForm"
import { useMemo } from "react"
import EditBoardForm from "../components/modal/EditBoardForm"

const Header = () => {
  // Use the custom hook to get the current tab
  const { theme } = useSelector((state) => state.theme)
  const { searchTerm } = useFromUrlParams("tab")

  const dispatch = useDispatch()

  const [modals, setModals] = useState({
    isOpen: false,
    openModal: false,
    openEditModal: false,
    ellipsisOpen: false,
  })

  const { data, error, isLoading } = api.useGetBoardsQuery()

  // Ensure data is defined and has boards property
  const boards = data?.boards || [] // Fallback to an empty array if boards is undefined

  const currentBoard = useMemo(
    () => boards.find((board) => board.slug === searchTerm),
    [boards, searchTerm]
  )

  const handleToggle = (modal) => {
    setModals((prev) => ({
      ...prev,
      [modal]: !prev[modal],
    }))
  }

  return (
    <div className='relative'>
      {/* Header */}
      <div className='w-full inline-flex items-center z-20 bg-primary-100 dark:bg-secondary-600'>
        {/* Logo Section */}
        <div className='py-6 pl-4 md:py-8 md:pl-[26px] md:w-[300px]'>
          <svg
            width='24'
            height='25'
            xmlns='http://www.w3.org/2000/svg'
            className='md:hidden mr-4'
          >
            <g fill='#635FC7' fillRule='evenodd'>
              <rect width='6' height='25' rx='2' />
              <rect opacity='.75' x='9' width='6' height='25' rx='2' />
              <rect opacity='.5' x='18' width='6' height='25' rx='2' />
            </g>
          </svg>
          {theme === "dark" ? (
            <svg
              width='153'
              height='26'
              xmlns='http://www.w3.org/2000/svg'
              className='hidden md:block'
            >
              <g fill='none' fillRule='evenodd'>
                <path
                  d='M44.56 25v-5.344l1.92-2.112L50.928 25h5.44l-6.304-10.432 6.336-7.04h-5.92l-5.92 6.304V.776h-4.8V25h4.8Zm19.36.384c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM81.968 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Zm24.16.384c1.707 0 3.232-.405 4.576-1.216a8.828 8.828 0 0 0 3.184-3.296c.779-1.387 1.168-2.923 1.168-4.608 0-1.707-.395-3.248-1.184-4.624a8.988 8.988 0 0 0-3.2-3.28c-1.344-.81-2.848-1.216-4.512-1.216-2.112 0-3.787.619-5.024 1.856V.776h-4.8V25h4.48v-1.664c.619.661 1.392 1.168 2.32 1.52a8.366 8.366 0 0 0 2.992.528Zm-.576-4.32c-1.301 0-2.363-.443-3.184-1.328-.821-.885-1.232-2.043-1.232-3.472 0-1.408.41-2.56 1.232-3.456.821-.896 1.883-1.344 3.184-1.344 1.323 0 2.41.453 3.264 1.36.853.907 1.28 2.053 1.28 3.44 0 1.408-.427 2.56-1.28 3.456-.853.896-1.941 1.344-3.264 1.344Zm17.728 4.32c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM141.328 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Z'
                  fill='#FFF'
                  fillRule='nonzero'
                />
                <g transform='translate(0 1)' fill='#635FC7'>
                  <rect width='6' height='25' rx='2' />
                  <rect opacity='.75' x='9' width='6' height='25' rx='2' />
                  <rect opacity='.5' x='18' width='6' height='25' rx='2' />
                </g>
              </g>
            </svg>
          ) : (
            <svg
              width='153'
              height='26'
              xmlns='http://www.w3.org/2000/svg'
              className='hidden md:block'
            >
              <g fill='none' fillRule='evenodd'>
                <path
                  d='M44.56 25v-5.344l1.92-2.112L50.928 25h5.44l-6.304-10.432 6.336-7.04h-5.92l-5.92 6.304V.776h-4.8V25h4.8Zm19.36.384c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM81.968 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Zm24.16.384c1.707 0 3.232-.405 4.576-1.216a8.828 8.828 0 0 0 3.184-3.296c.779-1.387 1.168-2.923 1.168-4.608 0-1.707-.395-3.248-1.184-4.624a8.988 8.988 0 0 0-3.2-3.28c-1.344-.81-2.848-1.216-4.512-1.216-2.112 0-3.787.619-5.024 1.856V.776h-4.8V25h4.48v-1.664c.619.661 1.392 1.168 2.32 1.52a8.366 8.366 0 0 0 2.992.528Zm-.576-4.32c-1.301 0-2.363-.443-3.184-1.328-.821-.885-1.232-2.043-1.232-3.472 0-1.408.41-2.56 1.232-3.456.821-.896 1.883-1.344 3.184-1.344 1.323 0 2.41.453 3.264 1.36.853.907 1.28 2.053 1.28 3.44 0 1.408-.427 2.56-1.28 3.456-.853.896-1.941 1.344-3.264 1.344Zm17.728 4.32c2.176 0 3.925-.672 5.248-2.016V25h4.48V13.48c0-1.259-.315-2.363-.944-3.312-.63-.95-1.51-1.69-2.64-2.224-1.13-.533-2.432-.8-3.904-.8-1.856 0-3.483.427-4.88 1.28-1.397.853-2.352 2.005-2.864 3.456l3.84 1.824a4.043 4.043 0 0 1 1.424-1.856c.65-.47 1.403-.704 2.256-.704.896 0 1.605.224 2.128.672.523.448.784 1.003.784 1.664v.48l-4.832.768c-2.09.341-3.648.992-4.672 1.952-1.024.96-1.536 2.176-1.536 3.648 0 1.579.55 2.816 1.648 3.712 1.099.896 2.587 1.344 4.464 1.344Zm.96-3.52c-.597 0-1.099-.15-1.504-.448-.405-.299-.608-.715-.608-1.248 0-.576.181-1.019.544-1.328.363-.31.885-.528 1.568-.656l3.968-.704v.544c0 1.067-.363 1.973-1.088 2.72-.725.747-1.685 1.12-2.88 1.12ZM141.328 25V14.792c0-1.003.299-1.808.896-2.416.597-.608 1.365-.912 2.304-.912.939 0 1.707.304 2.304.912.597.608.896 1.413.896 2.416V25h4.8V13.768c0-1.323-.277-2.48-.832-3.472a5.918 5.918 0 0 0-2.32-2.32c-.992-.555-2.15-.832-3.472-.832-1.11 0-2.09.208-2.944.624a4.27 4.27 0 0 0-1.952 1.904V7.528h-4.48V25h4.8Z'
                  fill='#000112'
                  fillRule='nonzero'
                />
                <g transform='translate(0 1)' fill='#635FC7'>
                  <rect width='6' height='25' rx='2' />
                  <rect opacity='.75' x='9' width='6' height='25' rx='2' />
                  <rect opacity='.5' x='18' width='6' height='25' rx='2' />
                </g>
              </g>
            </svg>
          )}
        </div>

        <div className='flex-1 md:border-l border-secondary-100 dark:border-secondary-500 py-6 pr-4 md:py-8 md:px-[26px]'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 justify-between items-center'>
              <h1 className='heading-l text-primary-600 dark:text-primary-100'>
                <span>{currentBoard ? currentBoard?.name : "No Board"}</span>
              </h1>
              <img
                src={modals.isOpen ? chevronUp : chevronDown}
                alt='Chevron Logo'
                onClick={() => handleToggle("isOpen")}
                className='md:hidden'
              />
            </div>
            <div className='flex justify-between items-center gap-4'>
              <button
                className='py-2.5 px-[18px] md:py-3.5 md:px-6 md:flex md:justify-between md:items-center rounded-3xl bg-primary-400 hover:bg-primary-300 disabled:bg-primary-300 active:bg-primary-400 focus:outline-none '
                disabled={boards.length === 0 ? true : false}
              >
                {/* Smaller Screen */}
                <img src={addTaskBtn} alt='Add Task' className='md:hidden' />
                {/* Bigger Screen */}
                <p className='hidden md:block heading-m text-primary-100'>
                  + Add Task
                </p>
              </button>
              <button onClick={() => handleToggle("ellipsisOpen")}>
                <img src={ellipsis} alt='Options' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ellipsis Navigation */}
      {modals.ellipsisOpen && (
        <div className='flex flex-col gap-4 position absolute right-[12px] md:right-[24px] top-[70px] md:top-[105px] bg-primary-100 dark:bg-primary-600 rounded-lg w-[130px] md:w-[192px] p-4'>
          <span
            className='cursor-pointer text-secondary-200'
            onClick={() => handleToggle("openEditModal")}
          >
            Edit Board
          </span>
          <span className='cursor-pointer text-secondary-400'>
            Delete Board
          </span>
        </div>
      )}

      {/* Navigation tab*/}
      {modals.isOpen && (
        <div
          onClick={() => handleToggle("isOpen")}
          className='md:hidden fixed left-0 right-0 bottom-0 top-[80px] bg-[rgba(0,0,0,0.2)] z-10'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='fixed top-[80px] left-1/2 -translate-x-1/2 w-[264px] bg-white dark:bg-secondary-600 rounded-lg mt-4'
          >
            <div className='flex flex-col pr-3 py-4'>
              <div className='pl-6 mb-5'>
                <p className='text-secondary-200 tracking-[2.4px]'>
                  ALL BOARDS ({boards.length})
                </p>
              </div>
              {boards.map((board) => (
                <Link to={`/dashboard?tab=${board.slug}`} key={board.name}>
                  <div
                    className={`cursor-pointer mr-3 pl-6 py-3.5 flex gap-3 text-secondary-200 items-center hover:bg-primary-200 hover:rounded-tr-full hover:rounded-br-full ${
                      currentBoard?.name === board.name &&
                      "!bg-primary-400 !text-primary-100 rounded-tr-full rounded-br-full"
                    }`}
                    onClick={() => handleToggle("isOpen")}
                  >
                    <svg
                      width='16'
                      height='16'
                      xmlns='http://www.w3.org/2000/svg'
                      className={`${
                        currentBoard?.name === board.name
                          ? "filter invert brightness-0"
                          : ""
                      }`}
                    >
                      <path
                        d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z'
                        fill='#828FA3'
                      />
                    </svg>
                    <h1 className='heading-m'>{board.name}</h1>
                  </div>
                </Link>
              ))}

              {/* Create Board Btn  */}

              <div
                className='cursor-pointer mr-3 pl-6 py-3.5 flex gap-3 text-secondary-200 items-center hover:bg-primary-200 hover:rounded-tr-full hover:rounded-br-full'
                onClick={() => handleToggle("openModal")}
              >
                <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z'
                    fill='#635FC7'
                  />
                </svg>
                <h1 className='heading-m text-primary-400'>
                  + Create New Board
                </h1>
              </div>

              {/* Dark Mode */}
              <div className='pl-6 mt-4'>
                <div className='flex justify-center items-start py-3.5 bg-primary-200 dark:bg-primary-500 rounded-md'>
                  <div className='flex items-center gap-6'>
                    <svg
                      width='19'
                      height='19'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z'
                        fill='#828FA3'
                      />
                    </svg>
                    <label
                      htmlFor='default-toggle'
                      className='inline-flex relative items-center cursor-pointer'
                    >
                      <input
                        type='checkbox'
                        value=''
                        id='default-toggle'
                        checked={theme === "dark"}
                        className='sr-only peer'
                        onChange={() => dispatch(toggleTheme())}
                      />
                      <div className="w-[40px] h-[20px] bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-primary-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-[18px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-[14px] after:h-[14px] after:transition-all dark:border-gray-600 peer-checked:bg-primary-400"></div>
                    </label>
                    <svg
                      width='16'
                      height='16'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z'
                        fill='#828FA3'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {modals.openModal && (
        <CustomModal toggleModal={() => handleToggle("openModal")}>
          <AddBoardForm toggleModal={() => handleToggle("openModal")} />
        </CustomModal>
      )}

      {modals.openEditModal && (
        <CustomModal toggleModal={() => handleToggle("openEditModal")}>
          <EditBoardForm
            board={currentBoard}
            toggleModal={() => handleToggle("openEditModal")}
          />
        </CustomModal>
      )}
    </div>
  )
}

export default Header
