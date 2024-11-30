const router = require('express').Router()
const UserRoutes = require('./UserRoutes')
const DiaryRoutes = require('./DiaryRoutes')

router.use('/users', UserRoutes)
router.use('/trades', DiaryRoutes)

router.get('/test', (req, res) => {
    res.json({message: "Rota test"})
})





module.exports = router