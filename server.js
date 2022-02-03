import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
//import cors from 'cors';
import 'colors';
import 'express-async-errors';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// Get env variables
dotenv.config();

// import db connection
import connectDB from './db/connect.js';

// import app routes
import authRouter from './routes/authRoutes.js';
import foodyRouter from './routes/foodysRoutes.js';

// import middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

// Connect to database
connectDB();

// Initialize App
const app = express();

// Use middleware

// Display http requests in the terminal DEV mode
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
// Prevent CORS conflict
//app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

// json-body-parser
app.use(express.json());

// Security Sanitize
app.use(mongoSanitize());

// Set Security headers
app.use(helmet());

// Prevent xss attacks
app.use(xss());

// Use routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/foodys', foodyRouter);

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const PORT = process.env.PORT || 5001;

// Match any request verb GET-POST-PUT-PATCH-DELETE
app.use(notFoundMiddleware);

// Throw Error if there is one
app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);