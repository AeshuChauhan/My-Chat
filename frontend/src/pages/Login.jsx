import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogIn } from "../hooks/useLogin";

export default function Login() {
    const [logInPayload, setLogInPayload] = useState({
        email: "",
        password: "",
    });
    const { logIn } = useLogIn();
    const handlePayload = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLogInPayload({ ...logInPayload, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await logIn(logInPayload);
    }



    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Email</span>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            className='w-full input input-bordered h-10'
                            name="email"
                            value={logInPayload.email}
                            onChange={handlePayload}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            className='w-full input input-bordered h-10'
                            name="password"
                            value={logInPayload.password}
                            onChange={handlePayload}
                        />
                    </div>
                    <Link to='/signIn' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2' type="button" onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
