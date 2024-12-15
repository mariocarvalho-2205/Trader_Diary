const router = require('express').Router()
const EstrategiaController = require('../controllers/EstrategiaController')

// middlewares
const verifyToken = require('../helpers/verify-token')

router.get('/all', verifyToken, EstrategiaController.allEstrategia)
router.post('/create', verifyToken, EstrategiaController.createEstrategia)

module.exports = router
