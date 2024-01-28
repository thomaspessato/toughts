const { DataTypes } = require('sequelize');
const conn = require('../db/conn');

const User = conn.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
});

module.exports = User;