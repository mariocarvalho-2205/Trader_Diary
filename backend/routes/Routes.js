const router = require('express').Router()
const userRoutes = require('./UserRoutes')

router.use('/api', userRoutes)

router.get('/test', (req, res) => {
    res.json({message: "Rota test"})
})





module.exports = router