const Diary = require("../models/Diary");
const User = require("../models/User");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const estatistic = async (req, res) => {
	console.log("estatistica");
    res.status(200).json({message: "Estatistica Ok!"})
};

module.exports = {
	estatistic,
};
