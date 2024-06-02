import express from 'express'

import { getCartItems, addToCart, removeFromCart, updateCart, clearCart,placeOrder, getallOrders ,getmyOrders} from '../controllers/cart';

const cartRoutes = express.Router();

cartRoutes.get('/', getCartItems)
cartRoutes.post('/add' ,addToCart)
cartRoutes.post('/remove', removeFromCart)
cartRoutes.post('/order',placeOrder)
cartRoutes.post('/update', updateCart) 
cartRoutes.delete('/clear', clearCart)
cartRoutes.get('/all', getallOrders)
cartRoutes.get('/myorders', getmyOrders)

export { cartRoutes };