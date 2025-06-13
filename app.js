const cors = require('cors');
const path = require('path');
const express = require('express');
const authRoutes = require('./src/routes/authentication.routes');
const userRoutes = require('./src/routes/user.routes');
const kriptoRoutes = require('./src/routes/kripto.routes');
const swaggerRoutes = require('./src/routes/swagger.routes');

require('dotenv').config();

// Create app
const app = express();

// Middleware CORS & Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://192.168.0.109:3000',
      'https://ramalkriptoid.netlify.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
  })
);

// Middleware Logger
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// For testing only
app.get('/', (_req, res) => {
  res.send('Ramal Kripto API');
});

// Call routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/kripto', kriptoRoutes);

// Swagger
app.use(swaggerRoutes);

module.exports = app;
