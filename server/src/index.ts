import express from 'express';
import cors from 'cors';
import connectDB from './db/connect';
import router from './routes';
import config from './config';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
