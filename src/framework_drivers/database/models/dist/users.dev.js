"use strict";

module.exports = function (sequelize, type) {
  return sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    fullname: {
      type: type.STRING,
      allowNull: false
    },
    mobileNo: {
      type: type.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Mobile No should be unique.'
      },
      validate: {
        isNumeric: true,
        len: [10, 10]
      }
    },
    email: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    profilePicture: {
      type: type.STRING,
      allowNull: true
    }
  }, {
    underscored: true,
    freezeTableName: true,
    initialAutoIncrement: 10000
  });
};