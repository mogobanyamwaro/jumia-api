const app = require('./app');
const connectDatabase = require('./config/database');
require('dotenv').config({ path: 'config/config.env' });
const cloudinary = require('cloudinary');

// Connect to the database
connectDatabase();

const path = require('path');

// Setting up clodinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle Uncought exceptions
process.on('uncaughtException', (err) => {
  console.log('Error', err.stack);
  console.log('Shutting down due to uncought exceptions');
  process.exit(1);
});

// Setting up configuration file

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'config/config.env' });
}

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on Port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on('unhandledRejection', (err) => {
  console.log('shutting down down due to unhandled Rejection in the database');
  server.close(() => {
    process.exit(1);
  });
});
