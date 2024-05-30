import express from 'express'
import { authUserRoutes } from './authUser';
import { authAdminRoutes } from './authAdmin';
import { productRoutes } from './products';
import { collectionRoutes } from './collections';
import { cartRoutes } from './cart';



const mainRoutes = express.Router();

mainRoutes.use('/auth/user', authUserRoutes);
mainRoutes.use('/auth/admin', authAdminRoutes);
mainRoutes.use('/products', productRoutes);
mainRoutes.use('/collections', collectionRoutes);
mainRoutes.use('/cart', cartRoutes);


export { mainRoutes };