const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');

const screen = document.querySelector('.screen');
const previousExpression = document.querySelector('.previous-expression'); 
const output = document.querySelector('.current-expression');

const equalTo = document.querySelector('[data-equalto]');
const allClear = document.querySelector('[data-all-clear]');
const del = document.querySelector('[data-delete]');

const allButtons = document.querySelectorAll('button');

let firstNumber = '';
let secondNumber = '';
let operation = '';

window.addEventListener('keyup', function(e) {
    if(/^[0-9.]$/.test(e.key)) {
        appendNumber(e.key);
    }
    else if(/[-*+/]/.test(e.key)) {
        appendOperator(e.key);
    }
    else if(/Enter|=/.test(e.key)) {
        equals();
    }
    else if(/Backspace/.test(e.key)) {
        deleteNum();
    }
});

allClear.addEventListener('click', clearScreen);

del.addEventListener('click', deleteNum);

equalTo.addEventListener('click', equals);

numberButton.forEach(button => 
    button.addEventListener('click', () => appendNumber(button.textContent)));

operationButton.forEach(button => 
    button.addEventListener('click', () => appendOperator(button.textContent)));

// remove focus from clicked button
allButtons.forEach(button => 
    button.addEventListener('click', e => e.target.blur() ));

function appendNumber(number) {
    if((number === '.' && output.textContent.includes('.')) || output.textContent.length === 17) {
        return;
    }
    output.textContent += number;
}

function appendOperator(operator) {

    if(output.textContent === '' 
        && previousExpression.textContent === '' 
        && (operator === '+' || operator === '-')) {
        output.textContent = operator;
        return;
    }

    firstNumber = (firstNumber) ? operate(firstNumber, output.textContent, operation) : output.textContent;

    operation = operator;
    previousExpression.textContent = `${firstNumber} ${operation}`;
    output.textContent = '';
}

function operate(firstNumber, secondNumber, operation) {
    let first = Number(firstNumber);
    let second = Number(secondNumber);
    let result;

    switch(operation) {
        case '+' :
            result = first + second;
            break;
        case '-' :
            result = first - second;
            break;
        case '*' :
            result = first * second;
            break;
        case '÷' :
        case '/' :
            if (second === 0) {
                alert('number cannot be divided by zero');
                return;
            }
            result = first / second;
            break;
    }  

    /* if number of digits after decimal places is more than 3 set the decimal place precision upto 3 places else return the result */
    return (result.toString().includes('.') && result.toString().split('.')[1].length > 3) ? result.toFixed(3) : result;   
}

function clearScreen() {
    firstNumber = '';
    secondNumber = '';
    output.textContent = '';
    previousExpression.textContent = '';
    operation = '';
}

function deleteNum() {
    output.textContent = output.textContent.slice(0, -1);
}

function equals() {
    if(output.textContent === '') {
        return;
    }

    secondNumber = output.textContent;
    previousExpression.textContent = '';
    output.textContent = operate(firstNumber, secondNumber, operation);

    firstNumber = ''
    operation = '';
}
