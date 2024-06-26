const { Sequelize} = require('sequelize');
const sequelize = require('../utils/DB')
const clients = sequelize.define('clients',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER.UNSIGNED
},
name:{
    allowNull: false,
    type: Sequelize.STRING(50)
},
last_name:{
    allowNull: false,
    type: Sequelize.STRING(50)
},
email:{
    allowNull: false,
    type: Sequelize.STRING(50)
},
number:{
    allowNull: false,
    type: Sequelize.STRING(11)
},
login:{
    allowNull: false,
    type: Sequelize.STRING(50)
},
password:{
    allowNull: false,
    type: Sequelize.STRING(80)
},
role:{
    allowNull: true,
    type: Sequelize.STRING(10)
}
},
{
    timestamps: false,
    tableName: 'clients'
})

module.exports = clients