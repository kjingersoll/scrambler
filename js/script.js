const title = document.getElementById("title");
const tilesContainer = document.getElementById("tiles-container");
const scrambleTiles = document.getElementById("scramble-tiles");
const answerTiles = document.getElementById("answer-tiles");
const answerContainer = document.getElementById("placeholders");
const messageDisplay = document.getElementById("message");
const guessCounter = document.getElementById("guess-counter");
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const playAgainButton = document.getElementById("play-again");
const difficultySelect = document.getElementById("difficult-select");
const playArea = document.getElementById("gameplay");

let answer = "countdown";
let mixedWord = "";
let possibles = [];
let totalGuesses = 10;
let remainingGuesses = 10;
let difficulty = "easy";

function setDifficulty(e) {
  if (e.target.id == "easy") {
    difficulty = "easy";
    totalGuesses = 10;
  } else if (e.target.id == "medium") {
    difficulty = "medium";
    totalGuesses = 5;
  } else if (e.target.id == "hard") {
    difficulty = "hard";
    totalGuesses = 3;
  }
  playArea.classList.remove("hide");
  difficultySelect.classList.add("hide");
  getWord();
}

async function getPossibles() {
  const res = await fetch(
    "https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa.txt"
  );
  const data = await res.text();
  possibles = data.split("\n");
}

function checkLength(value) {
  if (difficulty === "easy") {
    return value.length < 6 && value.length > 2;
  } else if (difficulty === "medium") {
    return value.length > 5 && value.length < 9;
  } else if (difficulty === "hard") {
    return value.length > 8 && value.length < 11;
  }
}

function getWord() {
  let correctLengthWords = possibles.filter(checkLength);
  random = Math.floor(Math.random() * correctLengthWords.length);
  answer = correctLengthWords[random];
  scrambleWord(answer);
}

function scrambleWord(word) {
  do {
    let wordArray = word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      const swap = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[swap]] = [wordArray[swap], wordArray[i]];
    }
    mixedWord = wordArray.join("");
  } while (mixedWord === word);
  writeTiles(mixedWord, scrambleTiles);
  writeTiles(word, answerTiles);
  manageGuesses(totalGuesses);
  console.log(word);
}

function checkMatch(event) {
  event.preventDefault();
  remainingGuesses--;
  let guess = guessInput.value;
  if (guess === answer) {
    answerTiles.classList.remove("hide");
    messageDisplay.innerText = "Correct!";
    playAgainButton.classList.remove("hide");
    guessForm.classList.add("hide");
  } else if (remainingGuesses >= 1) {
    messageDisplay.innerText = "Incorrect";
    guessInput.value = "";
    manageGuesses("decrement");
  } else {
    messageDisplay.innerText = "Try Again";
    playAgainButton.classList.remove("hide");
    tilesContainer.classList.add("fail");
    guessForm.classList.add("hide");
    manageGuesses("decrement");
  }
}

function writeTiles(word, place) {
  while (place.hasChildNodes()) {
    place.removeChild(place.firstChild);
  }
  for (letter of word) {
    let elementI = document.createElement("div");
    elementI.innerHTML = `${letter}`;
    elementI.classList.add("letter");
    place.append(elementI);
    if (place == answerTiles) {
      let tile = document.createElement("div");
      tile.classList.add("tile");
      answerContainer.append(tile);
    }
  }
}

function manageGuesses(number) {
  if (number == totalGuesses) {
    remainingGuesses = totalGuesses;
  } else if (number == "decrement") {
    remainingGuesses = remainingGuesses--;
  }
  guessCounter.innerHTML = `${remainingGuesses}`;
}

function playAgain() {
  answerTiles.classList.add("hide");
  tilesContainer.classList.remove("fail");
  guessForm.classList.remove("hide");
  playAgainButton.classList.add("hide");
  guessInput.value = "";
  messageDisplay.innerText = "";
  manageGuesses(totalGuesses);
  difficultySelect.classList.remove("hide");
  playArea.classList.add("hide");
}

function checkReturnToMain() {
  if (confirm(`Go to Difficulty Select? \n(current Scramble will be lost)`)) {
    playAgain();
  }
}

getPossibles();

difficultySelect.addEventListener("click", setDifficulty);
guessForm.addEventListener("submit", checkMatch);
playAgainButton.addEventListener("click", playAgain);
title.addEventListener("click", checkReturnToMain);
