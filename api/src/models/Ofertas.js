const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {

    sequelize.define('ofertas', {

Nombre: {
    type: DataTypes.STRING,
    allowNull:false,

},
Imagen: {
    type: DataTypes.TEXT,
    allowNull:false
},
Efectivo: {
    type: DataTypes.INTEGER,
    allowNull:false
}

    })
}