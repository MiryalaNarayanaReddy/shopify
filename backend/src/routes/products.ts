import express from 'express'
import { getProductsByCategory, addProduct, updateProduct, deleteProduct,getProduct,getAllProducts } from '../controllers/product';
import { authCheck } from '../middlewares/authCheck';


import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, 'uploads/')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})



const upload = multer({ storage: storage })


const productRoutes = express.Router();

// check if the user is authenticated

productRoutes.get('/category/:category', getProductsByCategory);

upload.array('productImages', 12)
// productRoutes.post('/add', upload.single('productImage'), addProduct);
productRoutes.post('/add',authCheck, upload.array('productImages', 12), addProduct);

// productRoutes.put('/:productId', updateProduct);
// productRoutes.delete('/:productId', deleteProduct);
// productRoutes.get('/product/:productId', getProduct);

productRoutes.get('/all',getAllProducts);

export { productRoutes };
