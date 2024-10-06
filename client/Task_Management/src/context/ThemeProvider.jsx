import { useSelector } from "react-redux"

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme)
  return (
    <div className={theme}>
      <div className='text-primary-600 dark:text-primary-100 min-h-screen '>
        {children}
      </div>
    </div>
  )
}

export default ThemeProvider
