const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        // Opções adicionais
        tableName: 'users',
        timestamps: true  // Criará colunas createdAt e updatedAt automaticamente
    })

module.exports = User