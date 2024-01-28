const express = require('express');
const exphbs = require('express-handlebars');

// User sessions
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// Database connection
const conn = require('./db/conn');

// Flash messages
const flash = require('express-flash');

const app = express();


const Tought = require('./models/Tought');
const User = require('./models/User');

// Routes
const toughtsRoutes = require('./routes/toughtsRoutes');

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');



// Receive body data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
  name: 'toughts.sid',
  secret: 'nosso_secret',
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: () => {},
    path: require('path').join(require('os').tmpdir(), 'toughts-sessions'),
  }),
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    expires: 1000 * 60 * 60 * 24 * 7,
    sameSite: true,
    httpOnly: true,
  },
}))

// Flash messages
app.use(flash());

// Public path
app.use(express.static('public'));

// Set session to res
app.use((req, res, next) => {
  if(req.session.userId) {
    res.locals.user = {
      id: req.session.userId,
      name: req.session.userName,
    }
  } else {
    res.locals.user = null;
  }
  next();
});


// Routes
app.use('/toughts', toughtsRoutes);
app.get('/', (req, res) => res.redirect('/toughts'));


conn
  .sync({
    force: true
  })
  .then(() => app.listen(3000, () => console.log('Server running')))
  .catch(console.error);