const createUserToken = require("../helpers/created-user-token");
const getToken = require('../helpers/get-token')
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

const register = async (req, res) => {
	const { name, email, password, confirmpassword, image } = req.body;

	if (!name) {
		res.status(422).json({ message: "O nome é obrigatório!" });
		return;
	}

	if (!email) {
		res.status(422).json({ message: "O email é obrigatório!" });
		return;
	}

	// Check is email is valid
	if (!isValidEmail(email)) {
		res.status(422).json({
			message: "O email precisa ser um email valido!"
		});
		return;
	}

	if (!password) {
		res.status(422).json({ message: "A senha é obrigatória!" });
		return;
	}

	if (password.length < 6) {
		res.status(422).json({
			message: "A senha precisa ter no minimo 6 caracteres!"
		});
		return;
	}

	if (!confirmpassword) {
		res.status(422).json({
			message: "A confirmação de senha é obrigatória!"
		});
		return;
	}

    if(confirmpassword.length < 6) {
        res.status(422).json({ message: "A confirmação de senha precisa ter no minimo 6 caracteres!"})
        return
    }

	if (confirmpassword !== password) {
		res.status(422).json({
			message: "A senha e a confirmação de senha náo são iguais!"
		});
		return;
	}

    if (!image) {
        res.status(422).json({ message: "A imagem é obrigatória!" });
        return
    }

	// Check if user exists
	const userExists = await User.findOne({ email: email });
	if (userExists) {
		res.status(422).json({ message: "Por favor, utilize outro email!" });
		return;
	}

	const salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash(password, salt);

	const user = new User({
		name,
		email,
		password: passwordHash,
		image,
	});

	try {
		const newUser = await user.save();
		await createUserToken(newUser, req, res);
		// await res.status(201).json({ message: `User created ${newUser.name}` })
	} catch (error) {
		await res.status(500).json({ error: error });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email) {
		res.status(422).json({ message: "O email é obrigatório!" });
		return;
	}

	if (!isValidEmail) {
		res.status(422).json({
			message: "O email precisa ser um email valido!",
		});
		return;
	}

	if (!password) {
		res.status(422).json({ message: "A senha é obrigatória!" });
		return;
	}

	if (password.length < 6) {
		res.status(422).json({
			message: "A senha precisa ter no minimo 6 caracteres!",
		});
		return;
	}

	// Check if user exists - verifico se usuario existe
	const user = await User.findOne({ email: email });
	if (!user) {
		res.status(422).json({
			message: "Não há usuario cadastrado com esse email!",
		});
		return;
	}

	// Check if password match with db password
	const checkPassword = await bcrypt.compare(password, user.password);

	if (!checkPassword) {
		res.status(422).json({ message: "Senha invalida!" });
		return;
	}

	await createUserToken(user, req, res);
};

const checkUser = async (req, res) => {
	let currentUser;

	if (req.headers.authorization) {
		const token = getToken(req);
		const decoded = jwt.verify(token, "secret");

		currentUser = await User.findById(decoded.id);

		currentUser.password = undefined;
	} else {
		currentUser = null;
	}

	res.status(200).send(currentUser);
};

const getUserById = async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id).select("-password")
    
    if (!user) {
        res.status(422).json({message: "Usuario não encontrado!"})
        return
    }

    res.status(200).json({user})
}

const editUser = async (req, res) => {

	res.status(200).json({message: "Usuario atualizado!"})
}

module.exports = {
	register,
	login,
	checkUser,
    getUserById,
	editUser
};
