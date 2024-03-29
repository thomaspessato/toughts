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

    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      req.flash('error', 'Email already in use');
      req.session.save(function () {
        res.redirect('/auth/register');
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);
      req.session.userId = createdUser.id;
      req.flash('success', 'Registration successful');
      req.session.save(function () {
        res.redirect('/toughts');
      });
    } catch (error) {
      req.flash('error', 'Error creating user');
      req.session.save(function () {
        res.redirect('/auth/register');
      });
      return;
    }
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email }, raw: true });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.userId = user.id;
      req.session.save(function () {
        res.redirect('/toughts');
      });
    } else {
      req.flash('error', 'Invalid credentials');
      req.session.save(function () {
        res.redirect('/auth/login');
      });
    }
  }

  static async logout(req, res) {
    req.session.destroy();
    res.redirect('/auth/login');
  }
}