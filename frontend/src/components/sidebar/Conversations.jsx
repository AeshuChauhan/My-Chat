import useGetUsers from "../../hooks/useGetUsers";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";
const Conversations = () => {
    const { conversations } = useGetUsers()
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === conversations.length - 1}
                />
            ))}
        </div>
    );
};
export default Conversations;