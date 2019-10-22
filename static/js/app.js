const calculator = {
  history: null,
  num1: null,
  num2: null,
  operator: null,
  total: null
};

const display = document.querySelector("#display");

const clearButton = document.querySelector("#clear");

const inputButtons = document.querySelectorAll(".input");

const operatorButtons = document.querySelectorAll(".operator");

const equalButton = document.querySelector("#equals");

const decimalButton = document.querySelector('.decimal');

clearButton.addEventListener("click", clearDisplay);

inputButtons.forEach(button => button.addEventListener("click", addToDisplay));

operatorButtons.forEach(button =>
  button.addEventListener("click", handleOperators)
);

equalButton.addEventListener("click", handleEqual);

decimalButton.addEventListener('click', function(e) {
  let value = display.innerHTML;

  let dUsed = false;

  if(!calculator.operator){
    for(let i of value){
      console.log(i);
      if(i == '.')
        dUsed = true;
    }
  } else {
    let oIndex = value.indexOf(calculator.operator);

    let afterOp = value.slice(oIndex + 1);

    for(let i of afterOp){
      console.log('after op' + i);

      if(i == '.'){
        dUsed = true;
      }
    }
  }

  if(!dUsed)
    addToDisplay(e);
})

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
  if(num2 == 0)
    return "Bad Boy!";
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "ERROR!";
  }
}

function addToCalc(e) {
  if(e == null)
    e = '0';

  console.log(e);

  if (!calculator.num1) {
    calculator.num1 = Number(e);
    console.log("Num1 is: " + calculator.num1);
  } else {
    calculator.num2 = Number(e);
    console.log("Num2 is: " + calculator.num2);
  }
}

function addToDisplay(e) {
  display.innerHTML += e.target.value;
}

function clearDisplay() {
  display.innerHTML = "";
  calculator.num1 = null;
  calculator.num2 = null;
  calculator.operator = null;
  calculator.total = null;
}

function handleOperators(e) {
  let oIndex = 0;

  if(display.innerHTML != '') {
    if (!calculator.operator) {
      addToDisplay(e);
      
      oIndex = display.innerHTML.indexOf(e.target.value);
      
      calculator.operator = e.target.value;
      
      addToCalc(display.innerHTML.slice(0, oIndex));
  
      console.log(calculator);
    } else {
      oIndex = display.innerHTML.indexOf(calculator.operator);
  
      addToCalc(display.innerHTML.slice(oIndex + 1));
  
      calculator.total = operate(
        calculator.operator,
        calculator.num1,
        calculator.num2
      );
  
      calculator.history = display.innerHTML.slice(0, -1);
  
      display.innerHTML = calculator.total;
  
      addToDisplay(e);
  
      calculator.num1 = calculator.total;
      calculator.num2 = null;
      calculator.operator = e.target.value;
  
      console.log(calculator);
    }

  }
}

function handleEqual() {
  let value = display.innerHTML;

  let oIndex = value.indexOf(calculator.operator);

  addToCalc(value.slice(oIndex + 1));

  calculator.total = operate(
    calculator.operator,
    calculator.num1,
    calculator.num2
  );

  calculator.history = value;

  
  display.innerHTML = calculator.total;
  calculator.num1 = calculator.total;
  calculator.num2 = null;
  calculator.operator = null;

  console.log(calculator);
}
