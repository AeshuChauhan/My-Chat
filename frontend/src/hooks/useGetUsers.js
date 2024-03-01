import axios from "axios";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import useLogout from "./useLogout";

export default function useGetUsers() {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const { logout } = useLogout()
    const getConversations = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/api/v1/users/");
            console.log("🚀 ~ getConversations ~ res: ", res);
            const data = await res.data;
            if (data.error) {
                console.log(data.error);
                logout();
                throw new Error(data.error);

            }
            setConversations(data.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getConversations();
    }, []);

    return { loading, conversations };
}