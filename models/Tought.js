const { DataTypes } = require('sequelize');
const conn = require('../db/conn');

const User = require('./User');

const Tought = conn.define('toughts', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;