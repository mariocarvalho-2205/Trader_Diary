const router = require('express').Router()
const DiaryController = require('../controllers/DiaryController')


// middlewares
const verifyToken = require('../helpers/verify-token')

router.get('/all', verifyToken, DiaryController.getAllTrades)
router.post('/entry', verifyToken, DiaryController.createEntry)

module.exports = router