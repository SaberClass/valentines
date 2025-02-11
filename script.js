// Sorry if the comments are buns, im not used to commenting my code and decided to give it a try

const gifElement = document.getElementById("valentine-gif");
const questionText = document.getElementById("question-text");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

// No button options
const noButtonTexts = [
  "PLEASE???",
  "BE MY VALENTINESSS",
  "PLS POOKIE",
  "I NEEEEEEEED THIS",
];

let yesButtonSize = 1;

// Preload GIFs
const gifs = {
  shy: new Image(),
  sad: new Image(),
  finalHappy: new Image(),
};

gifs.shy.src = "gifs/gif1.gif"; // Initial happy GIF
gifs.sad.src = "gifs/gif2.gif"; // Sad GIF
gifs.finalHappy.src = "gifs/gif3.gif"; // Final happy GIF

// Wait for all GIFs to load
Promise.all([
  new Promise((resolve) => {
    gifs.shy.onload = resolve;
  }),
  new Promise((resolve) => {
    gifs.sad.onload = resolve;
  }),
  new Promise((resolve) => {
    gifs.finalHappy.onload = resolve;
  }),
]).then(() => {
  gifElement.src = gifs.shy.src;
});

yesButton.addEventListener("click", handleYesClick);
noButton.addEventListener("click", handleNoClick);

function handleYesClick() {
  // Change GIF and remove buttons
  gifElement.src = gifs.finalHappy.src;
  questionText.textContent = "YIPEEEEEE!!1!1";
  yesButton.style.display = "none";
  noButton.style.display = "none";
}

function handleNoClick() {
  // Randomize no button text
  const randomIndex = Math.floor(Math.random() * noButtonTexts.length);
  noButton.textContent = noButtonTexts[randomIndex];

  // Enlarge yes button and shrink no button
  yesButtonSize += 0.2;
  yesButton.style.transform = `scale(${yesButtonSize})`;
  noButton.style.transform = `scale(${1 / yesButtonSize})`;

  // Change GIF to sad gif
  gifElement.src = gifs.sad.src;

  // Prevent further resizing if yes button is too big
  if (yesButtonSize >= 3) {
    noButton.removeEventListener("click", handleNoClick);
  }
}
