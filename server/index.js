import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { postRouter } from './router/post.router.js';
import { authRouter } from './router/auth.router.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3005;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(express.static(join(__dirname, 'dist')));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('Error starting server:', error.message);
    process.exit(1);
  }
};

start();
