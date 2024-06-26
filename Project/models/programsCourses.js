const Sequelize = require('sequelize')
const sequelize = require('../utils/DB')
const programsCourses = sequelize.define('programs_courses',{
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
program_step:{
    allowNull: false,
    type: Sequelize.STRING(300)
}
},
{
    timestamps: false,
    tableName: 'programs_courses'
})

module.exports = programsCourses