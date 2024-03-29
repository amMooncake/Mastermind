const openBtn = document.querySelectorAll('.openBtn');
const closeBtn = document.querySelector('.closeBtn');
const nav = document.querySelectorAll('.nav');

openBtn.forEach(element => element.addEventListener('click', () => {
    nav.forEach(element => element.classList.add('visible'));
    moveMainGame();
}));


closeBtn.addEventListener('click', () => {
    nav.forEach(element => element.classList.remove('visible'));
    moveMainGame();
});


function moveMainGame(){
    if(nav[0].classList.contains('visible')){
        document.querySelector('.masterContent').style.transform = 'translate(50%)';
    }else{
        document.querySelector('.masterContent').style.transform = 'translate(0%)';
    }
}