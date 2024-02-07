const screen = document.getElementById("screen");
const calculator = document.getElementById("calculator");

let firstOperand = "";
let secondOperand = "";
let operator = "";

const isOperator = targetId => [
  targetId === "addition",
  targetId === "subtraction",
  targetId === "multiplication",
  targetId === "division"
].some(targetId => targetId === true);

calculator.onclick = ({ target }) => {
  if (target.tagName === "BUTTON") {

    const id = target.id;

    if ((id >= "0" && id <= "9") || id === "decimal") {
      secondOperand += id;
      screen.textContent = secondOperand;
    }

    else if (isOperator(id)) {
      if (firstOperand && operator) {
        firstOperand = calculate(firstOperand, secondOperand, operator);
        screen.textContent = firstOperand;
      } else {
        firstOperand = secondOperand;
      }

      operator = id;
      secondOperand = "";
    }

    else if (id === "equals") {
      if (firstOperand && secondOperand && operator) {
        firstOperand = calculate(firstOperand, secondOperand, operator);
        screen.textContent = firstOperand;
      }

      secondOperand = "";
      operator = "";
    }

    else if (id === "all-clear") {
      firstOperand = "";
      secondOperand = "";
      operator = "";

      screen.textContent = "";
    }
  }
};

function calculate(firstOperand, secondOperand, operator) {
  firstOperand = Number(firstOperand);
  secondOperand = Number(secondOperand);

  let result;

  switch (operator) {
    case "addition":
      result = firstOperand + secondOperand;
      break;
    case "subtraction":
      result = firstOperand - secondOperand;
      break;
    case "multiplication":
      result = firstOperand * secondOperand;
      break;
    case "division":
      result = firstOperand / secondOperand;
      break;
  }

  return result;
}

/**
 * Checks if the screen diagonal display is less than 7 inches.
 * @returns {boolean} True if screen diagonal is less than 7 inches, otherwise false.
 */
function checkScreenSize() {
  const screenWidthInInches = window.screen.width / window.devicePixelRatio;
  const screenHeightInInches = window.screen.height / window.devicePixelRatio;

  const screenSizeInches = Math.sqrt(Math.pow(screenWidthInInches, 2) + Math.pow(screenHeightInInches, 2));
  return screenSizeInches < 7;
}

if (checkScreenSize()) {
  screen.orientation.lock('portrait').catch(error => {
      console.error('Failed to lock screen orientation:', error);
  });
}
