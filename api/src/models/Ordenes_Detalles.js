const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ordenes_Detalles', {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    comidaId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: false
  }).removeAttribute('id');
};