const Sequelize = require('sequelize')
const config = require('../../../config')
// MODELS
const userModel = require('./models/user')
const requestModel = require('./models/request')

// Sequelize Connection
const sequelize = new Sequelize(config.DATABASE_NAME, config.DATABASE_USERNAME, config.DATABASE_PASSWORD, {
    host: config.DATABASE_HOST,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
})

// INITIALIZE MODELS
const user = userModel(sequelize, Sequelize)
const request = requestModel(sequelize, Sequelize)

// MODEL RELATIONSHIP
user.belongsToMany(user, { through: 'friends', as: 'friend' })
request.belongsTo(user, { as: 'sender' }, { foreign_key: { allowNull: false } })
request.belongsTo(user, { as: 'receiver' }, { foreign_key: { allowNull: false } })



module.exports = sequelize