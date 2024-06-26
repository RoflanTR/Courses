const alogin = document.getElementById('alogin');
const apassword = document.getElementById('apassword');
const btnLog = document.getElementById('btn_log');




btnLog.addEventListener('click', ()=>{
    if (alogin.value === '') {
        alogin.style.border = '1px solid #e74848'
    
    
        setTimeout(function () {
            alogin.style.border = '1px solid #6096ba';
        }, 3000);
    };
    if (apassword.value === '') {
        apassword.style.border = '1px solid #e74848'
    
    
        setTimeout(function () {
            apassword.style.border = '1px solid #6096ba';
        }, 3000);
    };
})

const error = document.querySelector('.error')
if(error.textContent != ''){
    setTimeout(function () {
        error.style.opacity = '0';
        error.style.transition= '.6s';
        
    }, 3000);
    setTimeout(function () {
        error.style.display = 'none'
    }, 3500);
    
}