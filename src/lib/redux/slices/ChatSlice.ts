import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type messagesType = {
    role: "user" | "model",
    parts: string
}


type initialStateType = {
    messages: messagesType[]
}

const initialState: initialStateType = {
    messages: []
}


const chatSlice = createSlice({
    initialState,
    name: "chat",
    reducers: {
        addMessage: (state, action: PayloadAction<{ message: messagesType }>) => {
            const { message } = action.payload
            state.messages.push(message)
        },
        setMessages: (state, action: PayloadAction<messagesType[]>) => {
            state.messages = action.payload
        },
        clearMessages: (state) => {
            state.messages = []
        }
    }
})

export const { addMessage, clearMessages, setMessages } = chatSlice.actions;

export const selectChatState = (state: { chat: initialStateType }) => state.chat;

export default chatSlice.reducer;