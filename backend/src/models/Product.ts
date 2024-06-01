import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    admin_id: String,
    name: String,
    category: String,
    description: String,
    images : [{
        data : String,
        contentType: String
    }],
    old_price: Number,
    new_price: Number,
},  { collection : 'Product' , timestamps: true });

export const Product = mongoose.model('Product', productSchema);
