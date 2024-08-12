
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by 0";
    }
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

let firstNumber = '';
let secondNumber = '';
let operator = '';
let displayValue = '';

// DOM 
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');
const backspaceButton = document.getElementById('backspace');

// Event Listeners for Number Buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (operator && displayValue === firstNumber) {
            displayValue = ''; // Reset displayValue if the operator is set and displayValue equals the firstNumber
        }
        displayValue += button.textContent;
        display.textContent = displayValue;
        checkDecimal();
    });
});

// Event Listener for Decimal Button
decimalButton.addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        display.textContent = displayValue;
        decimalButton.disabled = true; 
    }
});

// Event Listeners for Operator Buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (firstNumber === '') {
            firstNumber = displayValue;
            operator = button.textContent;
            decimalButton.disabled = false; 
        } else if (operator) {
            secondNumber = displayValue;
            let result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
            display.textContent = result;
            firstNumber = result.toString();
            displayValue = firstNumber; 
            operator = button.textContent;
            decimalButton.disabled = false; 
        }
    });
});

// Event Listener for Equals Button
equalsButton.addEventListener('click', () => {
    if (firstNumber !== '' && operator !== '' && displayValue !== '') {
        secondNumber = displayValue;
        let result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        display.textContent = result;
        firstNumber = result.toString();
        displayValue = firstNumber; 
        operator = '';
        decimalButton.disabled = false; 
    }
});

// Event Listener for Clear Button
clearButton.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    displayValue = '';
    display.textContent = '0';
    decimalButton.disabled = false;
});

// Event Listener for Backspace Button
backspaceButton.addEventListener('click', () => {
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue || '0';
    checkDecimal();
});

// Function to check and enable/disable decimal button
function checkDecimal() {
    if (displayValue.includes('.')) {
        decimalButton.disabled = true;
    } else {
        decimalButton.disabled = false;
    }
}
