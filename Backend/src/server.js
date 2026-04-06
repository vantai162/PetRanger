import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

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