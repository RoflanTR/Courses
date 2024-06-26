const { Router, request } = require('express')
const keys = require('../keys')
const nodemailer = require('nodemailer')
const buyCourse = require('../emails/buyCourse')
const { dateNow } = require('../utils/dateNow')
const dataDB = require('../utils/dataDB')

const router = Router()

const transporter = nodemailer.createTransport({
  service: keys.SERVICE_EMAIL,
  auth: {
    user: keys.USER_EMAIL,
    pass: keys.PASSWORD_EMAIL
  }
})

router.get('/', async (req, res) => {
  res.redirect('/catalog')
})

router.get('/:id', async (req, res) => {

  /*Получение курса из БД с данными из cвязанных таблиц*/
  let courseId = await dataDB.courseById(req.params.id)
  if (courseId != null) {
    req.session.courseId = req.session.req.params.id;
  }

  /* Куплен ли курс */
  let isBuy;
  if (req.session.user) {
    isBuy = await dataDB.isBuyCourse(req.session.courseId, req.session.user)
  }

  /* Написан ли отзыв данным пользователем */
  let isReview;
  if (req.session.user) {
    isReview = await dataDB.isCreateReviewUser(req.session.courseId, req.session.user)
  }
  
  /*Получение спец условий курса */
  let masSpecialConditions = await dataDB.infoCourse(req.session.courseId, 'specialConditions')

  /*Получение главного результата курса */
  let mainResult = await dataDB.infoCourse(req.session.courseId, 'mainResult')

  /*Получение программы курса */
  let programCourse = await dataDB.infoCourse(req.session.courseId, 'programCourse')

  /*Получение отзывов */
  let reviews = await dataDB.listReviews(req.session.courseId)

  /*Проверка на существующий id */
  let titilePage = courseId == null ? "Ошибка" : courseId.name

  res.render('cardProduct', {
    isError: courseId == null,
    cardProduct: true,
    title: titilePage,
    categoryCourses: req.session.courseId,
    course: courseId,
    specialConditions: masSpecialConditions,
    mainResult: mainResult,
    programCourse: programCourse,
    reviewCourse: reviews,
    isBuy: isBuy,
    isReview: isReview,
    successAddReview: req.flash('successAddReview'),
    errorAddReview: req.flash('errorAddReview'),
  })
})

router.post('/buy', async (req, res) => {
  const dataCourse = await dataDB.courseById(req.session.courseId)
  const dataUser = await dataDB.infoUser(req.session.user)
  const data = dateNow();
  await dataDB.buyCourse(req.session.courseId, req.session.user)
  res.redirect(`/card/${req.session.courseId}`),
    transporter.sendMail(buyCourse(dataUser.dataValues.email, dataUser.dataValues.last_name, dataUser.dataValues.name, dataCourse.dataValues.name, dataCourse.dataValues.price,data)),
    res.status(200)
})

router.post('/review', async (req, res) => {
  const { review, estimation } = req.body
  let isBuy = await dataDB.isBuyCourse(req.session.courseId, req.session.user)
  if (isBuy) {
    const reviewCheck = await dataDB.checkReviewUser(req.session.courseId, req.session.user)
    if (!reviewCheck) {
      await dataDB.reviewCreate(req.session.courseId, req.session.user, review, estimation)
      req.flash('successAddReview', 'Отзыв успешно добавлен')
      res.redirect(`/card/${req.session.courseId}`)
    }
    else {
      req.flash('errorAddReview', 'При добавлении отзыва произошла ошибка')
      res.redirect(`/card/${req.session.courseId}`)
    }
  }
  else {
    req.flash('errorAddReview', 'Вы пытаетесь добавить отзыв к непреобретенному курсу')
    res.redirect(`/card/${req.session.courseId}`)
  }
})

router.get('/login', async (req, res) => {
  req.session.urlBeforeLogin = req.headers.referer
  console.log(`cardProd${req.session.urlBeforeLogin}`)
  res.redirect('/auth');
})
module.exports = router