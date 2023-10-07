const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const invertButton = document.querySelector('.sign');
const percentButton = document.querySelector('#percent');
const equalsButton = document.querySelector('#equals');
const displayed = document.querySelector('#display');
const displayedInt = parseInt(displayed.textContent);
const displayedString = displayed.textContent;

let memory = displayedString;
let secondNumber = 0;
let hasDecimal = false;
let completed = false;
let operator = '';
let result;

console.log(memory);
console.log(typeof memory);

let addition = () => result = parseFloat(memory) + parseFloat(secondNumber);
let subtraction = () => result = parseFloat(memory) - parseFloat(secondNumber);
let multiplication = () => result = parseFloat(memory) * parseFloat(secondNumber);
let division = () => result = parseFloat(memory) / parseFloat(secondNumber);
let clear = () => {
    memory = 0;
    result = 0;
    operator = '';
    hasDecimal = false;
};
let addDecimal = () => {
    let memoryString = memory.toString();
    let secondNumberString = secondNumber.toString();
    if (operator === '') {
        if (memoryString.includes('.') == false) {
            memory += '.';
            console.log(memory)
            console.log(parseFloat(memory))
            hasDecimal = true;
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
    console.log(hasDecimal, completed);
};

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
        console.log(memoryInt)
        if (operator === '') {
            if (memoryInt === 0 && memory !== '0.') {
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
        if (secondNumber === 0) {
            operator = button.value;
            secondNumber = 0;
        }
        else {
            equalize();
            operator = button.value;
        }
        console.log('New operator selected: ' + operator + ' ... ' + typeof operator)
    })
})

decimalButton.addEventListener('click', () => {
    addDecimal();
})

invertButton.addEventListener('click', () => {
    memory *= -1;
    console.log(memory);
    updateDisplay();
})

clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

percentButton.addEventListener('click', () => {
    memory *= 0.01;
    updateDisplay();
})

let equalize = () => {
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
    document.getElementById('display').innerText = memory;
};

equalsButton.addEventListener('click', () => {
    if (!secondNumber) {
        return;
    }
    else {
        equalize();
    }
});

document.onkeydown = function (event) {
    evt = event || window.Event;
    console.log(evt)
    console.log(typeof evt)
    switch (evt.key) {
        case '0':
            console.log('HIT')
            break;
        case '1':
            console.log('HIT')
            break;
        case '2':
            console.log('HIT')
            break;
        case '3':
            console.log('HIT')
            break;
        case '4':
            console.log('HIT')
            break;
        case '5':
            console.log('HIT')
            break;
        case '6':
            console.log('HIT')
            break;
        case '7':
            console.log('HIT')
            break;
        case '8':
            console.log('HIT')
            break;
        case '9':
            console.log('HIT')
            break;
        case '=':
            console.log('HIT')
            break;
        case '-':
            console.log('HIT')
            break;
        case '+':
            console.log('HIT')
            break;
        case '*':
            console.log('HIT')
            break;
        case '/':
            console.log('HIT')
            break;
        case '%':
            console.log('HIT')
            break;
        case '.':
            addDecimal();
            updateDisplay();
            console.log('HIT')
            break;
        case 'Backspace':
            console.log('HIT');
            clear();
            updateDisplay();
            break;
        default:
            console.log('Use numbers')
            break;
    }
}