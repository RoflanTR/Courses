const { Sequelize} = require('sequelize');
const sequelize = require('../utils/DB')
const reviews = sequelize.define('reviews',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER.UNSIGNED
},
id_client:{
    allowNull: false,
    type: Sequelize.INTEGER(10).UNSIGNED
},
id_course:{
    allowNull: false,
    type: Sequelize.TINYINT(3).UNSIGNED
},
text_review:{
    allowNull: false,
    type: Sequelize.TEXT
},
score:{
    allowNull: false,
    type: Sequelize.TINYINT(3).UNSIGNED
},
date_create:{
    allowNull: false,
    type: Sequelize.DATE
},
},
{
    timestamps: false,
    tableName: 'reviews'
})
reviews.associate = models => {
    reviews.belongsTo(models.clients, {
      foreignKey: 'id_client',
      targetKey: 'id'
    });
  };
module.exports = reviews