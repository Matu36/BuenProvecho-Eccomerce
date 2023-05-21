const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {

    sequelize.define('ofertas', {
id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primarykey:true,
    autoIncrement:true
    
},
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