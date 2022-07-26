import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import 'colors';
import compression from 'compression';

import 'express-async-errors';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

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
import notificationRouter from './routes/notificationRoutes.js';
import profileRouter from './routes/profileRoutes.js';

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

// For compression responses
app.use(compression());

// Prevent CORS conflict
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

// json-body-parser
app.use(express.json());

// Security Sanitize
app.use(mongoSanitize());

// Set Security headers
//app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    // crossOriginResourcePolicy: 'cross-origin',
    // contentSecurityPolicy: {
    //   useDefaults: true,
    //   directives: {
    //     'default-src': ["'self'", 'data:', 'https://maps.googleapis.com'],
    //     'base-uri': ["'self'"],
    //     'font-src': ["'self'", 'https:', 'data:'],
    //     'frame-ancestors': ["'self'"],
    //     'img-src': [
    //       "'self'",
    //       'data:',
    //       'http://www.w3.org/2000/svg',
    //       'https://res.cloudinary.com',
    //       'https://maps.googleapis.com',
    //       'https://maps.gstatic.com',
    //     ],
    //     'script-src': ["'self'", 'data:', 'https://maps.googleapis.com'],
    //     'script-src-attr': ["'none'"],
    //     'style-src': ["'self'", 'https:', "'unsafe-inline'"],
    //   },
    // },
  })
  // helmet.contentSecurityPolicy({

  // })
);

// Prevent xss attacks
app.use(xss());

// Use routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/foodys', foodyRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/profile', profileRouter);

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
