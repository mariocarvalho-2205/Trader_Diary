const Diary = require("../models/Diary");

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
    let res_liq

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
        res_liq = resultado_pts * 0.20;
        console.log("res_liq", res_liq);
    }
    if (ativo === "dol") {
        res_liq = resultado_pts * 10;

    }

	const entryTrade = new Diary({
		ativo,
		compra_venda,
		data,
		preco_entrada,
		preco_saida,
		estrategia,
		resultado_pts,
        res_liq
	});

	try {
		const newTrade = await entryTrade.save();
		res.status(201).json(newTrade);

	} catch (error) {
		res.status(500).json({ message: "Erro ao criar entrada", error });
	}
};

module.exports = {
	createEntry,
};