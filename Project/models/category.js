const Sequelize = require('sequelize')
const sequelize = require('../utils/DB')
const category = sequelize.define('Category',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.TINYINT.UNSIGNED
},
name_category:{
    allowNull: false,
    type: Sequelize.STRING(20)
}
},
{
    timestamps: false,
    tableName: 'category'
})

module.exports = category