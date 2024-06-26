const { Router } = require('express')
const isAuth = require('../middleware/auth')
const { validationResult } = require('express-validator')
const { editAccountValidations } = require('../utils/validatorEditAccount')
const dataDB = require('../utils/dataDB')


const router = Router()



router.get('/', isAuth, async (req, res) => {
  let userInfo = await dataDB.infoUser(req.session.user);
  let buyCourses = await dataDB.listBuyCourses(req.session.user);
  let userReviews = await dataDB.userReviews(req.session.user);
  req.session.isAccount = true;
  res.render('account', {
    title: 'Личный кабинет',
    slider: true,
    accountPage: true,
    user: userInfo.dataValues.name,
    availabilityBuyCourses: buyCourses.length == 0 ? false : true,
    buyCourses: buyCourses,
    availabilityUserReviews: userReviews.length == 0 ? false : true,
    userReviews: userReviews,
    successEditReview: req.flash('successEditReview'),
    successDeleteReview: req.flash('successDeleteReview'),
    errorDeleteReview: req.flash('errorDeleteReview'),
    successfulEditDataAccount: req.flash('successfulEditDataAccount'),
    errorEditReview: req.flash('errorEditReview')
  })

})
router.get('/editAccount', isAuth, async (req, res) => {

  res.render('editAccount', {
    title: 'Изменение данных',
    errorEditData: req.flash('errorEditData'),
    accountEditPage: true,
    dataAccount: await dataDB.infoUser(req.session.user)
  })
})
router.post('/editAccount', editAccountValidations, isAuth, async (req, res) => {
  const { name, lastname, email } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorEditData', errors.array()[0].msg)
    return res.status(422).redirect('/account/editAccount')
  }

  if ((name && lastname && email) != '') {
    const dataOldAccount = await dataDB.infoUser(req.session.user)
    if (dataOldAccount.dataValues.name == name && dataOldAccount.dataValues.last_name == lastname && dataOldAccount.dataValues.email == email) {
      res.redirect('/account')
    }
    else {
      await dataDB.updateDataClient(name, lastname, email, req.session.user)
      req.flash('successfulEditDataAccount', 'Данные были изменены')
      res.redirect('/account')
    }
  }
})

router.post('/edit', isAuth, async (req, res) => {
  const { review, estimation, edit } = req.body
  const isClientFeedback = await dataDB.isClientFeedback(edit);
  if (isClientFeedback != null) {
    if (isClientFeedback.dataValues.id_client == req.session.user) {
      await dataDB.reviewDataUpdate(review, estimation, edit);
        req.flash('successEditReview', 'Отзыв изменен')
        res.redirect('/account')
    }
    else {
      req.flash('errorEditReview', 'Ошибка изменения отзыва')
      res.redirect('/account')
    }
  }
  else {
    req.flash('errorEditReview', 'Ошибка изменения отзыва')
    res.redirect('/account')
  }
})

router.post('/delete', isAuth, async (req, res) => {
  const { delete_review } = req.body
  if (delete_review != 'no') {
    const isClientFeedback = await dataDB.isClientFeedback(delete_review)
    if (isClientFeedback != null) {
      if (isClientFeedback.dataValues.id_client == req.session.user) {
        await dataDB.deleteReview(delete_review)
        req.flash('successDeleteReview', 'Отзыв удален')
        res.redirect('/account')
      }
      else {
        req.flash('errorDeleteReview', 'Ошибка удаления отзыва')
        res.redirect('/account')
      }
    }
    else {
      req.flash('errorDeleteReview', 'Ошибка удаления отзыва')
      res.redirect('/account')
    }
  }
  else {
    res.redirect('/account')
  }
}
)
module.exports = router