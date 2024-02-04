import jwt from "jsonwebtoken"
import { ACCESS_SECRET, SESSION_SECRET } from "../constants.js";

//Logic: AccessToken 
const generateAccessToken = (payload) => {
    const token = jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: '1d'
    });
    return token;
}

// Logic : SessionToken
const generateSessionToken = (payload) => {
    const token = jwt.sign(payload, SESSION_SECRET, {
        expiresIn: '10d'
    });
    return token;
}

// Logic : Session and AccessToken both combined together
export const generateTokken = async (payload) => {
    const accessTokken = await generateAccessToken(payload);
    const sessionTokken = await generateSessionToken(payload);
    return { accessTokken, sessionTokken };
}

// Logic : Generate and set cookies
export const generateAndSetTokkens = async (payload, res) => {
    const { accessTokken, sessionTokken } = await generateTokken(payload);
    const options = {
        httpOnly: true,
        secure: true
    }
    res.cookie('access_token', accessTokken, options)
        .cookie('session_token', sessionTokken, options)
}