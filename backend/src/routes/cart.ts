import expres from 'express'

const cartRoutes = expres.Router();

cartRoutes.get('/', (req, res) => {
    res.send('Cart');
});

cartRoutes.post('/add', (req, res) => {
    res.send('Add to cart');
});

cartRoutes.post('/remove', (req, res) => {
    res.send('Remove from cart');
});

export { cartRoutes };