const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const mongoose = require('./db/conn')
const User = require('./models/User')


app.use(express.urlencoded({
    extended: true
}))

// Config JSON response
app.use(express.json())

// Solve CORS - libera a porta para trabalhar com frontend e backend
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

// Public folder for images
app.use(express.static('public'))

// Routes


conn.sync()
.then(() => {
    app.listen(port, () => {
        console.log(`Conectou supabase na porta ${port}`)
    })

    User.create(user)
    
    console.log('Usuario criaco com sucesso', user)
})
.catch(error => {
    console.log(error)
})

