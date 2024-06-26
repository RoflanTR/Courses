var popUpReview = document.querySelector('.pop_up_review .pop_up');
var btnReview = document.querySelector(".btn__plate-buy_review");
var popUpSale = document.querySelector('.pop_up_sale .pop_up');
var btnBuy = document.querySelector(".btn__plate-buy_buy");

/*Отправка отзыва */
if (btnReview) {
    btnReview.addEventListener('click', () => {
        popUpReview.classList.add('open')
    })
    document.querySelector('.close-popup__review').addEventListener('click', () => {
        popUpReview.classList.remove('open')
    })
}
/*Покупка курса */
if (btnBuy) {
    btnBuy.addEventListener('click', () => {
        popUpSale.classList.add('open')
    })  
}
if (popUpSale) {
    const btnConfirmationBuy = document.querySelector('.btn__form_accept');
    btnConfirmationBuy.addEventListener('click', () => {
        const idCourse = btnConfirmationBuy.id
        const csrf = btnConfirmationBuy.value
        fetch('/card/buy/', {
            method: 'post',
            headers: {
                'X-XSRF-TOKEN': csrf
            }
        })
            .then(data => {

                let popUpOpen = document.querySelector('.pop_up_sale');
                const elem1 = `
                    <div class="pop_up open">
                        <div class="pop_up_conteiner">
                            <div class="pop_up_body pop_up_sale">
                                <div>
                                <span class="loader"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                popUpOpen.innerHTML = elem1;

                setTimeout(() => {
                    const elem2 = `
                        <div class="pop_up open">
                            <div class="pop_up_conteiner">
                                <div class="pop_up_body pop_up_sale">
                                    <div class="succses_buy">
                                        <h3 class="title title__succes_buy">Поздравляем с покупкой!</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    popUpOpen.innerHTML = elem2;
                }, 3000); 
                setTimeout(function () {
                    location.reload();
                }, 4500);
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });
        
    });

    document.querySelector('.btn__form_cancel').addEventListener('click', ()=>{
        popUpSale.classList.remove('open')
    })
}

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






