import express from 'express';
import { mainRoutes } from './routes/mainRoutes';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const db_url: string = process.env.MONGODB_URL || 'mongodb://localhost:27017/shopify';

mongoose.connect(db_url).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});


const app = express();
app.use(express.json());

app.use(cors());

// const allowedOrigins = ['http://localhost:5173'];

// const corsOptions = {
//     // @ts-ignore
//     origin: function (origin, callback) {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true // if you want to allow cookies or authentication headers
// };

// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });

const port =  process.env.PORT || 4000;

app.use('/api/v1', mainRoutes);


app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
}
);

