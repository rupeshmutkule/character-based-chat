import { configureStore } from '@reduxjs/toolkit'
import chatReducer from "./slices/ChatSlice"
import chatLoadingReducer from "./slices/ChatLoader"



const store = configureStore({
    reducer: {
        chat: chatReducer,
        loading: chatLoadingReducer
    }
})

export default store;
