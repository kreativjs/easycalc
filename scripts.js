const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const invertButton = document.querySelector('.sign');
const percentButton = document.querySelector('.percent');
const equalsButton = document.querySelector('#equals');
const displayed = document.querySelector('#display');
const displayedInt = parseInt(displayed.textContent);
const displayedString = displayed.textContent;

let memory = displayedString;
let secondNumber = 0;
let complete = false;
let operator = '';
let result;

console.log(memory);
console.log(typeof memory);

let addition = () => result = parseFloat(memory) + parseFloat(secondNumber);
let subtraction = () => result = parseFloat(memory) - parseFloat(secondNumber);
let multiplication = () => result = parseFloat(memory) * parseFloat(secondNumber);
let division = () => result = parseFloat(memory) / parseFloat(secondNumber);

let updateDisplay = () => {
    if (operator === '') {
        document.getElementById('display').innerText = memory;
    }
    else {
        document.getElementById('display').innerText = secondNumber;
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        let memoryInt = parseFloat(memory);
        if (operator === '') {
            if (memoryInt === 0 && complete == false) {
                memory = button.value;
                console.log('The first number is: ' + memory);
                console.log('The first number is of type: ' + typeof memory);
            }
            else {
                memory += button.value;
            }
            updateDisplay();
        }
        else {
            if (secondNumber === 0) {
                secondNumber = button.value;
                console.log('The second number is: ' + secondNumber)
                console.log('The second number is of type: ' + typeof secondNumber)
            }
            else {
                secondNumber += button.value;
                console.log('The second number is: ' + secondNumber)
                console.log('The second number is of type: ' + typeof secondNumber)
            }
            updateDisplay();
        }
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        operator = button.value;
        secondNumber = 0;
        console.log('New operator selected: ' + operator + ' ... ' + typeof operator)
    })
})

decimalButton.addEventListener('click', () => {
    let memoryString = memory.toString();
    let secondNumberString = secondNumber.toString();
    if (operator === '') {
        if (memoryString.includes('.') == false) {
            memory += '.';
            updateDisplay();
        }
        else updateDisplay();
    }
    else {
        if (secondNumberString.includes('.') == false) {
            secondNumber += '.';
            updateDisplay();
        }
        else updateDisplay();
    }
})

invertButton.addEventListener('click', () => {
    memory *= -1;
    console.log(memory);
    updateDisplay();
})

clearButton.addEventListener('click', () => {
    memory = 0;
    result = 0;
    complete = false;
    operator = '';
    updateDisplay();
})

equalsButton.addEventListener('click', () => {
    switch (operator) {
        case '/':
            if (parseFloat(secondNumber) === 0) {
                result = 1;
                alert('Hey! Stop that...')
                break;
            }
            else {
                division();
            }
            break;
        case '*':
            multiplication();
            break;
        case '-':
            subtraction();
            break;
        case '+':
            addition();
            break;
        default:
            console.log('No operator selected');
            break;
    }
    secondNumber = 0;
    operator = '';
    memory = result;
    console.log('Memory on equals: ' + memory);
    complete = true;
    document.getElementById('display').innerText = memory;
})