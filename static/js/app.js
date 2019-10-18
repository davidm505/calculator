const calculator = {
    history: null,
    num1: null,
    num2: null, 
    operator: null,
    total: null,
}

const display = document.querySelector('#display');

const clearButton = document.querySelector("#clear");

const inputButtons = document.querySelectorAll(".input");

const operatorButtons = document.querySelectorAll(".operator");

const equalButton = document.querySelector('#equals');

clearButton.addEventListener('click', clearDisplay);

inputButtons.forEach(button => button.addEventListener("click", addToDisplay));

operatorButtons.forEach(button => button.addEventListener('click', handleOperators));

equalButton.addEventListener('click', handleEqual);


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    let value = num1 * num2;
    return value;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            console.log("ERROR!");
            break;
    };
}

function addToCalc(e) {
    if(!calculator.num1) {
        calculator.num1 = Number(e);
        console.log('Num1 is: ' + calculator.num1);
    }
    else {
        calculator.num2 = Number(e);
        console.log('Num2 is: ' + calculator.num2);
    }
}

function addToDisplay(e) {
    display.innerHTML += e.target.value;
}

function clearDisplay() {
    display.innerHTML = '';
    calculator.num1 = null;
    calculator.num2 = null;
    calculator.operator = null;
    calculator.total = null;
}

function handleOperators(e) {
    let oIndex = 0;
    
    if(!calculator.operator) {
        console.log(calculator);

        addToDisplay(e);

        oIndex = display.innerHTML.indexOf(e.target.value);
        
        calculator.operator = e.target.value;
        
        addToCalc(display.innerHTML.slice(0,oIndex));
    }
    else {
        oIndex = display.innerHTML.indexOf(calculator.operator);
        
        addToCalc(display.innerHTML.slice(oIndex + 1,-1));
        
        calculator.total = operate(calculator.operator, calculator.num1, calculator.num2);
        
        calculator.history = display.innerHTML.slice(0,-1);

        display.innerHTML = calculator.total;

        addToDisplay(e);
        
        calculator.num1 = calculator.total;
        calculator.num2 = null;
        calculator.operator = e.target.value;

        console.log(calculator);
    }
}

function handleEqual() {
    let value = display.innerHTML;
    
    const operators = ['x', '+', '-', '/'];
    
    let oIndex = value.indexOf(calculator.operator);
    
    addToCalc(value.slice(oIndex + 1));
    
    calculator.total = operate(calculator.operator, calculator.num1, calculator.num2);
    
    calculator.history = value;
    
    console.log(calculator);
    
    display.innerHTML = calculator.total;
    calculator.num1 = calculator.total;
    calculator.num2 = null;
    calculator.operator = null;
}
