import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import config from './config';
import router from './routes';

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

app.get('/', (_req, res) => {
  res.send('Server is running...');
});

app.listen(config.port, () => {
  console.log(`Server running on port : ${config.port}`);
});
