const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = mongoose.model(
	"User",
	new Schema(
		{
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			password: {
				type: String,
				required: true,
			},
			image: {
				type: String,
				required: true,
			},
		},
		{
			timestamps: true,
		}
	)
);

// const { DataTypes } = require("sequelize");
// const db = require("../db/conn");

// const User = db.define(
// 	"User",
// 	{
// 		name: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		email: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		password: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 	},
// 	{
// 		// Opções adicionais
// 		tableName: "users",
// 		timestamps: true, // Criará colunas createdAt e updatedAt automaticamente
// 	}
// );

module.exports = User;
