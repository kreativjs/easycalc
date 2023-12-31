const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const invertButton = document.querySelector('.sign');
const percentButton = document.querySelector('#percent');
const equalsButton = document.querySelector('#equals');
const displayed = document.querySelector('#display');
const backspaceButton = document.querySelector('#backspace')
const displayedInt = parseInt(displayed.textContent);
const displayedString = displayed.textContent;

let memory = displayedString;
let secondNumber = null;
let completed = false;
let operator = null;
let result;

let addition = () => result = parseFloat(memory) + parseFloat(secondNumber);
let subtraction = () => result = parseFloat(memory) - parseFloat(secondNumber);
let multiplication = () => result = parseFloat(memory) * parseFloat(secondNumber);
let division = () => result = parseFloat(memory) / parseFloat(secondNumber);
let clearColors = () => {
    document.querySelector('#divide').classList.remove('myClass');
    document.querySelector('#multiply').classList.remove('myClass');
    document.querySelector('#subtract').classList.remove('myClass');
    document.querySelector('#add').classList.remove('myClass');
}
let clear = () => {
    memory = 0;
    result = 0;
    operator = null;
    secondNumber = null;
    completed = false;
    clearColors();
};
let deleteDigit = () => {
    if (!operator) {
        let memoryString = memory.toString();
        if (memoryString.length > 1) {
            memory = memoryString.substring(0, memoryString.length - 1);
            updateDisplay();
        }
        else updateDisplay();
    }
    if (!operator && !!secondNumber) {
        updateDisplay();
    }
    if (operator && secondNumber) {
        let secondNumberString = secondNumber.toString();
        secondNumber = secondNumberString.substring(0, secondNumberString.length - 1);
        updateDisplay();
    }
}
let addDecimal = () => {
    if (!operator) {
        let memoryString = memory.toString();
        if (memoryString.includes('.') == false) {
            memory += '.';
            updateDisplay();
        }
        else updateDisplay();
    }
    else {
        if (!secondNumber) {
            secondNumber = 0;
            let secondNumberString = secondNumber.toString();
            if (secondNumberString.includes('.') == false) {
                secondNumber += '.';
                updateDisplay();
            }
            else updateDisplay();
        }
        else {
            let secondNumberString = secondNumber.toString();
            if (secondNumberString.includes('.') == false) {
                secondNumber += '.';
                updateDisplay();
            }
            else updateDisplay();
        }
    }
};
let calculatePercentage = () => {
    memory *= 0.01;
    updateDisplay();
};
let updateDisplay = () => {
    if (!operator || !secondNumber) {
        document.getElementById('display').innerText = memory;
    }
    else {
        document.getElementById('display').innerText = memory + operator + secondNumber;
    }
};
let calculate = () => {
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
    secondNumber = null;
    operator = null;
    memory = result;
    console.log('Memory on equals: ' + memory);
    document.getElementById('display').innerText = memory;
};
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!operator) {
            if (memory != '0') {
                if (memory.length < 16) {
                    memory += button.value;
                    updateDisplay();
                }
                else {
                    updateDisplay();
                    console.log("Too.... many.... numbers.. arghh..");
                }
            };
            if (memory == '0') {
                memory = button.value;
                updateDisplay();
            };
        }
        else {
            if (secondNumber != null) {
                if (secondNumber == '0' && button.value == '0') {
                    updateDisplay();
                }
                else {
                    if (secondNumber.length < 16) {
                        secondNumber += button.value;
                        updateDisplay();
                    }
                    else {
                        updateDisplay();
                        console.log("Too.... many.... numbers.. arghh..");
                    }
                }
            }
            if (secondNumber == null) {
                secondNumber = button.value;
                updateDisplay();
            }
        }
    });
});
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (secondNumber == null) {
            operator = button.value;
        }
        else {
            calculate();
            operator = button.value;
        }
        console.log('New operator selected: ' + operator + ' ... ' + typeof operator);
        switch (operator) {
            case '/':
                document.querySelector('#divide').classList.add('myClass');
                document.querySelector('#multiply').classList.remove('myClass');
                document.querySelector('#subtract').classList.remove('myClass');
                document.querySelector('#add').classList.remove('myClass');
                break;
            case '*':
                document.querySelector('#multiply').classList.add('myClass');
                document.querySelector('#subtract').classList.remove('myClass');
                document.querySelector('#add').classList.remove('myClass');
                document.querySelector('#divide').classList.remove('myClass');
                break;
            case '-':
                document.querySelector('#subtract').classList.add('myClass');
                document.querySelector('#add').classList.remove('myClass');
                document.querySelector('#divide').classList.remove('myClass');
                document.querySelector('#multiply').classList.remove('myClass');
                break;
            case '+':
                document.querySelector('#add').classList.add('myClass');
                document.querySelector('#divide').classList.remove('myClass');
                document.querySelector('#multiply').classList.remove('myClass');
                document.querySelector('#subtract').classList.remove('myClass');
                break;
            default:
                break;
        }
    })
});
equalsButton.addEventListener('click', () => {
    if (!secondNumber) {
        console.log('Not enough numbers here...');
        return;
    }
    else {
        calculate();
        clearColors();
        updateDisplay();
    }
});
decimalButton.addEventListener('click', () => {
    addDecimal();
});
invertButton.addEventListener('click', () => {
    memory *= -1;
    updateDisplay();
});
clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});
percentButton.addEventListener('click', () => {
    calculatePercentage();
});
backspaceButton.addEventListener('click', () => {
    deleteDigit();
})

