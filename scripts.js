const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const invertButton = document.querySelector('.sign');
const percentButton = document.querySelector('#percent');
const equalsButton = document.querySelector('#equals');
const displayed = document.querySelector('#display');
const backspaceButton = document.querySelector('#backspace');
const displayedInt = parseInt(displayed.textContent);
const displayedString = displayed.textContent;

let memory = '';
let secondNumber = '';
let hasDecimal = false;
let completed = false;
let operator = '';
let result;
let operatorPressed = false;

console.log(memory);
console.log(typeof memory);

let addition = () => result = parseFloat(memory) + parseFloat(secondNumber);
let subtraction = () => result = parseFloat(memory) - parseFloat(secondNumber);
let multiplication = () => result = parseFloat(memory) * parseFloat(secondNumber);
let division = () => result = parseFloat(memory) / parseFloat(secondNumber);

let updateDisplay = () => {
    if (operator === "") {
        document.getElementById('display').innerText = memory;        
    }
    else {        
        document.getElementById('display').innerText = memory + operator + secondNumber;             
    }
}

clearButton.addEventListener('click', () => {
    location.reload();
})

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
             else if (memory === '0.') {
                memory = '0.' + button.value;
            }
            else {
                memory += button.value;
            }
            updateDisplay();
        }
        else {
            if (secondNumber === 0) {
                secondNumber = "0";
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
        if (secondNumber === 0 ) {
            operator = button.value;
            if (completed !== ""){
                secondNumber = '';
            }
            else {
                secondNumber = null;
            }            
        }
        else {
            
            operator = button.value;
        }
        console.log('New operator selected: ' + operator + ' ... ' + typeof operator)
        updateDisplay();
    })
})

decimalButton.addEventListener('click', () => {
    let memoryString = memory.toString();
    let secondNumberString = secondNumber.toString();
    if (operator === '') {
        if (!hasDecimal) {
            memory += '0.';
            hasDecimal = true;
            updateDisplay();
        } else if (!memoryString.includes('.')) {
            memory += '.';
            updateDisplay();
        }
    } else if (memory === '' || memory === '0') {
            memory = '0.';
        } else if (!memory.includes('.')) {
            memory += '.';
        } else {
        if (!secondNumberString.includes('.')) {
            secondNumber += '0.';
            updateDisplay();
        } else if (!hasDecimal) {
            secondNumber += '.';
            hasDecimal = true;
            updateDisplay();
        }
    }
    console.log(hasDecimal, completed)
})

invertButton.addEventListener('click', () => {
    memory *= -1;
    console.log(memory);
    updateDisplay();
})

percentButton.addEventListener('click', () => {
    memory *= 0.01;
    updateDisplay();
})

backspaceButton.addEventListener('click', () => {
    let display = document.getElementById("display");
    let currentValue = display.innerText;
    if (currentValue.length > 1) {
        display.innerText = currentValue.substring(0, currentValue.length - 1);
        memory = currentValue.substring(0, currentValue.length - 1);
        operator = '';
    } else {
        display.innerText = '0';
        memory = 0; 
        completed = false;
        operator = '';        
       
    }
})

document.addEventListener("keydown", function (event) {
    let key = event.key;
    if (key === 'Backspace') {
        if (operator === '' && secondNumber === '') {         
            memory = memory.slice(0, -1);
        } else if (secondNumber !== '') {           
            secondNumber = secondNumber.slice(0, -1);
        } else if (operator !== '') {
            operator = '';
        }
        updateDisplay();
    } 
    if (/^[0-9.]$/.test(key)) {        
        if (operator === '') {            
            if (key === '.') {               
                if (!memory.includes('.')) {
                    memory += '0.';
                }
            } else {               
                memory += key;
            }
        } else {            
            if (secondNumber === '' && key === '.') {               
                secondNumber += '0.';
            } else if (key !== '.') {                
                secondNumber += key;
            }
        }
        updateDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {       
        operator = key;
        updateDisplay();
    } else if (key === 'Enter') {       
        if (operator && secondNumber !== '') { 
            equalize();
        }
    } else if (key === '=') {
        if (operator && secondNumber !== '') { 
            equalize();
        }
    }
})

let equalize = () => {
    switch (operator) {
        case '/':
            if (parseFloat(secondNumber) === 0) {
                result = 0;
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
    if (completed === true) {
         secondNumber = 0;
    }
    else {
         secondNumber = "";
    }

    operator = '';
    memory = result;
    completed = false;
    console.log('Memory on equals: ' + memory);
    document.getElementById('display').innerText = memory;
    console.log(completed);
};


equalsButton.addEventListener('click', () => {
    if (operator && secondNumber !== '') { 
        equalize();
    }
});


function keyboard(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

