const router = require('express').Router()
const UserRoutes = require('./UserRoutes')
const DiaryRoutes = require('./DiaryRoutes')
const TradeSystemRoutes = require('./tradesystemRoutes')
const BacktestRouter = require('./BacktestRoutes')
const EstrategiaRouter = require('./EstrategiaRoutes')

router.use('/users', UserRoutes)
router.use('/trades', DiaryRoutes)
router.use('/tradesystems', TradeSystemRoutes)
router.use('/backtest', BacktestRouter)
router.use('/estrategia', EstrategiaRouter)

router.get('/test', (req, res) => {
    res.json({message: "Rota test"})
})





module.exports = router