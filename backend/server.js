import dotenv from 'dotenv';
import express from 'express';
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('api is running...');
})

app.use('/api/products', productRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));