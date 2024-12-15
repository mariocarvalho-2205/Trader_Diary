const Estrategia = require('../models/Estragegia')

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const allEstrategia = async (req, res) => {
	const token = getToken(req);
	const user = await getUserByToken(token);
	
    if (!user) {
        return res.status(401).json({ message: "Acesso não autorizado!" });

	}

    try {
        res.status(200).json({message: "Estrategias encontradas"});
    } catch (error) {
        res.status(500).json({message: "Houve algum erro em localizar as estrategias"});
    }
};

const createEstrategia = async (req, res) => {
	const token = getToken(req);
	const user = await getUserByToken(token);

    const { nome, tipo, descricao, parametro_entrada, parametro_saida, alvo, stop } = req.body
	
    if (!user) {
        return res.status(401).json({ message: "Acesso não autorizado!" });
	}


    const newEstrategia = new Estrategia({
        nome,
        tipo,
        descricao,
        parametro_entrada,
        parametro_saida,
        alvo,
        stop,
        user: {
            id: user.id,
            name: user.name
        }
    })
    
    try {
        const createEstrategia = await newEstrategia.save()

        res.status(200).json({message: "Estrategias criada com sucesso!", createEstrategia});
    } catch (error) {
        res.status(500).json({message: "Houve algum erro ao criar a estrategia!", error});
    }
};

module.exports = {
	allEstrategia,
    createEstrategia
};
