const router = require('express').Router()
const UserRoutes = require('./UserRoutes')
const DiaryRoutes = require('./DiaryRoutes')
const TradeSystemRoutes = require('./tradesystemRoutes')
const EstatisticaRouter = require('./EstatisticRoutes')

router.use('/users', UserRoutes)
router.use('/trades', DiaryRoutes)
router.use('/tradesystems', TradeSystemRoutes)
router.use('/estatistic', EstatisticaRouter)

router.get('/test', (req, res) => {
    res.json({message: "Rota test"})
})





module.exports = router