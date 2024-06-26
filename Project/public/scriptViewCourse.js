/*POP_UP */
var popup = document.querySelector(".review__additional_create")
if (popup) {
    popup.addEventListener('click', () => {
        popUp.classList.add('open')
    })
    document.querySelector('.close-popup__review').addEventListener('click', () => {
        popUp.classList.remove('open')
    })
}

/*запрос на нужный курс по id */
const lesson = document.querySelectorAll('.open-video')
const nameLesson = document.querySelectorAll('.name__item')
const titleVideo = document.querySelector('.title__video')
for (let index = 0; index < lesson.length; index++) {
if(titleVideo.textContent == nameLesson[index].textContent){
    lesson[index].classList.add('select-lesson')
}
    lesson[index].addEventListener('click', () => {
        for (let i = 0; i < lesson.length; i++) {
            lesson[i].style.backgroundColor = 'transparent'; 
        }
        lesson[index].style.backgroundColor ='#e7f5ff'
        const id = lesson[index].id;
        const csurf = lesson[index].dataset.csurf
        fetch('/viewCourse/video/' + id, {
            method: 'post',
            headers: {
                'X-XSRF-TOKEN': csurf
            }
        }).then(res => res.json())
            .then(dataVideo => {
                if (dataVideo != null) {
                    var data = JSON.parse(dataVideo);
                    const html = `
                    
                <h3 class="title title__video">${data.name_lesson}.</h3>
                <div class="video">
                    <video src="/assets/video/${data.link_video}" controls></video>
                </div>
                    `
                    const block = document.querySelector('.content__block__video')
                    block.innerHTML = html
                }
                else{
                    console.error('Данные не получены или пустые');
                }
            }).catch(error => {
                console.log('Произошла ошибка:', error);
                location.reload()
            });
    })

}



/*viewCourse*/

var video = document.querySelector("video");
var popUp = document.querySelector('.pop_up_review .pop_up');

window.addEventListener('resize', function (event) {
    var h = video.clientHeight
    document.querySelector(".content-course").style.height = (h - 64) + "px";

}, true);

const alertReview = document.querySelector('.notification_width')
if (alert.textContent != '') {
    setTimeout(function () {
        alertReview.style.opacity = '0';
        alertReview.style.transition = '.6s';

    }, 4000);
    setTimeout(function () {
        alertReview.style.display = 'none'
    }, 4500);
}


