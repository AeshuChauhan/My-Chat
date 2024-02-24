import { useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";
export const useSignIn = () => {
    // * error state when password and confirm password are not the same
    const [confirmError, setConfirmError] = useState(false);
    const { setAuthUser } = useAuthContext();
    const [loader, setLoader] = useState(false);


    const signIn = async (payload) => {
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
        return axios.post('/api/v1/auth/register', payload)
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
        const { password, confirmPassword } = payload;
        let isValid = false;
        const notNull = Object.values(payload).every(val => (val.trim() !== "" && val));
        if (!notNull) return false
        isValid = comparePasswords(password, confirmPassword);
        return isValid;
    }

    // * function for check password and confirm password is correct or not
    const comparePasswords = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setConfirmError(true)
            toast.error("Password and confirm password is not matched");
            return false;

        }
        setConfirmError(false)
        return true;
    }
    return {
        confirmError,
        loader,
        signIn
    }
}