const Tought = require('../models/Tought');
const User = require('../models/User');
const { Op } = require('sequelize');

module.exports = class ToughtController {
  static async showToughts(req, res) {

    let search = '';
    let order = 'DESC';
    if(req.query.search){
      search = req.query.search;
    }

    if(req.query.order === 'old'){
      order = 'ASC';
    } else if(req.query.order === 'new'){
      order = 'DESC';
    }

    const toughtsData = await Tought.findAll({
      include: User,
      where: {
        title: {
          [Op.like]: `%${search}%`
        },
      },
      order: [
        ['createdAt', order]
      ]
    }
    );

    const toughts = toughtsData.map(tought => tought.get({ plain: true }));

    console.log(toughts);
    res.render('toughts/home', { toughts });
  }

  static async dashboard(req, res) {
    const userId = req.session.userId;

    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true
    });

    const toughts = user.toughts.map(tought => tought.dataValues);

    let emptyToughts = false;

    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render('toughts/dashboard', { toughts, emptyToughts });
  }


  static async editTought(req, res) {
    const { id } = req.params;
    const userId = req.session.userId;
    const tought = await Tought.findOne({
      where: {
        id,
        userId
      },
      raw: true
    });

    console.log(tought)
    if (!tought) {
      req.flash('error', 'Tought not found');
      req.session.save(function () {
        res.redirect('/toughts/dashboard');
      });
      return;
    }

    res.render('toughts/edit', { tought });
  }

  static async editToughtPost(req, res) {
    const { id, title } = req.body;
    const userId = req.session.userId;
    try {
      await Tought.update({
        title
      }, {
        where: {
          id,
          userId
        }
      });
      req.flash('success', 'Tought updated successfully');
      req.session.save(function () {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      req.flash('error', 'Error updating tought');
      req.session.save(function () {
        res.redirect('/toughts/dashboard');
      });
      return;
    }
  }

  static async createTought(req, res) {
    res.render('toughts/create');
  }

  static async deleteTought(req, res) {
    const { id } = req.body;
    const userId = req.session.userId;
    try {
      await Tought.destroy({
        where: {
          id,
          userId
        }
      });
      req.flash('success', 'Tought deleted successfully');
      req.session.save(function () {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      req.flash('error', 'Error deleting tought');
      req.session.save(function () {
        res.redirect('/toughts/dashboard');
      });
      return;
    }
  }

  static async createToughtPost(req, res) {
    const { title } = req.body;
    const userId = req.session.userId;
    const tought = {
      title,
      userId,
    };

    try {
      await Tought.create(tought);
      req.flash('success', 'Tought created successfully');
      req.session.save(function () {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      req.flash('error', 'Error creating tought');
      req.session.save(function () {
        res.redirect('/toughts/add');
      });
      return;
    }
  }

}