import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
  board: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
    },
    signOutSuccess: (state) => {
      state.currentUser = null
      state.board = null
    },
    board: (state, action) => {
      state.board = action.payload
    },
  },
})

export const { signInSuccess, signOutSuccess, board } = userSlice.actions

export default userSlice.reducer
