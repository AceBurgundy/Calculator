import Component from '../Component.js';

export default class Calculator extends Component {
  constructor() {
    super();

    this.scripts = () => {
      const calculator = document.getElementById('calculator');
      const screen = document.getElementById('calculator-screen');

      let currentInput = '';
      let firstOperand = null;
      let operator = null;
      let waitingForSecondOperand = false;

      const updateScreen = () => {
        screen.innerText = currentInput;
      };

      const inputDigit = digit => {
        if (waitingForSecondOperand) {
          currentInput = digit;
          waitingForSecondOperand = false;
        } else {
          currentInput = currentInput === '0' ? digit : currentInput + digit;
        }

        updateScreen();
      };

      const inputDecimal = () => {
        if (!currentInput.includes('.')) {
          currentInput += '.';
          updateScreen();
        }
      };

      const handleOperator = nextOperator => {
        const inputValue = parseFloat(currentInput);

        if (firstOperand === null) {
          firstOperand = inputValue;
        } else if (operator) {
          const result = performCalculation();
          currentInput = String(result);
          firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
      };

      const performCalculation = () => {
        const inputValue = parseFloat(currentInput);
        let result = 0;

        switch (operator) {
          case '+':
            result = firstOperand + inputValue;
            break;
          case '-':
            result = firstOperand - inputValue;
            break;
          case 'x':
            result = firstOperand * inputValue;
            break;
          case '/':
            result = firstOperand / inputValue;
            break;
          default:
            return inputValue;
        }

        return result;
      };

      const resetCalculator = () => {
        currentInput = '';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateScreen();
      };

      calculator.onclick = ({target}) => {
        const digitPressed = target.classList.contains('calculator__button');
        const operatorPressed = target.classList.contains('calculator__operator')
        const equalsPressed = target.id === 'calculator-equals';
        const clearPressed = target.id === 'all-clear';

        if (digitPressed) {
          const digit = target.id;
          if (digit === 'decimal') {
            inputDecimal();
          } else {
            inputDigit(digit);
          }

          return;
        }

        if (operatorPressed) {
          handleOperator(target.innerText);
          return;
        }

        if (equalsPressed) {
          if (operator !== null) {
            const result = performCalculation();
            currentInput = String(result);
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateScreen();
          }

          return;
        }

        if (clearPressed) {
          resetCalculator();
          return;
        }
      }
    };

    this.template = /* html */`
      <section id="calculator">
        <div id="calculator-screen"></div>

        <button class="calculator__operator" id="addition">+</button>
        <button class="calculator__operator" id="subtraction">-</button>
        <button class="calculator__operator" id="multiplication">x</button>
        <button class="calculator__operator" id="division">/</button>

        <div id="calculator-numbers">
          <button class="calculator__button" id="1">1</button>
          <button class="calculator__button" id="2">2</button>
          <button class="calculator__button" id="3">3</button>
          <button class="calculator__button" id="4">4</button>
          <button class="calculator__button" id="5">5</button>
          <button class="calculator__button" id="6">6</button>
          <button class="calculator__button" id="7">7</button>
          <button class="calculator__button" id="8">8</button>
          <button class="calculator__button" id="9">9</button>
          <button class="calculator__button" id="0">0</button>
          <button class="calculator__option" id="decimal">.</button>
          <button class="calculator__option" id="all-clear">AC</button>
        </div>

        <button id="calculator-equals">=</button>
      </section>
    `;
  }
}
