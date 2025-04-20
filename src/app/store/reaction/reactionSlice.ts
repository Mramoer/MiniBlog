import { createSlice } from "@reduxjs/toolkit";

export const reactionSlice = createSlice({
    name: 'reactions',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        }
    }
})

export const {increment} = reactionSlice.actions
export default reactionSlice.reducer