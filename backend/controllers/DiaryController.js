const Diary = require("../models/Diary");
const User = require("../models/User");
const calc = require('../calculos/calc')


// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const createEntry = async (req, res) => {
	const {
		ativo,
		data,
		compra_venda,
		preco_entrada,
		preco_saida,
		estrategia,
	} = req.body;
	let resultado_pts;
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
	if (!preco_saida) {
		res.status(422).json({ message: "O preço de venda é obrigatório!" });
		return;
	}
	if (!estrategia) {
		res.status(422).json({ message: "A estrategia é obrigatória!" });
		return;
	}

	// logica ressultado
	await calc(compra_venda, preco_entrada, preco_saida)
	if (compra_venda === "compra") {
		if (preco_saida - preco_entrada > 0) {
			// lucro
			resultado_pts = preco_saida - preco_entrada;
			console.log("gain compra", resultado_pts);
		} else if (preco_saida - preco_entrada < 0) {
			// loss
			resultado_pts = preco_saida - preco_entrada;
			console.log("loss compra", resultado_pts);
		}
	} else if (compra_venda === "venda") {
		if (preco_saida - preco_entrada < 0) {
			resultado_pts = preco_entrada - preco_saida;
			console.log("gain venda", resultado_pts);
		} else if (preco_saida - preco_entrada > 0) {
			resultado_pts = preco_entrada - preco_saida;
			console.log("loss venda", resultado_pts);
		}
	}

	if (ativo === "win") {
		res_liq = resultado_pts * 0.2;
		console.log("res_liq", res_liq);
	}
	if (ativo === "dol") {
		res_liq = resultado_pts * 10;
	}

	const token = getToken(req);
	const user = await getUserByToken(token);
	let capital_res = parseInt(user.capital) + parseInt(res_liq)
	console.log(capital_res, 'cap')

	const entryTrade = new Diary({
		ativo,
		compra_venda,
		data,
		preco_entrada,
		preco_saida,
		estrategia,
		resultado_pts,
		res_liq,
		user: {
			_id: user._id,
			name: user.name,
			capital: String(capital_res)
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
	console.log(user.name);

	try {
		const trades = await Diary.find();
        // console.log(trades.split(", "))
		res.status(200).json(trades);
	} catch (error) {
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
