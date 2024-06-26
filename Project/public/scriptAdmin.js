
function showHints(inputElement) {
    const filters = inputElement.dataset.filters.split(',');
    const input = inputElement.value;
    const hintBox = document.getElementById('hintBox');
    hintBox.innerHTML = '';

    const filteredHints = filters.filter(filter => filter.toLowerCase().includes(input.toLowerCase()));

    filteredHints.forEach(hint => {
        const hintElement = document.createElement('div');
        hintElement.textContent = hint;
        hintElement.classList.add('hint');

        hintElement.addEventListener('click', function () {
            inputElement.value = hint;
            hintBox.style.display = 'none';
        });

        hintBox.appendChild(hintElement);
    });

    if (input) {
        hintBox.style.display = 'block';
    } else {
        hintBox.style.display = 'none';
    }
}


/*поле для добавления школы */

var btnNoCategory = document.querySelector('.no-school');
if (btnNoCategory) {
    btnNoCategory.addEventListener('click', () => {
        var container = document.querySelector('.select-school');
        container.innerHTML = `
            <label for="school">Название школы</label>
            <input type="text" name="school" id="school" minlength="1" maxlength="50" required>
        `;
        var newElement = document.getElementById('school');
        newElement.addEventListener('input', function (event) {
            const inputValue = event.target.value;
            const regex = /[^a-zA-Zа-яА-Я ]/g;
            if (regex.test(inputValue)) {
                event.target.value = inputValue.replace(regex, '');
            }
        });
    });
}

/* Поле для ввода категории */

var btnNoCategory = document.querySelector('.no-category');
if (btnNoCategory) {
    btnNoCategory.addEventListener('click', () => {
        var container = document.querySelector('.select-category');
        container.innerHTML = `
            <label for="category">Название категории</label>
            <input type="text" name="category" id="category" minlength="1" maxlength="20" required>
        `;
        var newElement = document.getElementById('category');
        newElement.addEventListener('input', function (event) {
            const inputValue = event.target.value;
            const regex = /[^a-zA-Zа-яА-Я]/g;
            if (regex.test(inputValue)) {
                event.target.value = inputValue.replace(regex, '');
            }
        });
    });
}

/*Добавить поле для условия курса */

var btnAddCondition = document.querySelector('.add-condition');
deleteInputConditionCourse();
if (btnAddCondition) {
    btnAddCondition.addEventListener('click', () => {
        var newItem = document.createElement('div');
        newItem.classList.add('item_condition_course');
        newItem.innerHTML = `
        
        <div class="input__condition_course">
            <input id="condition_course" type="text" name="condition_course" minlength="3" maxlength="100" " required>
            <img class="remove__condition_course" src="/assets/icons/cross.svg" alt="cross">
        </div>
        `;
        document.querySelector('.item__block-condition_course').appendChild(newItem);

        deleteInputConditionCourse();

        newItem.addEventListener('input', function (event) {
            const inputValue = event.target.value;
            const regex = /[^a-zA-Zа-яА-Я_\-., ]/g;
            if (regex.test(inputValue)) {
                event.target.value = inputValue.replace(regex, '');
            }
        });
    });
}
/*Удаление поля для условия курса */
function deleteInputConditionCourse() {
    listRemoveInputConditionCourse = document.querySelectorAll('.remove__condition_course')
    listItemConditionCourse = document.querySelectorAll('.item_condition_course')
    for (let index = 0; index < listRemoveInputConditionCourse.length; index++) {
        listRemoveInputConditionCourse[index].addEventListener('click', () => {
            listRemoveInputConditionCourse = document.querySelectorAll('.remove__condition_course')
            if (listRemoveInputConditionCourse.length > 1) {
                listItemConditionCourse[index].parentNode.removeChild(listItemConditionCourse[index])
            }
        })
    }
}

/*Добавление поля для программы курса */

var btnAddProgram = document.querySelector('.add-item-program');
var listRemoveInputProgramStep = document.querySelectorAll('.remove__program-step')
var listItemProgramStep = document.querySelectorAll('.item__program-step')
deleteInputProgramCourse();
if (btnAddProgram) {
    btnAddProgram.addEventListener('click', () => {
        var newItem = document.createElement('div');
        newItem.classList.add('item__program-step');
        newItem.innerHTML = `
        <div class="input__program-step">
        <input id="program_course" type="text" name="program_course" minlength="3" maxlength="100" "
        required>
        <img class="remove__program-step" src="/assets/icons/cross.svg" alt="assa">
        </div>
        `;
        document.querySelector('.item__block-program_course').appendChild(newItem);
        deleteInputProgramCourse();
        newItem.addEventListener('input', function (event) {
            const inputValue = event.target.value;
            const regex = /[^a-zA-Zа-яА-Я_\-., ]/g;
            if (regex.test(inputValue)) {
                event.target.value = inputValue.replace(regex, '');
            }
        });
    });
}

