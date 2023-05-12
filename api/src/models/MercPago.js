const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('MercPago', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    Useremail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },

    Precio: {
        type:DataTypes.INTEGER,
        allowNull:false
    },

})}