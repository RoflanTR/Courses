const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const login = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnEdit = document.getElementById('btn_edit');

name.addEventListener('input', function(event) {
    const inputValue = event.target.value;
    const regex = /[^[a-zA-Zа-яА-Я_\-]+$/g; 

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, ''); 
    }
});
lastname.addEventListener('input', function(event) {
    const inputValue = event.target.value;
    const regex = /[^[a-zA-Zа-яА-Я_\-]+$/g; 

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, ''); 
    }
});
login.addEventListener('input', function(event) {
    const inputValue = event.target.value;
    const regex = /[^[a-zA-Z0-9\-_]+$/g; 

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, ''); 
    }
});

email.addEventListener('input', function(event) {
    const inputValue = event.target.value;
    const regex = /[^[a-zA-Z0-9][a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g; 

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, ''); 
    }
});


btnEdit.addEventListener('click', ()=>{
    if(name.value === '')
    {
        name.style.border = '1px solid #e74848'


        setTimeout(function() {
            name.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    if(lastname.value === '')
    {
        lastname.style.border = '1px solid #e74848'


        setTimeout(function() {
            lastname.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    if(login.value === '')
    {
        login.style.border = '1px solid #e74848'


        setTimeout(function() {
            login.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    if(email.value === '')
    {
        email.style.border = '1px solid #e74848'


        setTimeout(function() {
            email.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    if(password.value === '')
    {
        password.style.border = '1px solid #e74848'


        setTimeout(function() {
            password.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    
})

const error = document.querySelector('.error')
if(error.textContent != ''){
    setTimeout(function () {
        error.style.opacity = '0';
        error.style.transition= '.6s';
        
    }, 5000);
    setTimeout(function () {
        error.style.display = 'none'
    }, 5500);
    
}