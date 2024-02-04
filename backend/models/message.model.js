import mongoose, { Schema } from "mongoose";
const msgSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

export const Message = mongoose.model("Message", msgSchema);
