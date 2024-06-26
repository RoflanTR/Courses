const { Router } = require('express')
const Category = require('../models/category')
const dataDB = require('../utils/dataDB')
const router = Router()


router.get('/', async (req, res) => {
let popularCourses = await dataDB.popularCourses();
  res.render('mainPage', {
    title: 'Главная страница',
    isHome: true,
    masCategory: await dataDB.allCategory(),
    slider: true,
    popularCourses:popularCourses
  })
})

router.get('/logout', async (req, res) => {
  if(req.session.isAccount || req.session.isView){
    req.session.destroy(() => {
      res.redirect('/');
    })
  }
  else{
    req.session.destroy(() => {
      const referer = req.headers.referer || '/';
      res.redirect(referer);
    })
  }
  

})
router.get('/login', async (req, res) => {
  req.session.urlBeforeLogin = req.headers.referer
  res.redirect('/auth');
})

module.exports = router