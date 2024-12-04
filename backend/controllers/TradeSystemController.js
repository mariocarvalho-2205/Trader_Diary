const TradeSystem = require('../models/TradeSystem')

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const createTradeSystem = async (req, res) => {
    const token = getToken(req);
	const user = await getUserByToken(token);

    const {
        ativo,
        operacional,
        quantidade_contratos,
        meta_ganho_operacao,
        meta_ganho_dia,
        loss_operacao,
        loss_operacao_dia,
        maximo_operacoes_dia,
        janela_operacional,
        evolucao_plano,
        proximo_nivel,
        criterio_proximo_nivel
    } = req.body

    if (!ativo) {
        res.status(422).json({ message: "O Ativo é obrigatório!" })
        return
    }
    if (!operacional) {
        res.status(422).json({ message: "O Operacional é obrigatório!" })
        return
    }
    if (!quantidade_contratos) {
        res.status(422).json({ message: "A quantidade de contratos é obrigatória!" })
        return
    }
    if (!meta_ganho_operacao) {
        res.status(422).json({ message: "A meta de ganho por operação é obrigatória!" })
        return
    }
    if (!meta_ganho_dia) {
        res.status(422).json({ message: "A meta de ganho por dia é obrigatória!" })
        return
    }
    if (!loss_operacao) {
        res.status(422).json({ message: "A meta de loss por operação é obrigatória!" })
        return
    }
    if (!loss_operacao_dia) {
        res.status(422).json({ message: "A meta de loss diario é obrigatória!" })
        return
    }
    if (!maximo_operacoes_dia) {
        res.status(422).json({ message: "O maximo de operações por dia é obrigatório!" })
        return
    }
    if (!janela_operacional) {
        res.status(422).json({ message: "Periodo operacional é obrigatório!" })
        return
    }
    if (!evolucao_plano) {
        res.status(422).json({ message: "A evolução do plano é obrigatório!" })
        return
    }
    if (!proximo_nivel) {
        res.status(422).json({ message: "O proximo nivél é obrigatório!" })
        return
    }
    if (!criterio_proximo_nivel) {
        res.status(422).json({ message: "Criterio para passar de nivél é obrigatório!" })
        return
    }

    const tradeSystem = new TradeSystem ({
        ativo,
        operacional,
        quantidade_contratos,
        meta_ganho_operacao,
        meta_ganho_dia,
        loss_operacao,
        loss_operacao_dia,
        maximo_operacoes_dia,
        janela_operacional,
        evolucao_plano,
        proximo_nivel,
        criterio_proximo_nivel,
        user: {
			_id: user._id,
			name: user.name,
		}
    })
    
    try {
        const newTradeSystem = await tradeSystem.save()
        res.status(200).json({ message: "Ativo ok", newTradeSystem })
    } catch (error) {
        res.status(500).json({message: "Algo deu errado na criação do trade system", error: error})
    }
}

module.exports = {
    createTradeSystem
}