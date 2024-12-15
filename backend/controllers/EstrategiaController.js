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
	
    if (!user) {
		return res.status(401).json({ message: "Acesso não autorizado!" });
	}

    try {
        res.status(200).json({message: "Estrategias criada com sucesso!"});
    } catch (error) {
        res.status(500).json({message: "Houve algum erro ao criar a estrategia!"});
    }
};

module.exports = {
	allEstrategia,
    createEstrategia
};
