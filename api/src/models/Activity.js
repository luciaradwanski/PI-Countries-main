const { DataTypes } = require('sequelize');

/* 
  Exportamos una funcion que define el modelo. 
  Luego le injectamos la conexion a sequelize */

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.ENUM("1", "2" , "3" , "4" , "5"),
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { 
                max: 30,
                min: 1
            }
        },
        seasson: {
            type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
            allowNull: false,
           
        }, 
        
    }, {timestamps: false});
};
