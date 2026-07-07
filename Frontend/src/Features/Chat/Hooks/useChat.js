import socketIoService from "../Services/chat.socket"
import { deleteChatAPi, sendQueryApi } from "../Services/chatApi";
import { useDispatch } from 'react-redux';
import { setChatMessages, setChats } from "../State/chatSlice";
import { setError, setLoading } from "../../Auth/State/authSlice";

const useChat = () => {

    const dispatch = useDispatch();

    const socketConnectionHandler = () => {
        return socketIoService;
    }

    const sendQueryHandler = async (query) => {

        dispatch(setLoading(true));
        dispatch(setChatMessages({ content: query, role: 'human' }));
        try {

            const res = await sendQueryApi(query);
            dispatch(setChats({ title: res.chat?.title, id: res.chat?._id }));
            dispatch(setChatMessages({ content: res.AiResponse, chatId: res.chat?._id, role: res.role }));
        }
        catch (error) {
            dispatch(setError(error.message));
            console.log(error);
        }
        finally {
            dispatch(setLoading(false));
        }

    }

    const getChatsHandler = async () => {
        const res = await getChatsAPi();
        dispatch(setChats)
        return res;
    }

    const getMessagesHandler = async () => {
        const res = await getMessagesApi();
        return res;
    }

    const deleteChatHandler = async () => {
        const res = await deleteChatAPi();
        return res;
    }

    return { socketConnectionHandler, sendQueryHandler, getChatsHandler, getMessagesHandler, deleteChatHandler }
}

export default useChat;