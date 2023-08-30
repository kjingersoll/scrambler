const wordDisplay = document.getElementById("word");
const messageDisplay = document.getElementById("message");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");

let word = "countdown";
let mixedWord = "";

function scrambleWord() {
    let wordArray = word.split("");
    for (let i=wordArray.length - 1; i > 0; i--) {
        const swap = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[swap]] = [wordArray[swap], wordArray[i]];
    }
    mixedWord = wordArray.join("");
    wordDisplay.innerText = mixedWord;
}

function checkMatch() {
    let guess = guessInput.value;
    if (guess == word) {
        messageDisplay.innerText = "Correct!";
    } else {
        messageDisplay.innerText = "Try Again";
    }
}

scrambleWord()

submitButton.addEventListener("mouseup", checkMatch);