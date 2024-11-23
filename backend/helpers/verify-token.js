const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

// middleware to validate token
const checkToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({message: "Acesso Negado if!"})
    }

    const token = getToken(req)

    if (!token) {
        return res.status(401).json({message: "Acesso Negado token!"})
    }

    try {
        const verified = jwt.verify(token, "secret")
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({message: "Token Inválido!"})
    }
}

module.exports = checkToken
