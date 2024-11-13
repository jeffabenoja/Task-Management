import chevronUp from "../assets/icon-chevron-up.svg"
import chevronDown from "../assets/icon-chevron-down.svg"
import addTaskBtn from "../assets/icon-add-task-mobile.svg"
import ellipsis from "../assets/icon-vertical-ellipsis.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useFromUrlParams } from "../hooks/useFromUrl"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../controller/services/theme"
import CustomModal from "../components/modal/CustomModal"
import AddBoardForm from "../components/modal/AddBoardForm"
import EditBoardForm from "../components/modal/EditBoardForm"
import AddTaskForm from "../components/modal/AddTaskForm"
import DeleteBoard from "../components/modal/DeleteBoard"
import api from "../controller/services/api"

const Header = ({ boards }) => {
  // Use the custom hook to get the current tab
  const { theme } = useSelector((state) => state.theme)
  const { searchTerm: tab } = useFromUrlParams("tab")

  const dispatch = useDispatch()

  const [signOutUser] = api.useSignOutUserMutation()

  const [modals, setModals] = useState({
    isOpen: false,
    openModal: false,
    openEditModal: false,
    ellipsisOpen: false,
    openAddTask: false,
    openDelete: false,
  })

  const currentBoard = boards.find((board) => board.slug === tab)

  const handleToggle = (modal) => {
    setModals((prev) => ({
      ...prev,
      [modal]: !prev[modal],
    }))
  }

  const handleSignOut = async () => {
    try {
      await signOutUser()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full relative h-[60px] md:h-[80px] lg:h-[96px]'>
      {/* Header */}
      <div className='w-full inline-flex h-full items-center z-20 bg-primary-100 dark:bg-secondary-600'>
        {/* Logo Section */}
        <div className='hidden md:block py-6 pl-4 md:py-7 md:pl-[26px] md:w-[300px] h-full'>
          <h1 className='text-center cursor-pointer sm:text-4xl font-bold dark:text-[#F5B757] text-[#112F1B]'>
            Chain Task <sup>TM</sup>
          </h1>
        </div>

        <div className='flex-1 md:border-l border-secondary-100 dark:border-secondary-500 px-4 lg:py-7 md:px-[26px]'>
          <div className='flex justify-between items-center h-full'>
            <div className='flex gap-2 justify-between items-center'>
              <h1 className='heading-l text-primary-600 dark:text-primary-100 uppercase truncate'>
                <span>
                  {currentBoard ? currentBoard?.name : "Task Management"}
                </span>
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
                onClick={() => handleToggle("openAddTask")}
                className='py-2.5 px-[18px] lg:py-3.5 md:px-6 md:flex md:justify-between md:items-center rounded-3xl bg-[#112F1B] hover:bg-[#93A27B] disabled:bg-[#93A27B] active:bg-[#93A27B] focus:outline-none '
                disabled={boards.length === 0 ? true : false}
              >
                {/* Smaller Screen */}
                <img src={addTaskBtn} alt='Add Task' className='md:hidden' />
                {/* Bigger Screen */}
                <p className='hidden md:block heading-m text-[#F5B757]'>
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
          <span
            className='cursor-pointer text-secondary-400'
            onClick={() => handleToggle("openDelete")}
          >
            Delete Board
          </span>
          <span
            className='cursor-pointer text-[#112F1B] dark:text-[#F5B757] font-bold'
            onClick={handleSignOut}
          >
            Sign Out
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
                      "!bg-[#112F1B] !text-[#F5B757] rounded-tr-full rounded-br-full"
                    }`}
                    onClick={() => handleToggle("isOpen")}
                  >
                    <svg
                      width='16'
                      height='16'
                      xmlns='http://www.w3.org/2000/svg'
                      className={`${
                        currentBoard?.name === board.name
                          ? "fill-[#F5B757]"
                          : "fill-[#828FA3]"
                      }`}
                    >
                      <path d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z' />
                    </svg>
                    <h1 className='heading-m truncate'>{board.name}</h1>
                  </div>
                </Link>
              ))}

              {/* Create Board Btn  */}

              <div
                className='cursor-pointer mr-3 pl-6 py-3.5 flex gap-3 text-secondary-200 items-center hover:bg-primary-200 hover:rounded-tr-full hover:rounded-br-full'
                onClick={() => handleToggle("openModal")}
              >
                <svg
                  width='16'
                  height='16'
                  xmlns='http://www.w3.org/2000/svg'
                  className='fill-[#112F1B] dark:fill-[#F5B757]'
                >
                  <path d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z' />
                </svg>
                <h1 className='heading-m text-[#112F1B] dark:text-primary-100'>
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
                      <div className="w-[40px] h-[20px] bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-primary-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-[18px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-[14px] after:h-[14px] after:transition-all dark:border-gray-600 peer-checked:bg-[#F5B757]"></div>
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

      {modals.openDelete && (
        <CustomModal toggleModal={() => handleToggle("openDelete")}>
          <DeleteBoard
            board={currentBoard}
            toggleModal={() => handleToggle("openDelete")}
          />
        </CustomModal>
      )}

      {modals.openAddTask && (
        <CustomModal toggleModal={() => handleToggle("openAddTask")}>
          <AddTaskForm
            columns={currentBoard?.columns}
            toggleModal={() => handleToggle("openAddTask")}
          />
        </CustomModal>
      )}
    </div>
  )
}

export default Header
