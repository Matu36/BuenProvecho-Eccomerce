const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Ofertas', {

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