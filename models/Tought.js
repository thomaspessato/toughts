const { DataTypes } = require('sequelize');
const conn = require('../db/conn');

const Tought = conn.define('toughts', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
});

module.exports = Tought;