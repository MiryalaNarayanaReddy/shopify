import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    image_id: String,
    old_price: Number,
    new_price: Number,
}, { timestamps: true });
