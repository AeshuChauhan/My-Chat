import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";

export const getUserSidebar = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id;
    const allUser = await User.find({ _id: { $ne: loggedInUserId } });
    return res.status(200).json(
        new ApiResponse(200, "User Sidebar", allUser)
    )
});