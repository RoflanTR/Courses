const {body} = require('express-validator')
exports.registerValidations = [
    body('email','Введите корректный email').isEmail(),
    body('password', 'Пароль должен содержать в себе одну цифру, одну строчную и одну заглавную буквы').matches(/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d]+$/),
    body('password', 'Пароль должен быть не менее 6 символов и не более 20').trim().isLength({min:6 , max:20}),
    body('name', 'Имя должно состоять только из букв' ).trim().matches(/^[a-zA-Zа-яА-Я_\-]+$/),
    body('name', 'Имя должно быть не менее 3 символов и не более 20' ).trim().isLength({min:3 , max:20}),
    body('lastname', 'Фамилия должна состоять только из букв' ).trim().matches(/^[a-zA-Zа-яА-Я_\-]+$/),
    body('lastname', 'Фамилия должна быть не менее 2 символов и не более 20' ).trim().isLength({min:2 , max:20}),
    body('login','Логин должен состоять из латинских букв Пример(Kirill_23-2)').trim().matches(/^[a-zA-Z0-9\-_]+$/),
    body('login','Логин должен быть не меньше 6 символов и не более 20').trim().isLength(({min:6 , max:20})),
    body('phone','Номер должен состоять только из цифр').trim().isNumeric(),
    body('phone','Номер должен состоять из 11 цифр').trim().isLength(11),
    body('phone','Номер должен начинатся с 8 ').trim().matches(/^8\d{10}$/),
    
]
