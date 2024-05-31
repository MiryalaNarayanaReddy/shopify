import { Request, Response } from "express";
import { Product } from "../models/Product";


export const getProductsByCategory = async (req: Request, res: Response) => {
    const category = req.params.category;
    try {
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }

}

export const addProduct = async (req: Request, res: Response) => {

    // get uploaded filename
    // @ts-ignore

    const image_ids: string[] = req.files.map((file: any) => file.filename);





    // console.log(req)

    // @ts-ignore
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
    }


    const product = req.body;

    try {
        const newProduct = new Product(
            {
                // @ts-ignore
                admin_id: req.user.id,
                image_ids: image_ids,
                ...product
            }
        );
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, product, { new: true });
        res.status(200).json(updatedProduct);
    }

    catch (err: any) {
        res.status(400).json({ message: err.message });
    }

}

export const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    try {
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    }

    catch (err: any) {
        res.status(400).json({ message: err.message });
    }   
}


export const getProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product);
    }

    catch (err: any) {
        res.status(400).json({ message: err.message });
    }

}


export const getAllProducts = async (req: Request, res: Response) => {

    // console.log('get all products')

    try {
       
        // const products = await Product.find(); // i am gettting an empty array here 

        const products = await Product.find();

        // console.log(products);

        res.status(200).json(products);

    }

    catch (err: any) {
        res.status(400).json({ message: err.message });
    }

}