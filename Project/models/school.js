const Sequelize = require('sequelize')
const sequelize = require('../utils/DB')
const school = sequelize.define('School',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.SMALLINT.UNSIGNED
},
name:{
    allowNull: false,
    type: Sequelize.STRING(100)
},

},
{
    timestamps: false,
    tableName: 'school'
})

module.exports = school