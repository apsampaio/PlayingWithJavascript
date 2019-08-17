var wordGuessHTML = document.getElementById('word');
var attemptsHTML = document.getElementById('attempts');
var buttonsHTML = document.getElementById('buttons');
var hintsHTML = document.getElementById('hints');
var attempts, secretWordSummary, secretWord, guessedWrite, flagRight, abc = [];
var audioWin = new Audio('win.mp3');
var audioLose = new Audio('lose.mp3');
var audioOnOff = true;

initButtonsABC();
initialize();

function initButtonsABC() {

        for (let j = 65; j <= 90; j++) 
        abc.push(String.fromCharCode(j));
        for (let i = 0; i < abc.length; i++)
        buttonsHTML.innerHTML += `<input type="button" value="${abc[i]}" onclick="getLetter('${abc[i]}')" id="${abc[i]}">`;
}

function initialize() {

        flagRight = false;
        guessedWrite = [];
        wordGuessHTML.innerText = '';
        getWord();
        attemptsHTML.innerText = 'Tentativas: ' + (attempts = 5);
        getHint();
        abc.forEach( x => {

            document.getElementById(x).disabled = false;
            document.getElementById(x).style = 'default';

        });
}


function getWord() {

    secretWordSummary = wordsSummary[Math.floor(Math.random() * wordsSummary.length)];
    secretWord = secretWordSummary.word.toUpperCase().split('');
    console.log('getWord() => ', secretWord);
    for(let i = 0; i < secretWord.length; i++) {
        wordGuessHTML.innerText = wordGuessHTML.innerText + ' _';
        guessedWrite[i] = '_';
    }  
}


function getLetter(letter) {

    document.getElementById(letter).disabled = true;
    flagRight = false;
    secretWord.forEach((wordLetters, index) => {
        checkLetter(letter, wordLetters, index);
    });
    checkWin(letter);
    
}

function checkLetter(letter, wordLetters, index) {
            if(wordLetters == letter) {
            guessedWrite[index] = letter;
            flagRight = true;
            document.getElementById(letter).style.backgroundColor = '#42cb6f';
        }       

}


function checkWin(letter) {
    wordGuessHTML.innerText = guessedWrite.join(' ');
    if(!flagRight) {
        attempts--;
        getHint();
        document.getElementById(letter).style.backgroundColor = '#ed5562';
        attemptsHTML.innerText = "Tentativas: " + attempts;

        if(attempts <= 0) {
            audioLose.currentTime = 0;
            audioWin.pause();
            audioLose.play(); 
            alert("Errou!")
            initialize();
        }

    } else if (guessedWrite.indexOf('_') === -1) {
        audioWin.currentTime = 0;
        audioLose.pause();
        audioWin.play();    
        alert("Acertou! A palavra secreta: " + secretWord.join(''));
        initialize(); 
      }

}

function getHint() {

    switch (attempts) {
        case 5: hintsHTML.innerText = `Dicas: ${secretWordSummary.hint1}`;
            break;
        case 3: hintsHTML.innerText += `, ${secretWordSummary.hint2}`;
            break;
        case 1: hintsHTML.innerText += `, ${secretWordSummary.hint3}.`;
            break;
    }

}