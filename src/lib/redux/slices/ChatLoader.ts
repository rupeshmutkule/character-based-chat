import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type initialType = {
    loading: boolean
}

const initialState: initialType = {
    loading: false
}

const chatLoader = createSlice({
    initialState,
    name: "chatLoader",
    reducers: {
        startLoading: (state) => {
            state.loading = true
        },
        stopLoading: (state) => {
            state.loading = false
        },
    }
})

export const { startLoading, stopLoading } = chatLoader.actions
export const selectChatLoadingState = (state: { loading: initialType }) => state.loading
export default chatLoader.reducer