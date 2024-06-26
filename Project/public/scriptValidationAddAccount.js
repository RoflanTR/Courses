var nameCourse = document.getElementById('name');
var description = document.getElementById('description');
var time = document.getElementById('time');
var countLesson = document.getElementById('count_lesson');
var price = document.getElementById('price');
var category = document.getElementById('category');
var programСourse = document.getElementById('program_course');
var linkTg = document.getElementById('link_tg');
var conditionСourse = document.getElementById('condition_course');
var mainResult = document.getElementById('main_result');
var nameLesson = document.getElementById('name_lesson');




nameCourse.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const regex = /[^a-zA-Zа-яА-Я0-9_\-.#@ ]/g;

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, '');
    }
});
description.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const regex = /[^a-zA-Zа-яА-Я_\-. ]/g;

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, '');
    }
});
time.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const regex = /[^0-9]/g;

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, '');
    }
});

countLesson.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const regex = /[^0-9]/g;

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, '');
    }
});

programСourse.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const regex = /[^a-zA-Zа-яА-Я_\-., ]/g;

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, '');
    }
});

linkTg.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const regex = /[^a-zA-Zа-яА-Я0-9_\-.#@/:]/g;

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, '');
    }
});

conditionСourse.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const regex = /[^a-zA-Zа-яА-Я_\-., ]/g;

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, '');
    }
});

mainResult.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const regex = /[^a-zA-Zа-яА-Я_\-., ]/g;

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, '');
    }
});

if(nameLesson)
{
    nameLesson.addEventListener('input', function (event) {
        const inputValue = event.target.value;
        const regex = /[^a-zA-Zа-яА-Я0-9_\-. ]/g; 
    
        if (regex.test(inputValue)) {
            event.target.value = inputValue.replace(regex, '');
        }
    });
}



