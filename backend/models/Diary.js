const mongoose = require("mongoose");
const { DATE } = require("sequelize");
const { Schema } = mongoose;

const Diary = mongoose.model(
    "Diary", 
    new Schema({
        ativo: {
            type: String,
            required: true
        },
        compra_venda: {
            type: String,
            required: true
        },
        data: {
            type: Date,
            required: true
        },
        preco_entrada: {
            type: String,
            required: true
        },
        preco_saida: {
            type: String,
            required: true
        },
        estrategia: {
            type: String,
            required: true
        },
        resultado_pts: {
            type: String,
            required: true
        },
        res_liq: {
            type: String,
            required: true
        },
        user: Object,
        adopter: Object
    }, {
        timestamps: true
    })
);

module.exports = Diary
