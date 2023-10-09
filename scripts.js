const result = document.querySelector('#result'),
      expression = document.querySelector('#expression'),
      num = document.querySelectorAll('.number:not(.equals)'),
      operation = document.querySelectorAll('.operation'),
      equals = document.querySelector('.equals'),
      clear = document.querySelector('#clear'),
      ce = document.querySelector('#ce');
let ex = ''; // the expression string to be eval'd
let arg;
let operator = '';
let secondNumber = '';
result.innerHTML = '0';




function clickN() { // when we click on a number
  if(!ex || typeof(ex) === 'number' || ex === '0') {
    expression.innerHTML = this.id;
    ex = this.id;
  } else {
    expression.innerHTML += this.id;
    ex += this.id;
  }
  result.innerHTML = ex.split(/\/|\*|\+|-|=/).pop();
  checkLength(result.innerHTML);
};

function clickO() { // when we click on an operation
  if(!ex) {
    return;
  }
  ex = ex.toString().replace(/=/, '');
  if (ex.match(/\/|\*|\+|-|=/)) {
    ex = eval(ex).toString();
  } 
  expression.innerHTML = expression.innerHTML.replace(/=/, '') + this.id;
  ex += this.id;
  result.innerHTML = this.id;
};



Array.from(num).forEach(function(element) { // assign appropriate function to all numbers and operations
      element.addEventListener('click', clickN);
    });

Array.from(operation).forEach(function(element) {
      element.addEventListener('click', clickO);
    });


// clear last entry on click
ce.addEventListener('click', () => {
  if (!expression.innerHTML.match(/=$/)) {
    
    expression.innerHTML = doCE(expression.innerHTML);
    ex = doCE(ex); 
    result.innerHTML = 0;
    expression.innerHTML = 0;
    
    function doCE(arg) {
      arg = arg.split(/([\/\*\+\-\=])/g);
      arg.splice(-1, 1);
      return arg.join('');
    }
  }
})

backspace.addEventListener('click', () => {
    let display = document.getElementById("result");
    let currentValue = result.innerText;
    if (currentValue.length > 1) {
        result.innerText = currentValue.substring(0, currentValue.length - 1);
        expression.innerText = currentValue.substring(0, currentValue.length - 1);
        ex = currentValue.substring(0, currentValue.length - 1);
        operator = '';
    } else {
        result.innerText = '0';
        expression.innerText = '0';
        ex = 0; 
        completed = false;
        operator = '';        
       
    }
})

sign.addEventListener('click', () => {
    ex *= -1;
    ex = String(ex);
    console.log(ex);
    result.innerHTML = trim12(ex);
    expression.innerHTML = trim12(ex);
})

percent.addEventListener('click', () => {
    ex *= 0.01;
    result.innerHTML = trim12(ex);
    expression.innerHTML = trim12(ex);
})

// calculate the whole thing
equals.addEventListener('click', ()=> {
  if (!ex) {
    result.innerHTML = '0';
  } else {
    ex = eval(ex);
    expression.innerHTML += '=';
    result.innerHTML = trim12(ex);
  }
})

function checkLength(arg) { // if we enter a number that's too long 
  if (arg.toString().length > 14) {
    expression.innerHTML = 'number too long'.toUpperCase();
    result.innerHTML = '0';
    ex = '0';
  } 
}

function trim12(arg) { // if we calculate a number that's too long
  if (arg.toString().length > 14) {
    ex = parseFloat(arg.toPrecision(12));
    if (ex.toString().length > 14) { 
      ex = ex.toExponential(9);
    };
    return ex;
  } else {
    return arg;
  }
}

document.addEventListener("keydown", function (event) {
    let key = event.key;
    if (key === 'Backspace') {
        if (ex === '') {
            ex = ex.slice(0, -1);
        } else if (secondNumber !== '') {
            secondNumber = secondNumber.slice(0, -1);
        } else if (operator !== '') {
            expression.innerHTML = expression.innerHTML.slice(0, -1);
            result.innerHTML = result.innerHTML.slice(0, -1);
        }
    }  
    if (/^[0-9.]$/.test(key)) {        
        if (operator === '') {            
            if (key === '.') {               
                if (!ex.includes('.')) {
                    ex += '0.';
                }
            } else {               
                ex += key;
            }
        } else {            
            if (secondNumber === '' && key === '.') {               
                secondNumber += '0.';
            } else if (key !== '.') {                
                secondNumber += key;
            }
        }
        result.innerHTML = ex.split(/\/|\*|\+|-|=/).pop();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {       
        operator = key;
        expression.innerHTML += key;
        ex += key;
        result.innerHTML = key;
    } else if (key === 'Enter' || key === '=') {       
        if (operator && secondNumber !== '') { 
            // Ваш код для вычисления результата
        }
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



