let numberButton = document.querySelectorAll('[data-number]');
let operationButton = document.querySelectorAll('[data-operation]');

let screen = document.querySelector('.screen');
let previousExp = document.querySelector('.previous-expression'); 
let output = document.querySelector('.current-expression');

let equalTo = document.querySelector('[data-equalto]');
let allClear = document.querySelector('[data-all-clear]');
let del = document.querySelector('[data-delete]');

let num1 = '';
let num2 = '';
let operation = '';

allClear.addEventListener('click', clear);

del.addEventListener('click', deleteNum);

equalTo.addEventListener('click', equals);

numberButton.forEach(button => {
    button.addEventListener('click', function() {
        // make it a named function
        if(button.textContent === '.' && output.textContent.includes('.')) {
            return;
        }
        if(output.textContent.length === 17) {
            return;
        }
        output.textContent += button.textContent;
    });
});

operationButton.forEach(button => {
    button.addEventListener('click', function() {
        // make it a named function
        if(output.textContent === '' && previousExp.textContent === '') {
            if(button.textContent === '+' || button.textContent === '-'){
                output.textContent = button.textContent;
                return;
            }
        }

        if(!num1) {
            num1 = output.textContent;
            operation = button.textContent;
        }
        else if(num1) {
            num2 = output.textContent;
            num1 = operate(num1, num2, operation);
            num2 = '';
            operation = button.textContent; 
        }
        else {
            num1 = output.textContent;
            operation = button.textContent;
        }

        previousExp.textContent = `${num1} ${operation}`;
        output.textContent = '';
    });
});

function operate(num1, num2, operation) {
    let first = Number(num1);
    let second = Number(num2);
    let result;

    switch(operation) {
        case '+' : result = first + second;
                break;
        case '-' : result = first - second;
                break;
        case '*' : result = first * second;
                break;
        case '÷' : result = first / second;
                break;
    }  

    /* if number of digits after decimal places is more than 3 set the decimal place precision upto 3 places else return the result */
    return (result.toString().includes('.') && result.toString().split('.')[1].length > 3) ? result.toFixed(3) : result;   
}

function clear() {
    num1 = '';
    num2 = '';
    output.textContent = '';
    previousExp.textContent = '';
    operation = '';
}

function deleteNum() {
    output.textContent = output.textContent.slice(0, -1);
}

function equals() {
    num2 = output.textContent;
    if(num2 === '') {
        return;
    }

    previousExp.textContent = '';
    output.textContent = operate(num1, num2, operation);

    num1 = '';
    num2 = '';
    operation = '';
}
