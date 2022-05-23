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

window.addEventListener('keydown', function(e) {
    // if(e.key)
})

numberButton.forEach(button => {
    button.addEventListener('click', function() {
        if(button.textContent === '.' && output.textContent.includes('.')) {
            return;
        }
        output.textContent += button.textContent;
    });
});

operationButton.forEach(button => {
    button.addEventListener('click', function() {
        if(num1) {
            num2 = output.textContent;
            operate(num1, num2, operation);
            num1 = previousExp.textContent;
            operation = button.textContent;
            previousExp.textContent += ' ' + button.textContent + ' ';
            output.textContent = '';
            num2 = '';
        }
        else {
            previousExp.textContent += output.textContent + ' ' + button.textContent + ' ';
            num1 = output.textContent;
            operation = button.textContent;
            output.textContent = '';
        }
    });
});

function operate(num1, num2, operation) {
    let first = Number(num1);
    let second = Number(num2);

    switch(operation) {
        case '+' : add(first, second);
                break;
        case '-' : subtract(num1, num2);
                break;
        case '*' : multiply(num1, num2);
                break;
        case '/' : divide(num1, num2);
    }
    
}

function add(num1, num2) {
    let result = (num1 + num2);
    previousExp.textContent = result;
}

function subtract(num1, num2) {
    let result = (num1 - num2);
    previousExp.textContent = result;
}

function divide(num1, num2) {
    let result = (num1 / num2);
    previousExp.textContent = result;
}

function multiply(num1, num2) {
    let result = (num1 * num2);
    previousExp.textContent = result;
}

function clear() {
    num1 = '';
    num2 = '';
    output.textContent = '';
    previousExp.textContent = '';
    operation = '';
}

function deleteNum() {
    let str = output.textContent;
    str = str.slice(0, -1);
    output.textContent = str;
}