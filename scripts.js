const numberButtons = document.querySelectorAll('.operand')
const operatorButtons = document.querySelectorAll('.operator')
const decimalButton = document.querySelector('.decimal')
const clearButton = document.querySelector('.clear')
const invertButton = document.querySelector('.sign')
const percentButton = document.querySelector('.percent')
const displayed = document.querySelector('#display')
const displayedInt = parseInt(displayed.textContent)

let a, b;
let memory = displayedInt;

console.log(memory)

let addition = (a, b) => memory += a + b
let subtraction = (a, b) => memory += a - b
let multiplication = (a, b) => memory += a * b
let division = (a, b) => memory += a / b
let clearAll = () => {
    a = 0
    b = 0
    memory = 0
    updateDisplay()
}

let updateDisplay = () => {
    document.getElementById('display').innerText = memory;
}

let addDecimal = () => {
    memory += '.'
    console.log(memory)
    updateDisplay()
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        let buttonInt = parseInt(button.value)
        console.log(button.value)
        memory = buttonInt
        updateDisplay()
    })
})

invertButton.addEventListener('click', () => {
    memory *= -1;
    console.log(memory)
    updateDisplay()
})

clearButton.addEventListener('click', () => {
    clearAll()
    updateDisplay()
})

decimalButton.addEventListener('click', () => {
    addDecimal()
    updateDisplay()
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.value) {
            case "/":
                console.log('You pressed /')
                break;
            case "*":
                console.log('You pressed *')
                break;
            case "-":
                console.log('You pressed -')
                break;
            case "+":
                console.log('You pressed +')
                break;
        }
    })
})

// console.log(numberButtons)
// console.log(operatorButtons)
// console.log(displayedInt)

// addition(2, 3);
// console.log('Memory END: ' + memory)
// console.log('DisplayedInt END: ' + displayedInt)





// let displayedNumber = parseInt(displayedNumberString.textContent)

// console.log(displayedNumberString.textContent)
// console.log(displayedNumber)

// let storeNumber = (nr) => {
//     console.log('storing number before... ' + displayedNumber)
//     displayedNumber + nr
//     console.log('storing number after... ' + displayedNumber)
// }

// let memory = 0;

// let clear = () => {
//     a = 0
//     b = 0
//     d = 0
//     memory = 0
//     console.log('Memory cleared', a, b, d, memory)
// }


// let getNumber = () => {
//     let i = 0;
//     for (i = 0; i < buttonNumber.length; i++) {
//         let item = buttonNumber[Object.keys(buttonNumber)[i]]
//         console.log(item.value)
//     }
// }

// console.log(getNumber())



// buttonClear.addEventListener('click', clear);

// let getPressedNr = () => {
//     const buttonNumber = document.getElementsByClassName('operand');
//     for (let i = 0; i < buttonNumber.length; i++) {
//         console.log(buttonNumber[i].value)
//     }
// }

// getPressedNr();