// Multiplication Practice
// version 0.1
// it works. sort of.


// globals
let equations = []
let retries = []
let equation = []

// timer globals
let time = 15
let timer = ""  // for global interval timer

// GENERATE EQUATIONS
for (let i = 3; i <= 5; i++) {
    for (let j = 2; j <= 9; j++) {
        equations.push([i, j])
    }
}

/*  GRAB HTML ELEMENTS */
const equationArea = document.querySelector('main')
const questionsRemaining = document.querySelector('#questions-remaining')
const leftOperand = document.querySelector('#left')
const rightOperand = document.querySelector('#right')
const playButton = document.querySelector('#play');
const timerElement = document.querySelector('#time-remaining')
const answerInput = document.querySelector("#answer")
const instructionsElement = document.querySelector('#instructions')
/******************/


/* CHECK ANSWER by pressing Enter or clicking button */

// listen for 'Enter' on input
answerInput.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        checkAnswer()
    }
})

//-------------  functions 
function checkAnswer(e) {
    answerInput.disabled = true;
    
    // calculate actual answer
    answer = parseInt(leftOperand.innerText) * parseInt(rightOperand.innerText)
    
    // compare answer to input
    if (answerInput.value == answer) {
        equationArea.style.backgroundColor = "lightgreen";
    } else {
        equationArea.style.backgroundColor = "#da4a4a";
        retries.push(equation)
        console.log(retries)
    }
    
    // resetTimer
    // FIX timer not restarting when time runs out... think about this
    // diagram it.
    // setTimer()

    // delay for new question
    setTimeout(newQuestion, 1500)
}

function setTimer(seconds=15) {
    if (timer) { 
        clearInterval(timer)
    }
    time = seconds
    timerElement.innerText = `${time}`
    timer = setInterval(countdown, 1000)
}

function newQuestion() {

    //todo logic for retries
    // if (equations.length <= 0) {

    //} else if (retries > 0) {
        // take questions from retries
    //} else {
        // display the answers to missed questions
    //}
    //
    //

    //todo RESET timer
    //  elsewhere - if timer reaches 0, add q to retries and run newQuestion()

    // RESET THINGS
    equationArea.style.backgroundColor = "white";
    questionsRemaining.innerText = `Questions remaining: ${equations.length}`
    answerInput.value = ""


    // CURRENT QUESTION
    i = [Math.floor(Math.random() * equations.length)]
    equation = equations[i] // current q
    
    // NEW ARRAY with current q REMOVED
    equations = equations.filter((q) => q != equation)

    // RANDOMIZE Left AND Right OPERANDS
    leftChoice = Math.floor(Math.random() * 2)
    left.innerText = equation[leftChoice]
    if (leftChoice == 0) {
        right.innerText = equation[1]
    } else {
        right.innerText = equation[0]
    }

    // re-enable input and set focus
    answerInput.disabled = false
    
    setTimer()
    answerInput.focus()
}

function countdown() {
    if (time == 0) {
        clearInterval(timer)
        equationArea.style.backgroundColor = "lightcoral";
        retries.push(equation)
        console.log(retries)
        
        // DELAY and then DISPLAY new q
        setTimeout(newQuestion, 1500)
    } else {
        time -= 1
        timerElement.innerText = `${time}`
    }
}


// play/pause


playButton.addEventListener('click', () => {
    playButton.disabled = true
    timerElement.classList.toggle('hidden')
    playButton.classList.toggle('hidden')
    instructionsElement.classList.toggle('hidden')
    answerInput.focus()
    newQuestion()
})



// LEFTOVERS

// equations = equations.splice(i, 1) // remove equation
