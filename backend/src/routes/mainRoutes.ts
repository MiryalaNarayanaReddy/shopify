import express from 'express'
import { authUserRoutes } from './authUser';
import { authAdminRoutes } from './authAdmin';
import { productRoutes } from './products';
import { cartRoutes } from './cart';
import { authCheck } from '../middlewares/authCheck';



const mainRoutes = express.Router();

mainRoutes.use('/auth/user', authUserRoutes);
mainRoutes.use('/auth/admin', authAdminRoutes);

mainRoutes.use('/products', productRoutes);
mainRoutes.use('/cart',authCheck, cartRoutes);

export { mainRoutes };