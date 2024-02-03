import mongoose, { Schema } from 'mongoose';

import bcrypt from "bcryptjs"

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female']

        },
        profilePic: {
            type: String,
            default: " ",
            required: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next()
})

export const User = mongoose.model('User', userSchema);
