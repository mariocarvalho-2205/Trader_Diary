// included function for calculate trading

const calc = async (operacao, entrada, saida) => {
    let resultado_pts;

    if (operacao === "compra") {
		if (saida - entrada > 0) {
			// lucro
			resultado_pts = saida - entrada;
			console.log("gain compra", resultado_pts);
		} else if (saida - entrada < 0) {
			// loss
			resultado_pts = saida - entrada;
			console.log("loss compra", resultado_pts);
		}
	} else if (operacao === "venda") {
		if (saida - entrada < 0) {
			resultado_pts = entrada - saida;
			console.log("gain venda", resultado_pts);
		} else if (saida - entrada > 0) {
			resultado_pts = entrada - saida;
			console.log("loss venda", resultado_pts);
		}
	}
    console.log(open, entrada, saida, 'calc')
    return resultado_pts
}

module.exports = calc