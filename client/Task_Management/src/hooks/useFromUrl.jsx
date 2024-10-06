import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

export const useFromUrlParams = (params) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { search } = useLocation()

  useEffect(() => {
    const urlParams = new URLSearchParams(search)
    const tabFromUrlParams = urlParams.get(params) || ""
    if (tabFromUrlParams) {
      setSearchTerm(tabFromUrlParams)
    }
  }, [search])

  return { searchTerm, setSearchTerm }
}
