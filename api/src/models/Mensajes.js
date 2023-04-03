const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Mensajes', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },

    Nombre: {
        type:DataTypes.STRING,
        allowNull:false
    },

    Mensaje: {
        type:DataTypes.TEXT,
        allowNull:false
    },})
}