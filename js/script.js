const ticketContainer = document.getElementById("ticket-container");
const ticketSides = document.getElementById("ticket-sides");
const scrambleText = document.getElementById("scramble-text");
const answerText = document.getElementById("answer-text");
const messageDisplay = document.getElementById("message");
const guessCounter = document.getElementById("guess-counter");
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const playAgainButton = document.getElementById("play-again");
const difficultySelect = document.getElementById("difficult-select");

let word = "countdown";
let mixedWord = "";
let possibles = [];
let totalGuesses = 10;
let remainingGuesses = 10;
let difficulty = "easy";

function setDifficulty(e) {
    if(e.target.id == "easy") {
        difficulty = "easy";
        totalGuesses = 10;
    } else if(e.target.id == "medium") {
        difficulty = "medium";
        totalGuesses = 5;
    } else if(e.target.id == "hard") {
        difficulty = "hard";
        totalGuesses = 3;
    };
    getWord();
}

async function getPossibles() {
    const res = await fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa.txt");
    const data = await res.text();
    possibles = data.split("\n");
}

function checkLength(value) {
    if (difficulty === "easy") {
        return value.length < 6
    } else if (difficulty === "medium") {
        return value.length > 5 && value.length < 9
    } else if (difficulty === "hard") {
        return value.length >8
    };
}

function getWord() {
    let correctLengthWords = possibles.filter(checkLength);
    random = Math.floor(Math.random() * correctLengthWords.length);
    word = correctLengthWords[random];
    scrambleWord(word);
}

function scrambleWord(word) {
    do {
    let wordArray = word.split("");
    for (let i=wordArray.length - 1; i > 0; i--) {
        const swap = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[swap]] = [wordArray[swap], wordArray[i]];
    }
    mixedWord = wordArray.join("");}
    while (mixedWord === word);
    scrambleText.innerText = mixedWord.toUpperCase();
    answerText.innerText = word.toUpperCase();
    remainingGuesses = totalGuesses;
    guessCounter.innerText = `${remainingGuesses} Guesses Remaining`;
    console.log(word);
}

function checkMatch(event) {
    event.preventDefault();
    remainingGuesses --;
    let guess = guessInput.value;
    if (guess === word) {
        ticketSides.classList.add("flip");
        messageDisplay.innerText = "Correct!";
        guessCounter.innerText = " ";
        playAgainButton.classList.remove("hide");
        guessForm.classList.add("hide");
    } else if(remainingGuesses >= 1){
        messageDisplay.innerText = "Try Again";
        guessInput.value = "";
        guessCounter.innerText = `${remainingGuesses} Guesses Remaining`;
    } else {
        messageDisplay.innerText = "No More Guesses";
        playAgainButton.classList.remove("hide");
        ticketContainer.classList.add("fail");
        guessForm.classList.add("hide");
        guessCounter.innerText = `${remainingGuesses} Guesses Remaining`;
    }
}

function playAgain() {
    ticketSides.classList.remove("flip");
    ticketContainer.classList.remove("fail");
    guessForm.classList.remove("hide");
    playAgainButton.classList.add("hide");
    guessInput.value = "";
    messageDisplay.innerText = "";
    remainingGuesses = totalGuesses;
    getWord();
}

getPossibles()

difficultySelect.addEventListener("click", setDifficulty);
guessForm.addEventListener("submit", checkMatch);
playAgainButton.addEventListener("click", playAgain);