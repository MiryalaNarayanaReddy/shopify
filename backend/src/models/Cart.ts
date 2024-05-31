import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: String,
    status: String, // incart, ordered, delivered
    products: [
        {
            product_name: String,
            product_id: String,
            price_per_unit: Number,
            quantity: Number,
        }
    ],
    total_price: Number,
}, { timestamps: true , collection : 'Cart' });

export const Cart = mongoose.model('Cart', cartSchema);

