const router = require('express').Router()
const TradeSystemController = require('../controllers/TradeSystemController')

// middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, TradeSystemController.createTradeSystem)

module.exports = router