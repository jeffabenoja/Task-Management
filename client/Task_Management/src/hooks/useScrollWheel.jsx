import { useEffect, useRef } from "react"

export const useScrollWheel = () => {
  const columnsRef = useRef(null) // Initialize ref
  const handleWheel = (e) => {
    e.preventDefault()
    if (columnsRef.current) {
      columnsRef.current.scrollLeft += e.deltaY
    }
  }

  useEffect(() => {
    const currentColumnsRef = columnsRef.current
    if (currentColumnsRef) {
      // Add event listener with 'passive: false' to prevent default scrolling
      currentColumnsRef.addEventListener("wheel", handleWheel, {
        passive: false,
      })
    }

    // Cleanup function to remove the event listener
    return () => {
      if (currentColumnsRef) {
        currentColumnsRef.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  return columnsRef
}
