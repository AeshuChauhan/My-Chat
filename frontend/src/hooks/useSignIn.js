import { useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
export const useSignIn = () => {
    // * error state when password and confirm password are not the same
    const [confirmError, setConfirmError] = useState(false);
    const [loader, setLoader] = useState(false);


    const signIn = async (payload) => {
        const isValid = validatePayload(payload)
        if (!isValid) {
            toast.error("error validating payload");
            return false
        }
        try {
            const returnData = await finalApiCall(payload);
            console.log("🚀 ~ signIn ~ returnData:", returnData);
        } catch (error) {
            console.log("🚀 ~ signIn ~ error:", error);

        }

        console.log("🚀 ~ handleSubmit ~ payload:", payload);

        return true;

    }

    const finalApiCall = (payload) => {
        setLoader(true);
        return axios.post('http://localhost:8000/api/v1/auth/register', payload)
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log("🚀 ~ finalApiCall ~ error:", error);
                toast.error(error.response.data.message);
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
        signIn
    }
}