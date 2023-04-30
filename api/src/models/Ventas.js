const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Ventas', {
    UserEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'email'
      }
    },
    Comidaid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PreferenceId: {
      type: DataTypes.STRING,
    },
    PrecioTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    timestamps: false
  });
}  