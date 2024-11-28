const Diary = require('../models/Diary')

const createEntry = async (req, res) => {
    res.status(200).json({message: "tudo ok"})
}

module.exports = {
    createEntry
}