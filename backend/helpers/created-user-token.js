const jwt = require('jsonwebtoken')

const createUserToken = (user, req, res) => {
    // create token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "secret")

    res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userId: user._id
    })
}

module.exports = createUserToken