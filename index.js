const express = require('express');
const exphbs = require('express-handlebars');

// User sessions
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// Flash messages
const flash = require('express-flash');

const app = express();

// Database connection
const conn = require('./db/conn');

conn
  .sync()
  .then(() => app.listen(3000, () => console.log('Server running')))
  .catch(console.error);