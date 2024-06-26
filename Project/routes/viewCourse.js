const { Router } = require('express')
const isAuth = require('../middleware/auth')
const dataDB = require('../utils/dataDB')
const router = Router()

router.get('/', isAuth, async (req, res) => {
  res.redirect('/account')
})
router.get('/:id', async (req, res) => {

  /* Приобретен ли курс */
  const checkId = await dataDB.isBuyCourse(req.params.id, req.session.user);
  if (checkId != null) {
    req.session.idCourse = req.params.id
  }

  /*последний просмотренный курс */
  let mas = [];
  if (req.session.lastLesson) {
    mas = await dataDB.linkVideo(req.session.idCourse, req.session.lastLesson)
  }
  res.render('viewCourse', {
    title: 'Просмотр курса',
    viewCoursePage: true,
    successAddReview: req.flash('successAddReview'),
    isReview: await dataDB.isCreateReviewUser(req.session.idCourse, req.session.user),
    isError: checkId == true ? false : true,
    linkVideoStart: await dataDB.linkVideoStart(req.session.idCourse),
    listLesson: await dataDB.listLesson(req.session.idCourse),
    linkVideo: mas != null ? mas : null,
    linkChat: await dataDB.getLinkTgChat(req.session.idCourse)
  })
})

router.post('/video/:id', isAuth, async (req, res) => {
  const availabilityLecture = await dataDB.availabilityLecture(req.session.idCourse, req.params.id)
  if (availabilityLecture != null) {
    const dataVideo = await dataDB.linkVideo(req.session.idCourse, req.params.id)
    const dataVideoArray = JSON.stringify(dataVideo.dataValues);
    res.status(200).json(dataVideoArray)
    req.session.lastLesson = req.params.id
    req.session.save(e => {
      if (e) {
        throw e
      }
    })
  }
  if (availabilityLecture == null) {
    res.status(400).json('Ошибка')
  }
}
)

router.post('/review', isAuth, async (req, res) => {
  const { review, estimation } = req.body
  let referer = req.headers.referer
  await dataDB.reviewCreate(req.session.idCourse, req.session.user, review, estimation)
  req.flash('successAddReview', 'Отзыв успешно добавлен')
  res.redirect(referer)
})

module.exports = router