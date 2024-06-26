const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider-price .progress");
let priceGap = 100;
priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);

        if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});
rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);
        if ((maxVal - minVal) < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

$(document).ready(function () {
    var additional = document.querySelector('.additional-form')
    var btnForm = document.querySelector('.btn_filters');
    $(btnForm).click(function (e) {
        e.preventDefault();
        var formData = $(additional).serialize();
        const csrf = document.querySelector('[name="_csrf"]').value
        $.ajax({
            type: 'POST',
            url: '/catalog/filters',
            data: formData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', csrf);
            },
            success: function (response) {
                let courseList = document.querySelector('.course-list');
                var error = document.querySelector('.nofind')
                if (response.data.length) {
                    
                    const title = response.category;
                    document.querySelector('.title__menu_small').innerHTML = title
                    const html = response.data.map(c => {
                        return `
                    <a href="/card/${c.id}">
                <div class="card card__catalog">
                    <div class="image__card">
                        <img src="/assets/imgCourses/${c.img}" alt="course">
                    </div>
                    <div class="description-card ">
                        <div class="score">
                            <div class="info__score">
                                <div class="item__score">
                                    <img src="/assets/icons/play.svg" alt="play">
                                    <p> ${c.count_lesson} лекций</p>
                                </div>
                                <div class="item__score">
                                    <img src="/assets/icons/clock.svg" alt="clock">
                                    <p>${c.time} часов</p>
                                </div>
                            </div>
                            ${c.average_score ? `
                            <div class="estimation">
                                <div class="item__score">
                                    <img src="/assets/icons/Star 1.svg" alt="star">
                                    <p>${c.average_score}</p>
                                </div>
                                <div class="reviews">
                                    <p>Отзывов: ${c.count_review}</p>
                                </div>
                            </div>
                        ` : ''}
                        </div>
                        <div class="title title__card_slider">
                            ${c.name}
                        </div>
                        <div class="author">
                            ${c.School.name}
                        </div>
                        <div class="short-description">
                            ${c.description}
                        </div>
                        <div class="price">
                            <p>${c.price} ₽</p>
                        </div>
                    </div>
                </div>
            </a>
                    `
                    }).join('');
                    courseList.innerHTML = html;
                    error.style.display = 'none'
                    error.innerHTML = '';
                }
                else {
                    error.innerHTML = `<div class="error-block">
                    <h3>По данным параметрам не найдено ни одного курса</h3>
                </div>`
                    courseList.innerHTML = '';
                    error.style.display = 'block'
                }
            },
            error: function () {
                console.error('Ошибка при выполнении запроса');
            }
        });
    });
});

