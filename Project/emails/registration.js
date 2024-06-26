module.exports = function (email, password, login) {
    return {
        to: email,
        from: 'courses@gamil.com',
        subject: 'Aккаунт создан',
        html: `
           <div style ="border: 2px solid #27476b;
           background-image: linear-gradient(170deg, #2688eb0d, #add6ff3d);;
           border-radius: 8px;
           padding: 20px;">
           <h1 style="font-family: 'MailSans';
           font-size: 32px;
           text-align: center;
           font-weight: 600;
           color: #183d79;">
           Вы успешно зарегистрировались на сайте
           <span style = "color:#ffcb3a;">COURSES</span>
           </h1>
          <div style="padding: 20px 0;">
          <p style="font-size: 16px;"> <span style="
          font-weight: 600;color: #183d79;">Ваш логин:</span> ${login}</p>
          <p><span style="
          font-weight: 600;color: #183d79;">Ваш пароль:</span> ${password}</p>
          </div>
           <hr style="border-radius: 40%;
           margin: 20px auto 15px auto;
           width: 95%;
           filter: blur(4px);
           color: black;
           background-color: #005cf1;
           border: none;
           height: 1px;"/>
           <h1 style="font-family: 'MailSans';
           font-size: 22px;
           text-align: center;
           font-weight: 600;
           color: #183d79;">
           Желаем вам приятного обучения
           </h1>
           <a href="http://localhost:3000" style="text-decoration: none;"><p style="width: 100%;
           margin: 0;
           text-align: center;">Вернуться на сайт</p></a>
           </div>
            `
    }
}