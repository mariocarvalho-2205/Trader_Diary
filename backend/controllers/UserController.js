const User = require('../models/User')
const bcrypt = require('bcrypt')


const register = async (req, res) => {
    const { name, email, password, image } = req.body


    
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
        await res.status(201).json({message: `User created ${newUser.name}`})

    } catch (error) {
        await res.status(500).json({error: error})
    }
}

module.exports = {
    register
}