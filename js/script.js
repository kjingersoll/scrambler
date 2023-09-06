const wordDisplay = document.getElementById("word");
const messageDisplay = document.getElementById("message");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");

let word = "countdown";
let mixedWord = "";
let possibles = [];

async function getPossibles() {
    const res = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
    const data = await res.text();
    possibles = data.split("\r\n");
    getWord(possibles)
}

function checkLength(value) {
    return value.length == 8;
}

function getWord(possibles) {
    let correctLengthWords = possibles.filter(checkLength);
    random = Math.floor(Math.random() * correctLengthWords.length);
    word = correctLengthWords[random];
    scrambleWord(word);
}

function scrambleWord(word) {
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
        wordDisplay.innerText = word;
    } else {
        messageDisplay.innerText = "Try Again";
        guessInput.value = "";
    }
}

getPossibles()

submitButton.addEventListener("mouseup", checkMatch);