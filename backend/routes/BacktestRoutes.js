const router = require('express').Router()
const BacktestController = require('../controllers/BacktestController')
// middlewares
const verifyToken = require('../helpers/verify-token')

router.get('/all', verifyToken, BacktestController.backtest)

module.exports = router
