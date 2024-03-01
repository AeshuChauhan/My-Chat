import useGetMessages from "../../hooks/useGetMessage";
import { Message } from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeletom";
import { useRef } from "react";
export const Messages = () => {
    const { messages, loading } = useGetMessages();
    console.log("🚀 ~ Messages ~ messages:", messages);
    const lastMessageRef = useRef();
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading &&
                (messages || []).length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && (messages || []).length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};