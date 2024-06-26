const Sequelize = require('sequelize')
const sequelize = require('../utils/DB')
const courses = sequelize.define('Courses',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.TINYINT.UNSIGNED
},
name:{
    allowNull: false,
    type: Sequelize.STRING(50)
},
school:{
    allowNull: false,
    type: Sequelize.STRING(50)
},
description:{
    allowNull: false,
    type: Sequelize.TEXT
},
time:{
    allowNull: false,
    type: Sequelize.STRING(3)
},
count_lesson:{
    allowNull: false,
    type: Sequelize.STRING(3)
},
price:{
    allowNull: false,
    type: Sequelize.INTEGER(6)
},
category:{
    allowNull: false,
    type: Sequelize.TINYINT(3).UNSIGNED,
    references: {
        model: 'category',
        key: 'id'
      }
},
img:{
    allowNull: false,
    type: Sequelize.STRING(100)
},
link_tg:{
    allowNull:false,
    type: Sequelize.STRING(200)
},
average_score:{
    allowNull: true,
    type: Sequelize.DECIMAL(3,0).UNSIGNED
},
count_review:{
    allowNull: true,
    type: Sequelize.SMALLINT(5).UNSIGNED
},
},
{
    timestamps: false,
    tableName: 'courses'
})

module.exports = courses