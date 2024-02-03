import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { User } from "../models/user.model.js";
import { AVATAR_URL } from "../constants.js";

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
    const newUser = new User({
        fullName,
        username,
        email,
        password,
        gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
    });
    await newUser.save();

    // Logic: Check user registration status 
    const createdUser = await User.findById(newUser.id).select("-password");
    if (!createdUser) throw new ApiError(400, "Error: Something went wrong when trying to register");

    // return the new user
    return res.status(200).json(
        new ApiResponse(200, "User Created", createdUser)
    )
});

export const loginUser = (req, res) => {
    res.send("Hello User");
};