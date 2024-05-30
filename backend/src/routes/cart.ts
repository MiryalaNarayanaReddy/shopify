import express from 'express'

import { getCartItems, addToCart, removeFromCart, updateCart, clearCart } from '../controllers/cart';

const cartRoutes = express.Router();

cartRoutes.get('/', getCartItems)
cartRoutes.post('/add' ,addToCart)
cartRoutes.post('/remove', removeFromCart)
cartRoutes.put('/update', updateCart) 
cartRoutes.delete('/clear', clearCart)

export { cartRoutes };