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
        output.textContent += button.textContent;
    });
    // add keydown event listener
});

operationButton.forEach(button => {
    button.addEventListener('click', function() {
        // make it a named function
        // let user to input only + or - before entering number and count it as a part of first number

        if(previousExp.textContent.includes('=')) {
            num1 = output.textContent;
            operation = button.textContent;
            previousExp.textContent = output.textContent + ' ' + button.textContent + ' ';
            output.textContent = '';
        }
        else if(num1) {
            num2 = output.textContent;
            previousExp.textContent = operate(num1, num2, operation);
            num1 = previousExp.textContent;
            operation = button.textContent;
            previousExp.textContent += ' ' + button.textContent + ' ';
            output.textContent = '';
            num2 = '';
        }
        else {
            num1 = output.textContent;
            operation = button.textContent;
            previousExp.textContent += output.textContent + ' ' + button.textContent + ' ';
            output.textContent = '';
        }
    });
    // add keydown eventlistener
});

function operate(num1, num2, operation) {
    let first = Number(num1);
    let second = Number(num2);
    let result

    switch(operation) {
        case '+' : result = first + second;
                break;
        case '-' : result = first - second;
                break;
        case '*' : result = first * second;
                break;
        case '/' : result = first / second;
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
    let str = output.textContent;
    str = str.slice(0, -1);
    output.textContent = str;
}

function equals() {
    // show result when equalto button is pressed -- done
    num2 = output.textContent;
    previousExp.textContent = `${num1} ${operation} ${num2} =`
    output.textContent = operate(num1, num2, operation);
    num2 = '';
    operation = '';
    // don't let equal to work right after an operator
    // show the output if there is only one number -- done
}

// set input limit
