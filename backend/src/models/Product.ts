import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    admin_id: String,
    name: String,
    category: String,
    description: String,
    image_ids: [String],
    old_price: Number,
    new_price: Number,
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
