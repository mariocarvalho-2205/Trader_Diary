const mongoose = require("mongoose");
const { Schema } = mongoose;

const Diary = mongoose.model(
    "Diary", 
    new Schema({
        ativo: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        preco_compra: {
            type: String,
            required: true
        },
        preco_venda: {
            type: String,
            required: true
        },
        stop: {
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
