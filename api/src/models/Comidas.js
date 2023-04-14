const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('comidas', {
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
    Imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Categoria: {
      type: DataTypes.STRING,
      
    },
    Efectivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MercadoPago: {
      type: DataTypes.INTEGER,
    },
    
    
  }, {
    timestamps: false   //Desactiva el DataTypes.DATE
  });
};