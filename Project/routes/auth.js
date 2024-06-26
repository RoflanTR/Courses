const { Router, request } = require('express')
const Bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const { validationResult } = require('express-validator')
const { registerValidations } = require('../utils/validatorsRegistration')
const keys = require('../keys')
const createAccount = require('../emails/registration')
const DecorData = require('../utils/decorationData')
const dataDB = require('../utils/dataDB')


const router = Router()

const transporter = nodemailer.createTransport({
  service: keys.SERVICE_EMAIL,
  auth:{
    user: keys.USER_EMAIL,
    pass: keys.PASSWORD_EMAIL
  }
})

router.get('/', async (req, res) => {
  res.render('authorization', {
    layout: 'empty',
    title: 'Авторизация',

  })
})
router.get('/:id', async (req, res) => {
  let mode = req.params.id == 'reg' ? true : false

  res.render('authorization', {
    layout: 'empty',
    title: req.params.id == 'reg' ? 'Регистрация' : 'Вход',
    mode: mode,
    errorLogin: req.flash('errorLogin'),
    errorRegistration: req.flash('errorRegistration'),
    successfully: req.flash('successfully'),
  })
})


router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body
    const candidate = await dataDB.findAccount(login);

    if (candidate) {
      let unHashPassword = await Bcrypt.compare(password, candidate.dataValues.password);
      if (unHashPassword) {
        if(candidate.dataValues.role != null){
          req.session.isAdmin = true
        }
        req.session.isAuth = true
        req.session.user = candidate.dataValues.id
        req.session.save(e => {
          if (e) {
            throw e
          }
          else {
            console.log(`LOGIN ${req.session.urlBeforeLogin}`)
            res.redirect(req.session.urlBeforeLogin||'/');
          }
        })
      }
      else {
        req.flash('errorLogin', 'Неверно введенные данныее')
        res.redirect('/auth/login')

      }
    }
    else {
      req.flash('errorLogin', 'Неверно введенные данныее')
      res.redirect('/auth/login')
    }
  } catch (error) {
    console.log(error)
  }
})
router.post('/registration', registerValidations, async (req, res) => {
  try {
    const { name, lastname, login, password, email, phone } = req.body
    const candidateLogin = await dataDB.findAccount(login)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.flash('errorRegistration', errors.array()[0].msg)
      return res.status(422).redirect('/auth/reg')
    }
    let candidateNumber;
    if (!candidateLogin) {
      candidateNumber = await dataDB.findAccount(login)
    }
    if (!candidateLogin && !candidateNumber) {
      if ((name && lastname && email && phone && login && password) != '') {
        const hashPassword = await Bcrypt.hash(password, 10)
        await dataDB.createAccount(name,lastname,email,phone,login,hashPassword)
          req.flash('successfully', 'Регистрация прошла успешно'),
          /*nenepsfd */
          transporter.sendMail(createAccount(email,password,login)),
          res.redirect('/auth/login')
          
        
      }
      else {
        req.flash('errorRegistration', 'поля не должны быть пустыми')
        res.redirect('/auth/reg')
      }
    }
    else {
      if (candidateLogin) {
        req.flash('errorRegistration', 'Логин уже занят')
        res.redirect('/auth/reg')
      }
      if (candidateNumber) {
        req.flash('errorRegistration', 'Данный номер уже зарегистрирован в системе')
        res.redirect('/auth/reg')
      }
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router