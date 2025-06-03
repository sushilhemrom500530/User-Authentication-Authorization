import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import config from './config';
import router from './routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,               
}));

app.use(cookieParser());

app.use(express.json());

app.use('/api/v1', router);

app.get('/', (_req, res) => {
  res.send('Server is running...');
});

app.listen(config.port, () => {
  console.log(`Server running on port : ${config.port}`);
});
