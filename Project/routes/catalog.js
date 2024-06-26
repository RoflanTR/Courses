const { Router } = require('express')
const dataDB = require('../utils/dataDB')
const router = Router()


router.get('/', async (req, res) => {
  res.render('catalog', {
    title: 'Все курсы',
    isCatalog: true,
    user: req.session.user,
    masCategory: await dataDB.allCategory(),
    masAllCourses: await dataDB.allCourse(),
    masCategory: await dataDB.allCategory(),
    listNameCourses: await dataDB.getListNameSchool()
  })

})

router.post('/filters', async (req, res) => {
  var response = await dataDB.filterCourse(req.body.school, req.body.category, req.body.score, req.body.min_price, req.body.max_price)
  var newRes ={
    'data': response,
    'category': req.body.category == 'all'? 'Все курсы' : req.body.category
  };

  res.status(200).json(newRes)
})
module.exports = router