const router = require('express').Router()
const EstatisticaController = require('../controllers/EstatisticaController')
// middlewares
const verifyToken = require('../helpers/verify-token')

router.get('/all', verifyToken, EstatisticaController.estatistic)

module.exports = router
