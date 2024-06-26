const Sequelize = require('sequelize')
const sequelize = require('../utils/DB')
const sold = sequelize.define('sold',{
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
id_client:{
    allowNull: false,
    type: Sequelize.INTEGER.UNSIGNED
},
date_sold:{
    allowNull: false,
    type: Sequelize.DATE
},
},
{
    timestamps: false,
    tableName: 'sold'
})

module.exports = sold