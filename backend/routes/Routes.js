const router = require('express').Router()
const userRoutes = require('./UserRoutes')
const DiaryRoutes = require('./DiaryRoutes')

router.use('/users', userRoutes)
router.use('/trades', DiaryRoutes)

router.get('/test', (req, res) => {
    res.json({message: "Rota test"})
})





module.exports = router