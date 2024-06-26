const keys = require('../keys')
const { Sequelize } = require('sequelize');

const DB_NAME = keys.DB_NAME
const USER_NAME = keys.USER_NAME
const PASSWORD =  keys.PASSWORD

const sequelize = new Sequelize(DB_NAME,USER_NAME,PASSWORD,{
    host: keys.HOST,
    dialect: keys.DIALECT
})

module.exports = sequelize