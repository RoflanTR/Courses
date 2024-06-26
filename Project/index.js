const express = require('express')
const path = require('path')
const csrf = require('csurf')
const compression = require('compression')
const sequelize = require('./utils/DB')
const flash = require('connect-flash')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routerHome = require('./routes/home')
const routerAccount = require('./routes/account')
const routerCardProduct = require('./routes/cardProduct')
const routerCatalog = require('./routes/catalog')
const routerViewCourse = require('./routes/viewCourse')
const routerAuth = require('./routes/auth')
const routerAdminPanel = require('./routes/adminPanel')
const routerFaq = require('./routes/faq')
const errorHandler = require('./middleware/error')
const varMiddleware =require('./middleware/variables')
const keys = require('./keys')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: require('./utils/hbs-helpers')
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: keys.SECRET_SESSION,
  resave: false,
  saveUninitialized: false
}))

app.use(csrf())
app.use(flash())
app.use(compression())
app.use(varMiddleware)


app.use('/',routerHome)
app.use('/account',routerAccount)
app.use('/card',routerCardProduct)
app.use('/catalog',routerCatalog)
app.use('/viewCourse',routerViewCourse)
app.use('/auth',routerAuth)
app.use('/admin',routerAdminPanel)
app.use('/FAQ',routerFaq)



app.use(errorHandler)
const PORT = process.env.PORT || 3000



async function start(){
  try {
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()