const router = require('express').Router()
const DiaryController = require('../controllers/DiaryController')

router.post('/entry', DiaryController.createEntry)

module.exports = router