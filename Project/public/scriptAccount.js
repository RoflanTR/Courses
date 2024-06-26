/*account*/
var popUpReview = document.querySelector('.pop_up_review .pop_up');
var popUpDelete = document.querySelector('.pop_up_delete .pop_up');


/*Передача id в popup */

var btnEdit = document.querySelectorAll('.btn_edit-review_edit')
var text = document.querySelectorAll('#text-review')
var textReview;
var idArrayEdit = [];
for (let index = 0; index < btnEdit.length; index++) {
    idArrayEdit.push(btnEdit[index].id)
    btnEdit[index].addEventListener('click', () => {

        document.querySelector('#edit_btn').value = idArrayEdit[index]
        textReview = text[index].textContent
    })
    btnEdit[index].removeAttribute("id")
}
/*Изменение отзыва */

var listBtnEdit = document.querySelectorAll(".btn_edit-review_edit")

for (let index = 0; index < listBtnEdit.length; index++) {
    listBtnEdit[index].addEventListener('click', () => {
        popUpReview.classList.add('open')

        /*передача старого комментария в поле для изменений */
        var t = document.querySelector('#review').value = textReview
    })

}
const closePopupReview = document.querySelector('.close-popup__review')
if(closePopupReview){
    closePopupReview.addEventListener('click', () => {
        popUpReview.classList.remove('open')
    
    })
}


/*delete */
var listBtnDelete = document.querySelectorAll(".btn_edit-review_delete")

for (let index = 0; index < listBtnDelete.length; index++) {
    listBtnDelete[index].addEventListener('click', () => {
        popUpDelete.classList.add('open')

    })
}
const closePopupDelete = document.querySelector('.close-popup__delete')
if(closePopupDelete){
    closePopupDelete.addEventListener('click', () => {
        popUpDelete.classList.remove('open')
    })
}


var btnDelete = document.querySelectorAll('.btn_edit-review_delete')
var idArrayDelete = [];
for (let index = 0; index < btnDelete.length; index++) {
    idArrayDelete.push(btnDelete[index].id)
    btnDelete[index].addEventListener('click', () => {

        document.querySelector('.btn__form_accept').value = idArrayDelete[index]
        textReview = text[index].textContent
    })
    btnDelete[index].removeAttribute("id")
}

/*удаление уведомления */
const alertReview = document.querySelector('.successfully')
if(alertReview)
{
    if (alert.textContent != '') {
        setTimeout(function () {
            alertReview.style.opacity = '0';
            alertReview.style.transition = '.6s';
    
        }, 4000);
        setTimeout(function () {
            alertReview.style.display = 'none'
        }, 4500);
    }
}

const error = document.querySelector('.error')
if(error){
    if(error.textContent != ''){
        setTimeout(function () {
            error.style.opacity = '0';
            error.style.transition= '.6s';
            
        }, 5000);
        setTimeout(function () {
            error.style.display = 'none'
        }, 5500);
        
    }
}
