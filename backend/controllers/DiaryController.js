const Diary = require("../models/Diary");
const User = require("../models/User");
const Estrategia = require("../models/Estragegia");
const calc = require("../calculos/calc");

const { Op } = require("sequelize");
const mongoose = require("mongoose");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const createEntry = async (req, res) => {
	const {
		ativo,
		data,
		compra_venda,
		preco_entrada,
		stop,
		preco_saida,
		estrategia,
	} = req.body;
	let res_liq;

	if (!ativo) {
		res.status(422).json({ message: "O Ativo é obrigatório!" });
		return;
	}
	if (!data) {
		res.status(422).json({ message: "A data é obrigatória!" });
		return;
	}
	if (!compra_venda) {
		res.status(422).json({
			message: "O tipo de operação se compra ou venda é obrigatório!",
		});
		return;
	}
	if (!preco_entrada) {
		res.status(422).json({ message: "O preço de compra é obrigatório!" });
		return;
	}
	if (!stop) {
		res.status(422).json({ message: "O preço de stop é obrigatório!" });
		return;
	}
	if (!preco_saida) {
		res.status(422).json({ message: "O preço de venda é obrigatório!" });
		return;
	}
	if (!estrategia) {
		res.status(422).json({ message: "A estrategia é obrigatória!" });
		return;
	}

	// logica ressultado
	let resultado_pts = await calc(compra_venda, preco_entrada, preco_saida);

	if (ativo === "win") {
		res_liq = resultado_pts * 0.2;
		console.log("res_liq", res_liq);
	}
	if (ativo === "dol") {
		res_liq = resultado_pts * 10;
	}

	const token = getToken(req);
	const user = await getUserByToken(token);
	let capital_res = parseInt(user.capital) + parseInt(res_liq);
	console.log(capital_res, "cap");

	const estrategiaCompleta = await Estrategia.findOne({nome: estrategia});
	console.log(estrategiaCompleta.nome, 'estrategia completa')

	const entryTrade = new Diary({
		ativo,
		compra_venda,
		data,
		preco_entrada,
		stop,
		preco_saida,
		estrategia: estrategiaCompleta.nome,
		resultado_pts,
		res_liq,
		user: {
			_id: user._id,
			name: user.name,
			capital: String(capital_res),
		},
	});

	try {
		const newTrade = await entryTrade.save();
		const updatedUser = await User.findOneAndUpdate(
			{ _id: user._id },
			{ $set: { capital: String(capital_res) } },
			{ new: true }
		);
		res.status(201).json({
			message: "Trade inserido com sucesso!",
			newTrade,
		});
	} catch (error) {
		res.status(500).json({ message: "Erro ao criar entrada", error });
	}
};

const getAllTrades = async (req, res) => {
	const token = getToken(req);
	const user = await getUserByToken(token);

	const { startDate, endDate, ativo } = req.body;
	let quantidade_trades;

	try {
		// Filtro inicial pelo ID do usuário
		let filter = {
			"user._id": new mongoose.Types.ObjectId(user.id), // Convertendo para ObjectId
		};

		// Adicionar filtros de data, se fornecidos
		if (startDate || endDate) {
			filter.data = {
				$gte: new Date(startDate),
				$lte: new Date(endDate),
			};
		} else if (startDate) {
			filter.data = {
				$gte: new Date(startDate),
			};
		}

		if (ativo) {
			filter.ativo = ativo;
		}
		// Logs para depuração
		// console.log("Filtro usado na consulta:", filter);

		// Consulta ao banco de dados
		const trades = await Diary.find(filter).sort({ data: 1 });

		// Log do resultado da consulta
		// console.log("Resultado da consulta:", trades);

		// Verificar se algum trade foi encontrado
		if (trades.length === 0) {
			return res
				.status(404)
				.json({
					message:
						"Nenhum trade encontrado para os filtros aplicados.",
				});
		}

		quantidade_trades = trades.length;

		const totalPontos = await trades.reduce((total, trade) => {
			return total + parseFloat(trade.resultado_pts);
		}, 0);

		const totalLiquido = await trades.reduce((total, trade) => {
			return total + parseFloat(trade.res_liq);
		}, 0);

		console.log(totalPontos, " pontos", totalLiquido, " liquido");

		// Retornar os trades encontrados
		res.status(200).json({
			trades,
			totalPontos,
			totalLiquido,
			quantidade_trades,
		});
	} catch (error) {
		console.error("Erro no getAllTrades:", error); // Log do erro
		res.status(500).json({
			message: "Algo deu errado em getAllTrades",
			error,
		});
	}
};

module.exports = {
	createEntry,
	getAllTrades,
};
