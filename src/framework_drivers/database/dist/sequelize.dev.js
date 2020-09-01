"use strict";

var Sequelize = require('sequelize');

var config = require('../../../config'); // MODELS


var userModel = require('./models/user');

var requestModel = require('./models/request'); // Sequelize Connection


var sequelize = new Sequelize(config.DATABASE_NAME, config.DATABASE_USERNAME, config.DATABASE_PASSWORD, {
  host: config.DATABASE_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 1,
    acquire: 30000,
    idle: 10000
  }
}); // INITIALIZE MODELS

var user = userModel(sequelize, Sequelize);
var request = requestModel(sequelize, Sequelize); // MODEL RELATIONSHIP

user.belongsToMany(user, {
  through: 'friends',
  as: 'friend'
});
request.belongsTo(user, {
  as: 'sender'
}, {
  foreign_key: {
    allowNull: false
  }
});
request.belongsTo(user, {
  as: 'receiver'
}, {
  foreign_key: {
    allowNull: false
  }
});
module.exports = sequelize;