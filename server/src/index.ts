import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app); // Using the 'http' module correctly

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || '', {
}).then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
