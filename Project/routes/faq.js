const { Router } = require('express')
const router = Router()


router.get('/', async (req, res) => {

  res.render('faq', {
    title: 'О нас',
    isFaq: true,

  })
})

module.exports = router