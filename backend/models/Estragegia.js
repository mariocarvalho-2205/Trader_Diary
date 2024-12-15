const mongoose = require("mongoose");
const { Schema } = mongoose;

const Estrategia = mongoose.model(
    "Estrategia", 
    new Schema({
        nome: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        parametro_entrada: {
            type: String,
            required: true
        },
        parametro_saida: {
            type: String,
            required: true
        },
        alvo: {
            type: String,
            required: true
        },
        stop: {
            type: String,
            required: true
        },
        user: Object
    }, {
        timestamps: true
    })
);

module.exports = Estrategia