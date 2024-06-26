const {body} = require('express-validator')
exports.editAccountValidations = [
    body('email','Введите корректный email').isEmail().trim().matches(/^[a-zA-Z0-9][a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    body('name', 'Имя должно состоять только из букв' ).trim().matches(/^[a-zA-Zа-яА-Я_\-]+$/),
    body('name', 'Имя должно быть не менее 3 символов и не более 20' ).trim().isLength({min:3 , max:20}),
    body('lastname', 'Фамилия должна состоять только из букв' ).trim().matches(/^[a-zA-Zа-яА-Я_\-]+$/),
    body('lastname', 'Фамилия должна быть не менее 2 символов и не более 20' ).trim().isLength({min:2 , max:20}),
   
    
]
