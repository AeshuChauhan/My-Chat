import { Link } from "react-router-dom";
import GenderCheckbox from "../components/pages-components/GenderCheckBox";
import { useState } from "react";
import { useSignIn } from "../hooks/useSignin";

export default function Signin() {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });
    // * Hooks for Signin Functionality
    const { confirmError, signIn } = useSignIn(inputs);

    // !important for Inputs change events    
    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = await signIn(inputs);

        console.log("🚀 ~ handleSubmit ~ status:", status);
        return;
    }


    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form >
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='John Doe'
                            className='w-full input input-bordered  h-10'
                            name="fullName"
                            value={inputs.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Email</span>
                        </label>
                        <input
                            type='email'
                            placeholder='xyz@abc.co'
                            className='w-full input input-bordered  h-10'
                            name="email"
                            value={inputs.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='label p-2 '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='johndoe'
                            className='w-full input input-bordered h-10'
                            name="username"
                            value={inputs.username}
                            onChange={handleInputChange}
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
                            value={inputs.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            autoComplete='off'
                            className='w-full input input-bordered h-10'
                            name="confirmPassword"
                            value={inputs.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    {
                        confirmError && <span className="text-sm text-red-800"> Password and confirm password is not same </span>
                    }
                    <GenderCheckbox
                        options={['male', 'female']}
                        name="gender"
                        value={inputs.gender}
                        onChange={handleInputChange}
                    />

                    <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
                        Already have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700' type="button" onClick={handleSubmit}>Sign Up</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
