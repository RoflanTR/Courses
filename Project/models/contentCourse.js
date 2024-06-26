const Sequelize = require('sequelize')
const sequelize = require('../utils/DB')
const contentCourse = sequelize.define('contentCourse',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.TINYINT.UNSIGNED
},
id_course:{
    allowNull: false,
    type: Sequelize.TINYINT(3)
},
number_lesson:{
    allowNull: false,
    type: Sequelize.TINYINT(3)
},
name_lesson:{
    allowNull: false,
    type: Sequelize.STRING(120)
},

link_video:{
    allowNull: false,
    type: Sequelize.STRING(50)
},

},
{
    timestamps: false,
    tableName: 'content_courses'
})

module.exports = contentCourse