/*Удаление поля для программы курса */
function deleteInputProgramCourse() {
    listRemoveInputProgramStep = document.querySelectorAll('.remove__program-step')
    listItemProgramStep = document.querySelectorAll('.item__program-step')
    for (let index = 0; index < listRemoveInputProgramStep.length; index++) {
        listRemoveInputProgramStep[index].addEventListener('click', () => {
            listRemoveInputProgramStep = document.querySelectorAll('.remove__program-step')
            if (listRemoveInputProgramStep.length > 1) {
                listItemProgramStep[index].parentNode.removeChild(listItemProgramStep[index])
            }
        })
    }
}

/*Добавление поля для контента курса */

var blockMaterials = document.querySelector('.block-materials');
var btnAddMaterials = document.querySelector('.add-materials');
if (btnAddMaterials) {
    btnAddMaterials.addEventListener('click', () => {
        var countElements = document.querySelectorAll('.item__block-materials').length + 1;
        var newItem = document.createElement('div');
        newItem.classList.add('item__block-materials');
        newItem.innerHTML = `
            <label for="name_lesson_${countElements}">Название урока ${countElements}</label>
            <input id="name_lesson_${countElements}" type="text" name="name_lesson" minlength="3" maxlength="40" required>
            <label for="videoFile_${countElements}">Выберите видео ${countElements}-ой лекции</label>
            <input type="file" name="video_lesson" id="videoFile_${countElements}" accept="video/*" required>
        `;
        blockMaterials.appendChild(newItem);
        newItem.querySelector(`#name_lesson_${countElements}`).addEventListener('input', function (event) {
            const inputValue = event.target.value;
            const regex = /[^a-zA-Zа-яА-Я0-9_\-. ]/g;
            if (regex.test(inputValue)) {
                event.target.value = inputValue.replace(regex, '');
            }
        });
    });
}

/*удалить курс */

var courseList = document.querySelector('.course-list')
var popUpDelete = document.querySelector('.pop_up_delete .pop_up');
if (courseList) {
    courseList.addEventListener('click', event => {
        if (event.target.classList.contains('btn_delete__admin')) {
            const id = event.target.dataset.id
            document.querySelector('[name="idCourse"]').value = id
            popUpDelete.classList.add('open')
        }
    })
}
const closePopupDelete = document.querySelector('.close-popup__delete')
if (closePopupDelete) {
    closePopupDelete.addEventListener('click', () => {
        popUpDelete.classList.remove('open')
    })
}

/*фильтры списка курсов */

$(document).ready(function () {
    var listCourse = document.querySelector('.list-course__form')
    var btnForm = document.querySelector('.btn_filters_list-course');
    $(btnForm).click(function (e) {
        e.preventDefault();
        var formData = $(listCourse).serialize();
        const csrf = document.querySelector('[name="_csrf"]').value
        $.ajax({
            type: 'POST',
            url: '/admin/filters/listCourses',
            data: formData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', csrf);
            },
            success: function (response) {
                var courseList = document.querySelector('.course-list')
                var error = document.querySelector('.nofind')
                if (response.length) {
                    const html = response.map(c => {
                        return `
                        <div class="card card__catalog">
                        <a href="/card/${c.id}" target="_blank">
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
                        </a>
                        <div class="price">
                            <div class="edit-review edit-review__admin">
                                <button class="btn_edit-review btn_edit__admin">
                                    <p>Изменить</p>
                                </button>
                                <button class="btn_edit-review btn_delete__admin" data-id="${c.id}">Удалить</button>
                            </div>
                            <p>${c.price} ₽</p>
                        </div>
                    </div>
                    </div>
                    `
                    }).join('');
                    courseList.innerHTML = html;
                    error.innerHTML = '';
                    error.style.display = 'none'
                }
                else {
                    error.innerHTML = `<div class="error-block">
                    <h3>По данным параметрам не найдено ни одного курса</h3>
                </div>`
                    error.style.display = 'block'
                    courseList.innerHTML = '';
                }
            },
            error: function () {
                console.error('Ошибка при выполнении запроса');
            }
        });
    })
});

/*Фильтр заказов */

