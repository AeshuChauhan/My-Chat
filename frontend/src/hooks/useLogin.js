import { useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";
export const useLogIn = () => {
    const { setAuthUser } = useAuthContext();
    const [loader, setLoader] = useState(false);


    const logIn = async (payload) => {
        const isValid = validatePayload(payload)
        if (!isValid) {
            toast.error("error validating payload");
            return false
        }
        try {
            await finalApiCall(payload);
        } catch (error) {
            toast.error('Failed:' + error);
        }
        return true;

    }

    // * function for final api call
    const finalApiCall = (payload) => {
        setLoader(true);
        return axios.post('/api/v1/auth/login', payload, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('user-info', JSON.stringify(response.data.data));
                    setAuthUser(response.data.data);
                    toast.success('signup successful');
                }
            })
            .catch((error) => {
                throw (error.response.data.message);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    // * function for validate payload (should be called)
    const validatePayload = (payload) => {
        let isValid = true;
        const notNull = Object.values(payload).every(val => (val.trim() !== "" && val));
        if (!notNull) return false
        return isValid;
    }

    return {
        loader,
        logIn
    }
}