const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "Activity", {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            Dificultad: {
                type: DataTypes.ENUM("1","2","3","4","5"),
            },
            Temporada: {
                type: DataTypes.ENUM("Verano","Otoño","Invierno","Primavera"),
            },
            Duración: {
                type: DataTypes.STRING,
            },        
        
        },    {timestamps: false, },
        
    );
};