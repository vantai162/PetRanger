import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import petRoutes from './routes/pet.routes.js';
import productRoutes from './routes/product.routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/pets', petRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

export default app;