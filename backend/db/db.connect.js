import mongoose from 'mongoose';
import { MONGODB_DB_NAME, MONGODB_URL } from '../constants.js';

export const connectDB = async () => {
    try {
        const mongoInstance = await mongoose.connect(`${MONGODB_URL}/${MONGODB_DB_NAME}`);
        console.log("Connect MongoDB with ", mongoInstance.connections[0].name);
    } catch (error) {
        throw error;
    }
}