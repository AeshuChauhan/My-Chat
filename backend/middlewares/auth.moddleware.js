import { ACCESS_SECRET } from "../constants.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {

    const token = req.cookies.access_token;
    if (!token) throw new ApiError(400, "No token provided");

    const decoded = jwt.verify(token, ACCESS_SECRET);
    if (!decoded) throw new ApiError(400, "Invalid access token");

    // Logic: Add decoded UserData to user property
    req.user = decoded;
    next();

})