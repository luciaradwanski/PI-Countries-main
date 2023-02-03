const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        "Activity", {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            difficulty: {
                type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            },
            duration: {
                type: DataTypes.STRING,
            },
            season: {
                type: DataTypes.ENUM('Summer', 'Spring', 'Winter', 'Autumn'),
            },

        },
        {timestamps: false, },
        
    );
};