$(document).ready(function () {
    var ordersForm = document.querySelector('.orders__form')
    var btnForm = document.querySelector('.btn_filters_orders');
    $(btnForm).click(function (e) {
        e.preventDefault();
        var formData = $(ordersForm).serialize();
        const csrf = document.querySelector('[name="_csrf"]').value
        $.ajax({
            type: 'POST',
            url: '/admin/filters/orders',
            data: formData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', csrf);
            },
            success: function (response) {
                const table = document.querySelector('.table-orders table');
                const blockTabele = document.querySelector('.table-orders')
                var error = document.querySelector('.nofind')
                var tableSummation = document.querySelector('.table-summation')
                var btnOtchet = document.querySelector('#download')
                if (response.length) {
                    const rows = response.map(c => {
                        return `
                            <tr>
                                <td>${c.id}</td>
                                <td>${c.Course.name}</td>
                                <td>${c.Course.School.name}</td>
                                <td>${c.Course.Category.name_category}</td>
                                <td>${c.client.last_name} ${c.client.name}</td>
                                <td>${c.Course.price}</td>
                                <td>${c.date_sold}</td>
                            </tr>
                        `;
                    }).join('');

                    table.innerHTML = `
                        <tr>
                            <th>id</th>
                            <th>Название</th>
                            <th>Школа</th>
                            <th>Категория</th>
                            <th>Клиент</th>
                            <th>Цена</th>
                            <th>Дата покупки</th>
                        </tr>
                        ${rows}
                    `;

                    error.innerHTML = '';
                    blockTabele.style.display = 'block'
                    tableSummation.style.display = 'block'
                    btnOtchet.style.display = 'block'
                    error.style.display = 'none'

                    /*таблица итогов */

                    const totalSum = response.reduce((acc, cur) => acc + cur.Course.price, 0);

                    var html2 = `
                    <table>
                <tr>
                    <th colspan="2">Итого</th>
                    <th style="display: none;"></th>
                </tr>
                <tr>
                    <th>Проданно</th>
                    <th>Общая сумма</th>
                </tr>
                <tr>
                    <td>${response.length}</td>
                    <td>${totalSum}</td>
                </tr>
            </table>
                    `
                    tableSummation.innerHTML = html2;
                }
                else {
                    error.innerHTML = `<div class="error-block">
                    <h3>По данным параметрам не найдено ни одного курса</h3>
                </div>`
                    error.style.display = 'block'
                    blockTabele.style.display = 'none'
                    tableSummation.style.display = 'none'
                    btnOtchet.style.display = 'none'

                }
            },
            error: function () {
                console.error('Ошибка при выполнении запроса');
            }
        });
    })
});

/*Формирование PDF отчета */

if (typeof pdfMake !== 'undefined') {
    var download = document.getElementById('download');
    if (download) {
        download.addEventListener('click', () => {
            function htmlTableToPdfmake(html) {
                const tableRows = [];
                const tableCells = html.querySelectorAll('tr');
                for (let i = 0; i < tableCells.length; i++) {
                    const row = [];
                    const cells = tableCells[i].querySelectorAll('td, th');
                    for (let j = 0; j < cells.length; j++) {
                        row.push(cells[j].textContent.trim());
                    }
                    tableRows.push(row);
                }
                return tableRows;
            }
            function htmlTableToPdfmake2(html) {
                const tableRows = [];
                const tableCells = html.querySelectorAll('tr');

                for (let i = 0; i < tableCells.length; i++) {
                    const row = [];
                    const cells = tableCells[i].querySelectorAll('th, td');
                    let colIndex = 0;
                    for (let j = 0; j < cells.length; j++) {
                        const cellData = {
                            text: cells[j].textContent.trim()
                        };
                        if (cells[j].tagName.toLowerCase() === 'th') {
                            const colspan = cells[j].getAttribute('colspan');
                            if (colspan) {
                                cellData.colSpan = parseInt(colspan);
                                colIndex += parseInt(colspan) - 1;
                            }
                            cellData.bold = true;
                        }
                        row.push(cellData);
                        colIndex++;
                    }
                    tableRows.push(row);
                }
                return tableRows;
            }

            // Данные таблиц в виде массива

            const tableOrdersHTML = document.querySelector('.table-orders table');
            const tableOrdersData = htmlTableToPdfmake(tableOrdersHTML);
            const tableSummationHTML = document.querySelector('.table-summation table');
            const tableSummationData = htmlTableToPdfmake2(tableSummationHTML);

            generateAndDownloadPdf(tableOrdersData, tableSummationData);

            function generateAndDownloadPdf(tableData, tableData2) {
                const styles = {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    table: {
                        margin: [0, 15, 0, 15]
                    },
                    cell: {
                        fontSize: 12,
                        padding: 5
                    }
                };
                const docDefinition = {
                    content: [
                        { text: 'Таблица заказов', style: 'header' },
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: [40, '*', '*', '*', '*', '*', '*'],
                                body: tableData
                            }
                        },
                        { text: 'Итоги', style: 'header' },
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*', '*'],
                                body: tableData2
                            }
                        },
                    ],
                    styles: styles
                };
                const pdfDocGenerator = pdfMake.createPdf(docDefinition);
                pdfDocGenerator.download('orders_summary.pdf');
            }
        });
    }
}

/*удаление уведомления */

const alertReview = document.querySelector('.successfully')
if (alertReview) {
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
if (error) {
    if (error.textContent != '') {
        setTimeout(function () {
            error.style.opacity = '0';
            error.style.transition = '.6s';

        }, 5000);
        setTimeout(function () {
            error.style.display = 'none'
        }, 5500);

    }
}