let addKeyboardNumber = (evt) => {
    if (!operator) {
        if (memory != '0') {
            if (memory.length < 16) {
                memory += evt.key;
                updateDisplay();
            }
            else {
                updateDisplay();
                console.log("Too.... many.... numbers.. arghh..");
            }
        };
        if (memory == '0') {
            memory = evt.key;
            updateDisplay();
        };
    }
    else {
        if (secondNumber != null) {
            if (secondNumber == '0' && evt.key == '0') {
                updateDisplay();
            }
            else {
                if (secondNumber.length < 16) {
                    secondNumber += evt.key;
                    updateDisplay();
                }
                else {
                    updateDisplay();
                    console.log("Too.... many.... numbers.. arghh..");
                }
            }
        };
        if (secondNumber == null) {
            secondNumber = evt.key;
            updateDisplay();
        };
    }
};
let addOperator = (evt) => {
    if (!secondNumber) {
        operator = evt.key;
        secondNumber = null;
    }
    else {
        calculate();
        operator = evt.key;
    }
    console.log('New operator selected: ' + operator + ' ... ' + typeof operator)
};

document.onkeydown = function (event) {
    evt = event || window.Event;
    console.log(evt.key)
    switch (evt.key) {
        case '0':
            addKeyboardNumber(evt);
            break;
        case '1':
            addKeyboardNumber(evt);
            break;
        case '2':
            addKeyboardNumber(evt);
            break;
        case '3':
            addKeyboardNumber(evt);
            break;
        case '4':
            addKeyboardNumber(evt);
            break;
        case '5':
            addKeyboardNumber(evt);
            break;
        case '6':
            addKeyboardNumber(evt);
            break;
        case '7':
            addKeyboardNumber(evt);
            break;
        case '8':
            addKeyboardNumber(evt);
            break;
        case '9':
            addKeyboardNumber(evt);
            break;
        case '-':
            document.querySelector('#subtract').classList.add('myClass');
            document.querySelector('#add').classList.remove('myClass');
            document.querySelector('#divide').classList.remove('myClass');
            document.querySelector('#multiply').classList.remove('myClass');
            addOperator(evt);
            break;
        case '+':
            document.querySelector('#add').classList.add('myClass');
            document.querySelector('#divide').classList.remove('myClass');
            document.querySelector('#multiply').classList.remove('myClass');
            document.querySelector('#subtract').classList.remove('myClass');
            addOperator(evt);
            break;
        case '*':
            document.querySelector('#multiply').classList.add('myClass');
            document.querySelector('#subtract').classList.remove('myClass');
            document.querySelector('#add').classList.remove('myClass');
            document.querySelector('#divide').classList.remove('myClass');
            addOperator(evt);
            break;
        case '/':
            document.querySelector('#divide').classList.add('myClass');
            document.querySelector('#multiply').classList.remove('myClass');
            document.querySelector('#subtract').classList.remove('myClass');
            document.querySelector('#add').classList.remove('myClass');
            addOperator(evt);
            break;
        case '%':
            calculatePercentage();
            break;
        case '.':
            addDecimal();
            break;
        case '=':
            if (!secondNumber) {
                return;
            }
            else {
                calculate();
                clearColors();
            }
            break;
        case 'Enter':
            if (!secondNumber) {
                return;
            }
            else {
                calculate();
                clearColors();
            }
            break;
        case 'Backspace':
            deleteDigit();
            break;
        case 'Delete':
            clear();
            updateDisplay();
            break;
        default:
            break;
    }
}