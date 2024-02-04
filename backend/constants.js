import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
export const AVATAR_URL = process.env.AVATAR_URL || '';
export const ACCESS_SECRET = process.env.ACCESS_SECRET;
export const SESSION_SECRET = process.env.SESSION_SECRET;
