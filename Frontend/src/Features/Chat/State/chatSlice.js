import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [{
            title: '',
            id: null
        }],
        currentChat: null,
        chatMessages: [{
            content: '',
            chatId: null,
            time: null,
            role: null,
        }],
        chatLoading: false,
        chatError: false
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        AddNewChat: (state, action) => {
            state.chats.push(action.payload);
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        setChatMessages: (state, action) => {
            state.chatMessages = action.payload;
        },
        AddNewChatMessage: (state, action) => {
            state.chatMessages.push(action.payload);
        },
        deleteChat: (state, action) => {
            const index = state.chats.indexOf(action.payload);
            state.chats.splice(index, 1);
        },
        setChatLoading: (state, action) => {
            state.loading = action.payload;
        },
        setChatError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setChats, AddNewChat, setCurrentChat, setChatMessages, AddNewChatMessage, deleteChat, setChatLoading, setChatError } = chatSlice.actions;
export default chatSlice.reducer;