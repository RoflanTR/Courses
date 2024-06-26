const Sequelize = require('sequelize')
const sequelize = require('../utils/DB')
const specialConditions = sequelize.define('special_conditions',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER.UNSIGNED
},
id_course:{
    allowNull: false,
    type: Sequelize.TINYINT(3).UNSIGNED
},
condition_course:{
    allowNull: false,
    type: Sequelize.TEXT
}
},
{
    timestamps: false,
    tableName: 'special_conditions'
})

module.exports = specialConditions