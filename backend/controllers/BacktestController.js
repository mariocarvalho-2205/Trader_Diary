const Diary = require("../models/Diary");
// const User = require("../models/User");
const mongoose = require("mongoose");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const backtest = async (req, res) => {
	const token = getToken(req);
	const user = await getUserByToken(token);

	const { startDate, endDate, ativo, estrategia } = req.body;
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

		// coleta de dados
		const tradesPositivos = trades.filter(
			(t) => t.resultado_pts > 0
		).length;
		const tradesNegativos = trades.filter(
			(t) => t.resultado_pts < 0
		).length;
		const estrategiaPfr = trades.filter((t) => t.estrategia === "pfr");
		const estrategia123 = trades.filter((t) => t.estrategia === "123");
		const estrategiaPc = trades.filter((t) => t.estrategia === "PC");
		const retornoEstrategia = trades.filter((t) => t.estrategia === estrategia);
		

		const taxaAcerto = `${((tradesPositivos / trades.length) * 100).toFixed(
			2
		)}%`;

		// // log de resultados positivos e negativos
		console.log("Trades positivos:", tradesPositivos);
		console.log("Trades negativos:", tradesNegativos);
		console.log("estrategiaPfr:", estrategiaPfr.length);
		console.log("123:", estrategia123.length);
		console.log("retorno_estrategia:", retornoEstrategia.length, estrategia);
		console.log("Pc:", estrategiaPc.length);
		console.log("taxa de acerto", taxaAcerto);

		quantidade_trades = trades.length;
		
		// total de pontos
		const totalPontos = await trades.reduce((total, trade) => {
			return total + parseFloat(trade.resultado_pts);
		}, 0);

		// resultado liquido
		const totalLiquido = await trades
			.reduce((total, trade) => {
				return total + parseFloat(trade.res_liq);
			}, 0)
			.toFixed(2);

		console.log(totalPontos, " pontos", totalLiquido, " liquido");

		
		 // Cálculo do drawdown
        let maxDrawdown = 0;
        let peakBalance = parseInt(user.capital)
        let currentDrawdown = 0;

        trades.forEach(trade => {
            if (trade.user.capital > peakBalance) {
                peakBalance = parseInt(trade.user.capital)
                currentDrawdown = 0;
            } else {
                currentDrawdown = (peakBalance - parseInt(trade.user.capital)) / peakBalance * 100;
                if (currentDrawdown > maxDrawdown) {
                    maxDrawdown = currentDrawdown;
                }
            }
        });

		console.log(maxDrawdown.toFixed(2), 'maxdrawdown')
		console.log(peakBalance, 'peakBalance')
		console.log(currentDrawdown, 'currentDrawdown')

        // Cálculo de risk/reward ratios
        const riscoRetorno = {};
        for (let i = 1; i <= 10; i++) {
            const targetRatio = `1:${i}`;
            const tradesNaRatio = trades.filter(t => 
                Math.abs(t.preco_saida - t.preco_entrada) >= 
                Math.abs(t.stop - t.preco_entrada) * i
            );
            riscoRetorno[targetRatio] = {
                total: tradesNaRatio.length,
                sucessos: tradesNaRatio.filter(t => t.resultado > 0).length
            };
        }

		console.log(riscoRetorno, 'riscoretorno')
		 

		// Retornar os trades encontrados
		res.status(200).json({
			totalPontos,
			totalLiquido,
			quantidade_trades,
			tradesNegativos,
			tradesPositivos,
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
	backtest,
};
