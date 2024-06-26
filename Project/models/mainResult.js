const Sequelize = require('sequelize')
const sequelize = require('../utils/DB')
const mainResult = sequelize.define('main_result',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.SMALLINT.UNSIGNED
},
id_course:{
    allowNull: false,
    type: Sequelize.TINYINT(3).UNSIGNED
},
result:{
    allowNull: false,
    type: Sequelize.TEXT
}
},
{
    timestamps: false,
    tableName: 'main_result'
})

module.exports = mainResult