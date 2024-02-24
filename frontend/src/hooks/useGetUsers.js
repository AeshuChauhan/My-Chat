import axios from "axios";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

export default function useGetUsers() {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axios.post("/api/v1/users/", {}, { withCredentials: true });
                const data = await res.data;
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
}