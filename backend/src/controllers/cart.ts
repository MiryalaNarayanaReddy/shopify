import { Cart } from "../models/Cart";
import { Request, Response } from 'express';
import { Product } from '../models/Product';

export const getCartItems = async (req: Request, res: Response) => {
    //@ts-ignore
    const user_id = req.user.id;
    try {
        let cart = await Cart.findOne({ user_id: user_id, status: 'incart' });

        // for each product in the cart, get the product details from the products collection

        if (cart) {

            // @ts-ignore
            const products = cart.products.map(async (p: any) => {

                const product = await Product
                    .findById(p.product_id)
                    .select(' images category')

                    // console.log(product);
                    // @ts-ignore
                return {
                    
                    // @ts-ignore
                    image: product.images[0].data,
                    // @ts-ignore
                    image_type: product.images[0].contentType,
                    product_category: product?.category,
                    quantity: p.quantity,
                    price_per_unit: p.price_per_unit,
                    product_id: p.product_id,
                    product_name: p.product_name,
                    
                };


            })
            const productsData = await Promise.all(products);

            const newcart = {
                products: productsData,
                total_price: cart.total_price
            }

            return res.status(200).json(newcart);
        }


        if (!cart) {
            return res.status(200).json(
                {
                    products: [],
                }
            
            );
        }
    }
    catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export const addToCart = async (req: Request, res: Response) => {
    //@ts-ignore
    const user_id = req.user.id; // Assuming `req.user` is populated correctly
    const { product_name, product_id, price_per_unit, quantity } = req.body;

    if (!user_id || !product_name || !product_id || !price_per_unit || !quantity) {
        return res.status(400).json({ message: 'Invalid request data' });
    }

    try {
        const cart = await Cart.findOne({ user_id, status: 'incart' });

        if (cart) {
            const product = cart.products.find((p: any) => p.product_id === product_id);
            if (product) {
                product.quantity += quantity;
                // @ts-ignore
                cart.total_price += price_per_unit * quantity;
            } else {
                cart.products.push({ product_name, product_id, price_per_unit, quantity });
                // @ts-ignore
                cart.total_price += price_per_unit * quantity;
            }
            await cart.save();

            return res.status(201).json(cart);

        } else {
            const newCart = new Cart({
                user_id,
                status: 'incart',
                products: [{ product_name, product_id, price_per_unit, quantity }],
                total_price: price_per_unit * quantity,
            });
            await newCart.save();
            return res.status(201).json(newCart);
        }

        // res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    //@ts-ignore
    const user_id = req.user.id;
    const { product_id } = req.body;

    // console.log(req.body);
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

