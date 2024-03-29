// Generate a random secret code
const colors = ['red', 'blue', 'white', 'green', 'black', 'yellow'];
let playerGuesses = []
let secretCode = [];
let isPlaying = false;

const startBtn = document.getElementById('startBtn');
const popBtn = document.getElementById('popBtn');

startBtn.addEventListener('click', () => {  
        
        reset();
        playMastermind();
        isPlaying = true;
        startBtn.style.display = 'none';    
        popBtn.style.display = 'flex';  
    });

popBtn.addEventListener('click', () => {
    if(playerGuesses.length > 0 && isPlaying && playerGuesses.length % 4 !== 0){
        playerGuesses.pop();
        document.getElementById(`gc${playerGuesses.length+1}`).style.backgroundColor = '';
    }
});


const colorPickers = document.querySelectorAll('.color');
for (let i = 0; i < colorPickers.length; i++) {
    colorPickers[i].addEventListener('click', () => {
        if(isPlaying && playerGuesses.length < 40){
            playerGuesses.push(colors[i]);
            document.getElementById(`gc${playerGuesses.length}`).style.backgroundColor = colors[i];
            lightRow();
        }
    });
}

function playMastermind() {
    secretCode = generateSecretCode();
    document.getElementById('gr1').classList.add('rowSelected');
}

function generateSecretCode() {
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * 6);
        secretCode.push(colors[randomIndex]);
    }
    return secretCode;
}

function lightRow() {
    const rowSelector = document.getElementById(`gr${Math.floor(playerGuesses.length / 4 + 1)}`);
    if(playerGuesses.length % 4 == 0){
        document.getElementById(`gr${Math.floor(playerGuesses.length / 4)}`).classList.remove('rowSelected');
        roundResult(chceckRound());
    }
    if(Math.floor(playerGuesses.length / 4 + 1) <= 10){
        rowSelector.classList.add('rowSelected');
    }
}

function chceckRound(){
    let slicedPlayerGuesses = playerGuesses.slice(-4);
    let exactMatches = 0;
    let colorMatches = 0;

    for (let i = 0; i < 4; i++) {
        if (secretCode[i] === slicedPlayerGuesses[i]) {
            exactMatches++;
            slicedPlayerGuesses[i] = null;
        }
    }

    let tempSecretCode = [];
    
    for(let i = 0; i < 4; i++){
        if(slicedPlayerGuesses[i] !== null){
            tempSecretCode.push(secretCode[i]);
        }
    }


    for(let i = 0; i < 4; i++){
        if (tempSecretCode.includes(slicedPlayerGuesses[i])) {
            colorMatches++;
            tempSecretCode[tempSecretCode.indexOf(slicedPlayerGuesses[i])] = 0;
        }
    }
    return {exactMatches, colorMatches};
}

function roundResult(matches){
    let i = 1;
    for(; i <= matches.exactMatches; i++){
        document.getElementById(`gr${Math.floor(playerGuesses.length / 4)}`).querySelector('.checkCell').querySelector(`#check${i}`).style.backgroundColor = 'black';
    }
    for(; i <= matches.colorMatches + matches.exactMatches; i++){
        let circleToWhite = document.getElementById(`gr${Math.floor(playerGuesses.length / 4)}`).querySelector('.checkCell').querySelector(`#check${i}`).style
        circleToWhite.backgroundColor = 'white';
        circleToWhite.border = '1px solid white';
    }
    
    if(matches.exactMatches === 4){
        winProtocole();
    }else if(playerGuesses.length === 40){
        looseProtocole();
    }
}

function looseProtocole(){
    revileCode();
    isPlaying = false;
    popUp(0)
    
}
   

function winProtocole(){
    revileCode();
    isPlaying = false;
    popUp(1);
    
}

function revileCode(){
    startBtn.style.display = 'flex';
    popBtn.style.display = 'none';
    document.getElementById('gameSecreCode').querySelectorAll('.gameCell').forEach((cell, index) => {
        cell.style.backgroundColor = secretCode[index];
    });
}

function popUp(result){
    const popup = document.querySelector('.popupWrapper');
    const close = document.querySelector('.popupClose');
    const content = document.querySelector('.popupContent')

    content.querySelector('h2').textContent = result ? 'Wygrałeś!' : 'Przegrałeś!';
    content.querySelector('p').textContent = result ? 'Gratulacje!' : ':< Spróbuj jeszcze raz!';

    popup.style.display = 'block';
    close.addEventListener('click', () => {
        popup.style.display = 'none';
    });
    // popup.addEventListener('click', () => {
    //     popup.style.display = 'none';
    // });
}

function reset(){

    playerGuesses = [];
    secretCode = [];

    for(let i = 1; i < 11; i++){
        document.getElementById(`gr${i}`).classList.remove('rowSelected');
        
        const row = document.getElementById(`gr${i}`)
        row.querySelector('.checkCell').querySelectorAll('.check').forEach(check => {
            check.style.backgroundColor = '';
            check.style.border = 'var(--secondary-color) 1px solid';
        });

        row.querySelectorAll('.gameCell').forEach(guess => {
            guess.style.backgroundColor = '';
        });

    }
    document.getElementById('gameSecreCode').querySelectorAll('.gameCell').forEach((cell, index) => {
        cell.style.backgroundColor = '';

    });
    isPlaying = false;
}

function resetBtn(){
    revileCode();
    isPlaying = false;
}