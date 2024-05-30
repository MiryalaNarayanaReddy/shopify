import express from 'express'

const productRoutes = express.Router();

productRoutes.get('/', (req, res) => {
    res.send('Products');
});

productRoutes.get('/:productId', (req, res) => {
    res.send('Product');
});

export { productRoutes };
