//Generate a random number.
let randomNumber = parseInt(Math.random() * 100 + 1);
//Select all the values that needed.
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

//Create element paragraph.
const p = document.createElement('p');

//Contains Previous guesses.
let prevGuess = [];
//Number of attempts.
let numGuess = 1;
//Allow us to play game.
let playGame = true;

//Available to play then what to do.
if (playGame) {
    submit.addEventListener('click', function (event) {
        event.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

//Function that will validate guess.
function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please Enter a valid Number');
    } else if (guess < 1) {
        alert('Please Enter a Number greater than 1');
    } else if (guess > 100) {
        alert('Please Enter a Number smaller than 100');
    } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

//Check Guesses.
function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`Hurry!You guessed it right`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Number is Too Low`);
    } else if (guess > randomNumber) {
        displayMessage(`Number is Too High`);
    }
}
//Clean and Display guess.
function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess},`;
    numGuess++;
    remaining.innerHTML = `${12 - numGuess}`;
}
//Display Message.
function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

//Stop game.
function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');

    p.innerHTML = `<h2 id="newGame">start new game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

//Start a new game.
function newGame() {
    const newGameButton = document.querySelector('#newGame');
    document.getElementById('newGame').style.backgroundColor = 'lightblue';
    newGameButton.addEventListener('click', function (event) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${12 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
