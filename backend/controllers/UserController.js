const createUserToken = require('../helpers/created-user-token')
const User = require('../models/User')
const bcrypt = require('bcrypt')

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

const register = async (req, res) => {
    const { name, email, password, confirmPassword, image } = req.body

    if (!name) {
        res.status(422).json({ message: "O nome é obrigatório!" })
        return
    }

    if (!email) {
        res.status(422).json({ message: "O email é obrigatório!" })
        return
    }

    // Check is email is valid 
    if (!isValidEmail(email)) {
        res.status(422).json({ message: "O email precisa ser um email valido!" })
        return
    }

    if (!password) {
        res.status(422).json({ message: "A senha é obrigatória!" })
        return
    }

    if (password.length < 6) {
        res.status(422).json({ message: "A senha precisa ter no minimo 6 caracteres!" })
        return
    }

    if (!confirmPassword) {
        res.status(422).json({ message: "A confirmação de senha é obrigatória!" })
        return
    }

    if (confirmPassword !== password) {
        res.status(422).json({ message: "A senha e a confirmação de senha náo são iguais!" })
        return
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        res.status(422).json({ message: "Por favor, utilize outro email!" })
        return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordHash,
        image
    })

    try {

        const newUser = await user.save()
        await createUserToken(newUser, req, res)
        // await res.status(201).json({ message: `User created ${newUser.name}` })

    } catch (error) {
        await res.status(500).json({ error: error })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        res.status(422).json({ message: "O email é obrigatório!" })
        return
    }

    if (!isValidEmail) {
        res.status(422).json({ message: "O email precisa ser um email valido!" })
        return
    }

    if (!password) {
        res.status(422).json({ message: "A senha é obrigatória!" })
        return
    }

    if (password.length < 6) {
        res.status(422).json({ message: "A senha precisa ter no minimo 6 caracteres!" })
        return
    }

    // Check if user exists - verifico se usuario existe
    const user = await User.findOne({ email: email })
    if (!user) {
        res.status(422).json({ message: "Não há usuario cadastrado com esse email!" })
        return
    }

    // Check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        res.status(422).json({ message: "Senha invalida!"})
        return
    }

    await createUserToken(user, req, res)

}

module.exports = {
    register,
    login
}