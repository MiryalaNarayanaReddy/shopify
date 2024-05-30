import express from 'express'

const collectionRoutes = express.Router();

collectionRoutes.get('/', (req, res) => {
    res.send('Collections');
});

collectionRoutes.get('/:collectionId', (req, res) => {
    res.send('Collection');
});



export { collectionRoutes };