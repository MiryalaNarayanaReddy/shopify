import express from 'express';
import { mainRoutes } from './routes/mainRoutes';
import mongoose from 'mongoose';
import cors from 'cors';

mongoose.connect('mongodb://localhost:27017/shopify').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});


const app = express();
app.use(express.json());

app.use(cors());

const port = 4000;

app.use('/api/v1', mainRoutes);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
}
);

