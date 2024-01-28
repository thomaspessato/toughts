const Tought = require('../models/Tought');
const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static async login(req, res) {
    res.render('auth/login');
  }

  static async register(req, res) {
    res.render('auth/register');
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      req.session.save(function () {
        res.redirect('/auth/register');
      });
      return;
    }

    const user = await User.findByEmail(email);
    if (user) {
      req.flash('error', 'Email already in use');
      req.session.save(function () {
        res.redirect('/auth/register');
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(name, email, hashedPassword);
    await newUser.save();
    req.flash('success', 'Registration successful');
    res.redirect('/login');
  }

  static async loginPost(req, res) {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (user && user.password === password) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  }
}