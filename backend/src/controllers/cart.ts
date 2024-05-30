import { Cart } from "../models/Cart";
import { Request, Response } from 'express';

export const getCartItems = async (req: Request, res: Response) => {
    //@ts-ignore
    const user_id = req.user.id;
    try {
        const cart = await Cart.findOne({ user_id: user_id, status: 'incart' });
        res.status(200).json(cart);
    }
    catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}


export const addToCart = async (req: Request, res: Response) => {
    //@ts-ignore
    const user_id = req.user.id;
    const { product_id, price_per_unit, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ user_id: user_id, status: 'incart' });
        if (cart) {
            const product = cart.products.find((p: any) => p.product_id === product_id);
            if (product) {
                product.quantity += quantity;
            }
            else {
                cart.products.push({ product_id, price_per_unit, quantity });
            }
            cart.total_price = 0;
            cart.total_price += price_per_unit * quantity;
            await cart.save();
        }
        else {
            const newCart = new Cart({
                user_id,
                status: 'incart',
                products: [{ product_id, price_per_unit, quantity }],
                total_price: price_per_unit * quantity
            });
            await newCart.save();
        }
        res.status(201).json({ message: 'Product added to cart successfully' });
    }
    catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}


export const removeFromCart = async (req: Request, res: Response) => {
    //@ts-ignore
    const user_id = req.user.id;
    const { product_id } = req.body;
    try {
        const cart = await Cart.findOne({ user_id: user_id, status: 'incart' });
        if (cart) {
            // @ts-ignore
            cart.products = cart.products.filter((p: any) => p.product_id !== product_id);
            cart.total_price = 0;
            cart.products.forEach((p: any) => {
                // @ts-ignore
                cart.total_price += p.price_per_unit * p.quantity;
            });
            await cart.save();
            res.status(200).json({ message: 'Product removed from cart successfully' });
        }
        else {
            res.status(404).json({ message: 'Cart not found' });
        }
    }
    catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}


export const updateCart = async (req: Request, res: Response) => {
    //@ts-ignore
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ user_id: user_id, status: 'incart' });
        if (cart) {
            const product = cart.products.find((p: any) => p.product_id === product_id);
            if (product) {
                product.quantity = quantity;
                cart.total_price = 0;
                cart.products.forEach((p: any) => {
                    // @ts-ignore
                    cart.total_price += p.price_per_unit * p.quantity;
                });
                await cart.save();
                res.status(200).json({ message: 'Cart updated successfully' });
            }
            else {
                res.status(404).json({ message: 'Product not found in cart' });
            }
        }
        else {
            res.status(404).json({ message: 'Cart not found' });
        }
    }
    catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}


export const clearCart = async (req: Request, res: Response) => {
    //@ts-ignore
    const user_id = req.user.id;
    try {
        await Cart.findOneAndDelete({ user_id: user_id, status: 'incart' });
        res.status(200).json({ message: 'Cart cleared successfully' });
    }
    catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

