const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class AuthController {
  static async login(req, res) {
    res.render('auth/login');
  }

  static async register(req, res) {
    res.render('auth/register');
  }

  // static async login(req, res) {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ where: { email } });

  //   if (!user) {
  //     return res.render('auth/login', { error: 'Usuário não encontrado' });
  //   }

  //   if (user.password !== password) {
  //     return res.render('auth/login', { error: 'Senha incorreta' });
  //   }

  //   req.session.user = user;

  //   res.redirect('/toughts');
  // }

  // static async register(req, res) {
  //   const { name, email, password } = req.body;

  //   const user = await User.findOne({ where: { email } });

  //   if (user) {
  //     return res.render('auth/register', { error: 'Usuário já cadastrado' });
  //   }

  //   await User.create({ name, email, password });

  //   res.redirect('/auth/login');
  // }

  // static async logout(req, res) {
  //   req.session.destroy();

  //   res.redirect('/auth/login');
  // }
}