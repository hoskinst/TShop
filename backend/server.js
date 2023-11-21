import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('api is running...');
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

// paypal route
app.get('/api/config/paypal', (req, res) => 
    res.send({ clientId: process.env.PAYPAY_CLIENT_ID})
);

app.use(notFound);
app.use(errorHandler);

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.listen(port, () => console.log(`Server running on port ${port}`));