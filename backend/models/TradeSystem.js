const mongoose = require('mongoose')
const { Schema } = mongoose

const TradeSystem = mongoose.model(
    "TradeSystem",
    new Schema({
        ativo: {
            type: String,
            required: true
        },
        operacional: {
            type: String,
            required: true
        },
        quantidade_contratos: {
            type: String,
            required: true
        },
        meta_ganho_operacao: {
            type: String,
            required: true
        },
        meta_ganho_dia: {
            type: String,
            required: true
        },
        loss_operacao: {
            type: String,
            required: true
        },
        loss_operacao_dia: {
            type: String,
            required: true
        },
        maximo_operacoes_dia: {
            type: String,
            required: true
        },
        janela_operacional: {
            type: String,
            required: true
        },
        evolucao_plano: {
            type: String,
            required: true
        },
        proximo_nivel: {
            type: String,
            required: true
        },
        criterio_proximo_nivel: {
            type: String,
            required: true
        },
        user: Object,
    }, {
        timestamps: true
    })
)

module.exports = TradeSystem