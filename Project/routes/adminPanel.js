const { Router } = require('express')
const dataDB = require('../utils/dataDB')
const isAdmin = require('../middleware/admin')
const multer = require('multer');
const path = require('path')
const router = Router()

router.get('/', isAdmin,async (req, res) => {
  res.render('adminPanel', {
    title: 'Административная панель',
    adminPanel: true,
    isListCourses: true,
    listNameSchool: await dataDB.getListNameSchool(),
    listNameCourses: await dataDB.getListNameCourses(),
    masCategory: await dataDB.allCategory(),
    masAllCourses: await dataDB.allCourse(),
    successDeleteCourse: req.flash('successDeleteCourse'),
    errorDeleteCourse: req.flash('errorDeleteCourse'),
    successEditCourse: req.flash('successEditCourse'),
    errorEditCourse: req.flash('errorEditCourse')
  })
})

router.get('/add', isAdmin,async (req, res) => {
  res.render('adminPanel', {
    title: 'Административная панель',
    isAdd: true,
    adminPanel: true,
    masCategory: await dataDB.allCategory(),
    errorAddCourse: req.flash('errorAddCourse'),
    listNameSchool: await dataDB.getListNameSchool(),
  })
})
router.get('/report',isAdmin, async (req, res) => {
  var c = await dataDB.getAllOrders()
  let totalPrices = c.reduce((total, item) => total + item.Course.price, 0);
  res.render('adminPanel', {
    title: 'Административная панель',
    isReport: true,
    adminPanel: true,
    masCategory: await dataDB.allCategory(),
    listNameSchool: await dataDB.getListNameSchool(),
    masOrders: await dataDB.getAllOrders(),
    listNameCourses: await dataDB.getListNameCourses(),
    masPrice: totalPrices
  })
})

router.post('/filters/listCourses',isAdmin, async (req, res) => {
  var response = await dataDB.filterCourse(req.body.school, req.body.category, '', '', '', req.body.course_name);
  res.status(200).json(response)
})

router.post('/filters/orders', isAdmin, async (req, res) => {

  var masOrders = await dataDB.filterOrders(req.body.school, req.body.category, req.body.name_course, req.body.date)
  res.status(200).json(masOrders)
})

let fileCounter = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/assets/timeFiles'))
  },
  filename: function (req, file, cb) {
    fileCounter++;
    cb(null, file.fieldname + '-' + fileCounter + '.' + file.originalname.split('.').pop());
  }
});
const upload = multer({ storage: storage });

const uploadMiddleware = upload.fields([
  { name: 'img_course', maxCount: 1 },
  { name: 'video_lesson', maxCount: 50 }
]);

router.post('/add', uploadMiddleware, isAdmin, async (req, res) => {
  var response = await dataDB.addCourse(req.body.name, req.body.school, req.body.description, req.body.time, req.body.count_lesson, req.body.price, req.body.category, req.body.program_course, req.files['img_course'][0], req.body.link_tg, req.body.condition_course, req.body.main_result, req.body.name_lesson, req.files['video_lesson']);
  if (response) {
    res.redirect('/admin')
  }
  else {
    req.flash('errorAddCourse', 'Курс от данной школы с таким же названием уже существует')
    res.redirect('/admin/add')
  }
})

router.post('/delete', isAdmin, async (req, res) => {
  const { delete_review,idCourse } = req.body
  if (delete_review != 'no') {
   var response = await dataDB.deleteCourse(idCourse)
   
   if(response){
    req.flash('successDeleteCourse', 'Курс успешно удален')
      res.redirect('/admin')
   }
   else{
    req.flash('errorDeleteCourse', 'Не удалось удалить курс')
    res.redirect('/admin')
   }
  }
  else{
    res.redirect('/admin')
  }
})
router.post('/edit', isAdmin, async (req, res) => {
  res.render('adminPanel', {
    title: 'Административная панель',
    isEdit: true,
    adminPanel: true,
    id: req.body.id,
    masCategory: await dataDB.allCategory(),
    listNameSchool: await dataDB.getListNameSchool(),
    dataCourse: await dataDB.courseById(req.body.id),
    programCourse: await dataDB.infoCourse(req.body.id, 'programCourse'),
    specialConditions: await dataDB.infoCourse(req.body.id, 'specialConditions'),
    mainResult: await dataDB.infoCourse(req.body.id, 'mainResult')
  })

})

router.post('/edit/course', uploadMiddleware, isAdmin, async (req,res)=>{
  var response = await dataDB.editCourse(req.body.id,req.body.name, req.body.school, req.body.description, req.body.time, req.body.count_lesson, req.body.price, req.body.category, req.body.program_course, req.files['img_course'][0], req.body.link_tg, req.body.condition_course, req.body.main_result);
  if(response){
    req.flash('successEditCourse', 'Курс успешно изменен')
    res.redirect('/admin')
  }
  else{
    req.flash('errorEditCourse', 'Не удалось изменить курс')
    res.redirect('/admin')
  }
})

module.exports = router