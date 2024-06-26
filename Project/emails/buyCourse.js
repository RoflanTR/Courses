module.exports = function (email,name,last_name,nameCourse,price,date) {
    return {
        to: email,
        from: 'courses@gamil.com',
        subject: 'Вы приобрели курс',
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
           Поздравляем с приобретением курса <br>
           <span style = "color:#ffcb3a;">${nameCourse}</span>
           </h1>
          <div style="padding: 20px 0;">
          <p><span style="
          font-weight: 600;color: #183d79;">Имя покупателя:</span> ${last_name} ${name} </p>
          <p style="font-size: 16px;"> <span style="
          font-weight: 600;color: #183d79;">Цена курса:</span> ${price} ₽</p>
          <p style="font-size: 16px;"> <span style="
          font-weight: 600;color: #183d79;">Дата покупки:</span> ${date} </p>
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