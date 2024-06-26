const rname = document.getElementById('rname');
const rlastname = document.getElementById('rlastname');
const rlogin = document.getElementById('rlogin');
const rphone = document.getElementById('rphone');
const rpassword = document.getElementById('rpassword');
const btnreg = document.getElementById('btn_reg');

rname.addEventListener('input', function(event) {
    const inputValue = event.target.value;
    const regex = /[^[a-zA-Zа-яА-Я_\-]+$/g; 

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, ''); 
    }
});
rlastname.addEventListener('input', function(event) {
    const inputValue = event.target.value;
    const regex = /[^[a-zA-Zа-яА-Я_\-]+$/g; 

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, ''); 
    }
});
rlogin.addEventListener('input', function(event) {
    const inputValue = event.target.value;
    const regex = /[^[a-zA-Z0-9\-_]+$/g; 

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, ''); 
    }
});

rphone.addEventListener('input', function(event) {
    const inputValue = event.target.value;
    const regex = /[^0-9]/g; 

    if (regex.test(inputValue)) {
        event.target.value = inputValue.replace(regex, ''); 
    }
});

btnreg.addEventListener('click', ()=>{
    if(rname.value === '')
    {
        rname.style.border = '1px solid #e74848'


        setTimeout(function() {
            rname.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    if(rlastname.value === '')
    {
        rlastname.style.border = '1px solid #e74848'


        setTimeout(function() {
            rlastname.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    if(rlogin.value === '')
    {
        rlogin.style.border = '1px solid #e74848'


        setTimeout(function() {
            rlogin.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    if(remail.value === '')
    {
        remail.style.border = '1px solid #e74848'


        setTimeout(function() {
            remail.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    if(rphone.value === '')
    {
        rphone.style.border = '1px solid #e74848'


        setTimeout(function() {
            rphone.style.border = '1px solid #6096ba'; 
        }, 3000);
    };
    if(rpassword.value === '')
    {
        rpassword.style.border = '1px solid #e74848'


        setTimeout(function() {
            rpassword.style.border = '1px solid #6096ba'; 
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