let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let previousMathButton = true;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    //this is not a number
    handleSymbol(value);
  } else {
    //this is a number
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  // if (symbol === "C") {
  // }
  switch (symbol) {
    case "C":
      buffer = "0";
      previousMathButton = true;
      runningTotal = 0;
      break;

    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      calculations(parseInt(buffer));
      previousOperator = null;
      previousMathButton = true;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      if (previousOperator === null) {
        handleMath(symbol);
        break;
      } else {
        calculations(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal; // runningTotal.ToString() ???
        runningTotal = 0;

        handleMath(symbol);
        break;
      }
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  // const intBuffer = +buffer;  - the same

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    calculations(intBuffer);
  }

  previousOperator = symbol;

  //buffer = "0"; // what is this doing? nothing changes if i change this
  previousMathButton = true;
}

function calculations(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
    //runningTotal = runningTotal / intBuffer    - the same
  }
}

function handleNumber(numberString) {
  if (previousMathButton === true) {
    buffer = numberString;
    previousMathButton = false;
  } else {
    buffer += numberString;
  }

  // if (buffer === "0") {
  //   buffer = numberString;
  // } else {
  //   buffer += numberString;
  // }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
