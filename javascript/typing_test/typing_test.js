const wpmBox = document.querySelector(".wpm_box");
const wpm = document.querySelector(".wpm");
const cpmBox = document.querySelector(".cpm_box");
const cpm = document.querySelector(".cpm");
const errors = document.querySelector(".errors");
const time = document.querySelector(".time");
const accuacy = document.querySelector(".accuracy");
const screen = document.querySelector(".screen");
const typing = document.querySelector(".typing");
const retryButton = document.querySelector(".retry");

const data = [
  "JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions.",
  "While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.",
  "JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.",
  "JavaScript's dynamic capabilities include runtime object construction, variable parameter lists, function variables, dynamic script creation (via eval), object introspection (via for...in and Object utilities), and source-code recovery (JavaScript functions store their source text and can be retrieved through toString()).",
  "This section is dedicated to the JavaScript language itself, and not the parts that are specific to Web pages or other host environments.",
  "For information about APIs that are specific to Web pages, please see Web APIs and DOM.",
];
const INITIAL_TIME = 20;
let currentPhase = 0;
let stackedErrorCount = 0;
let stackedInputCount = 0;
let stackedWordCount = 0;

initialize();

typing.addEventListener("click", () => {
  screen.textContent = data[currentPhase];
  countTimer();
});

typing.addEventListener("input", (e) => {
  let currentNode = document.createElement("span");
  let previousState = "";
  screen.textContent = "";

  let errorCount = stackedErrorCount;
  let inputCount = stackedInputCount;
  let wordCount =
    stackedWordCount +
    data[currentPhase].slice(0, e.target.value.length).trim().split(" ").length;

  for (let i = 0; i < data[currentPhase].length; i++) {
    let currentState = compareLetter(e.target.value, i);
    if (previousState !== currentState) {
      screen.appendChild(currentNode);
      currentNode = document.createElement("span");
      currentNode.setAttribute("class", currentState);
      previousState = currentState;
    }
    if (currentState === "wrong") {
      errorCount++;
    }
    if (currentState) {
      inputCount++;
    }
    currentNode.textContent += data[currentPhase][i];
    if (i === data[currentPhase].length - 1) {
      screen.appendChild(currentNode);
    }
  }
  wpm.textContent = (wordCount * 60) / INITIAL_TIME;
  cpm.textContent = (inputCount * 60) / INITIAL_TIME;
  errors.textContent = errorCount;
  accuacy.textContent =
    inputCount === 0
      ? 100
      : Math.round(((inputCount - errorCount) / inputCount) * 100);
  if (e.target.value.length === data[currentPhase].length) {
    if (currentPhase < data.length - 1) {
      currentPhase++;
    } else {
      currentPhase = 0;
    }
    stackedErrorCount += errorCount;
    stackedInputCount += inputCount;
    stackedWordCount = wordCount;
    screen.textContent = data[currentPhase];
    e.target.value = "";
  }
});

retryButton.addEventListener("click", () => {
  initialize();
});

function initialize() {
  // global variables initialization
  currentPhase = 0;
  stackedErrorCount = 0;
  stackedInputCount = 0;
  stackedWordCount = 0;

  // UI initialization
  wpmBox.setAttribute("style", "display: none");
  cpmBox.setAttribute("style", "display: none");
  errors.textContent = 0;
  time.textContent = INITIAL_TIME + "S";
  accuacy.textContent = 100;
  screen.textContent = "아래를 클릭해서 게임을 시작하세요.";
  typing.disabled = false;
  typing.value = "";
  retryButton.setAttribute("style", "display: none");
}

function finish() {
  wpmBox.setAttribute("style", "display: block");
  cpmBox.setAttribute("style", "display: block");
  retryButton.setAttribute("style", "display: block");
  screen.textContent = "새 게임을 시작하려면 다시시작을 클릭하세요.";
  typing.disabled = true;
}

function countTimer() {
  let restTime = INITIAL_TIME;
  const timer = setInterval(() => {
    if (restTime === 0) {
      clearInterval(timer);
      finish();
    } else {
      restTime--;
      time.textContent = restTime + "S";
    }
  }, 1000);
}

function compareLetter(input, index) {
  if (index < input.length) {
    if (data[currentPhase][index] === input[index]) {
      return "correct";
    } else {
      return "wrong";
    }
  }
  return "";
}
