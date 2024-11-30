const router = require('express').Router()
const DiaryController = require('../controllers/DiaryController')


// middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/entry', DiaryController.createEntry)

module.exports = router