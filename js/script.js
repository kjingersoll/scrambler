const ticketContainer = document.getElementById("ticket-container");
const ticketSides = document.getElementById("ticket-sides");
const scrambleText = document.getElementById("scramble-text");
const answerText = document.getElementById("answer-text");
const messageDisplay = document.getElementById("message");
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const playAgainButton = document.getElementById("play-again");

let word = "countdown";
let mixedWord = "";
let possibles = [];

async function getPossibles() {
    const res = await fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa.txt");
    const data = await res.text();
    possibles = data.split("\n");
    getWord(possibles)
}

function checkLength(value) {
    return value.length == 5;
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
    console.log(word);
}

function checkMatch(event) {
    event.preventDefault();
    let guess = guessInput.value;
    if (guess === word) {
        ticketSides.classList.add("flip");
        ticketContainer.classList.add("flip");
        messageDisplay.innerText = "Correct!";
        playAgainButton.classList.remove("hide");
    } else {
        messageDisplay.innerText = "Try Again";
        guessInput.value = "";
    }
}

function playAgain() {
    ticketSides.classList.remove("flip");
    guessInput.value = "";
    messageDisplay.innerText = "";
    getWord();
}

getPossibles()

guessForm.addEventListener("submit", checkMatch);
playAgainButton.addEventListener("click", playAgain);