import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    role: String,
}, { timestamps: true , collection : 'User' });

export const User = mongoose.model("User", userSchema);

