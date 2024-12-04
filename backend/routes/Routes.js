const router = require('express').Router()
const UserRoutes = require('./userRoutes')
const DiaryRoutes = require('./diaryRoutes')
const TradeSystemRoutes = require('./tradesystemRoutes')

router.use('/users', UserRoutes)
router.use('/trades', DiaryRoutes)
router.use('/tradesystems', TradeSystemRoutes)

router.get('/test', (req, res) => {
    res.json({message: "Rota test"})
})





module.exports = router