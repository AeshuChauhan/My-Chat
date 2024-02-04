import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { User } from "../models/user.model.js";
import { AVATAR_URL } from "../constants.js";
import { generateAndSetTokkens } from "../utils/generateTokken.js";
import bcrypt from "bcryptjs";

// Auth controller : Registration Function
export const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password, confirmPassword, gender } = req.body;

    // Logic: All necessary data is available
    if (!fullName || !email || !username || !password || !confirmPassword || !gender) throw new ApiError(400, "Invalid data", { fullName, email, username, password, confirmPassword, gender });

    //check if the password is correct
    if (password !== confirmPassword) throw new ApiError(500, "Invalid password");

    // check if Username is already registered
    const user = await User.findOne({ username });
    if (user) throw new ApiError(400, "User already exists");

    // Dynamic Avatar URL
    const boyProfilePic = `${AVATAR_URL}/boy?username=${username}`;
    const girlProfilePic = `${AVATAR_URL}/girl?username=${username}`;

    // Logic: Register the user 
    const userPayload = {
        fullName,
        username,
        email,
        password,
        gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
    }
    const newUser = new User(userPayload);
    await newUser.save();
    // generateAndSetTokkens(userPayload, res);
    // Logic: Check user registration status 
    const createdUser = await User.findById(newUser.id).select("-password");
    if (!createdUser) throw new ApiError(400, "Error: Something went wrong when trying to register");

    // return the new user
    return res.status(200).json(
        new ApiResponse(200, "User Created", createdUser)
    )
});

// Auth controller : Login Function
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Logic: All necessary data is available
    if (!email || !password) throw new ApiError(400, "Invalid data", { email: email, password: password });

    const userDetail = await User.findOne({ email });
    if (!userDetail) throw new ApiError(400, "User not found");

    // Logic: Check password
    const isMatch = await bcrypt.compare(password, userDetail.password);
    if (!isMatch) throw new ApiError(400, "Invalid password", { password: password });

    // Logic: Generate and set cokkies
    await generateAndSetTokkens(
        {
            _id: userDetail.id,
            fullName: userDetail.fullName,
            username: userDetail.username,
            email: userDetail.email,
            gender: userDetail.gender,
            profilePic: userDetail.profilePic
        }, res);

    // return the new user
    return res.status(200).json(
        new ApiResponse(200, "Login ScuccessFull", userDetail)
    )
});

// Auth controller : Logout Function
export const logout = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    res.clearCookie('access_token', options)
        .clearCookie('session_token', options)

    return res.status(200).json(
        new ApiResponse(200, "Logout Successfull")
    );
});