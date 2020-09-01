"use strict";

module.exports = function (sequelize, type) {
  return sequelize.define('request', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    status: {
      type: type.ENUM('Cancelled', 'Pending', 'Confirmed'),
      allowNull: false,
      defaultValue: 'Pending'
    }
  }, {
    underscored: true,
    freezeTableName: true,
    initialAutoIncrement: 10000
  });
};