let numbers = [];

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

function addToDisplay(e) {
    let display = document.querySelector('#display');
    display.value += e.target.value;
}

let inputButtons = document.querySelectorAll(".input");
inputButtons.forEach(button => button.addEventListener("click", addToDisplay));

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => button.addEventListener('click', function(e) {
    let display = document.querySelector("#display");
    // numbers.push(display.value);

    addToDisplay(e);
}));

let clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', function(){
    let display = document.querySelector('#display');
    display.value = '';
    numbers = [];
})

let equalButton = document.querySelector('#equals');
equalButton.addEventListener('click', function() {
    let display = document.querySelector("#display");
    let value = display.value;

    let operators = ['x', '+', '-', '/'];

    let temp = '';
    for(let item in value) {
        if(operators.indexOf(value[item]) == -1) 
            temp += value[item];
        else {
            numbers.push(Number(temp));
            numbers.push(value[item]);
            temp = '';
        }
    }

    numbers.push(Number(temp));

    console.log(numbers);

    if(numbers.length == 3) {
        display.value = operate(numbers[1], numbers[0], numbers[2]);
    }
})