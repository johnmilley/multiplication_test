// Multiplication Practice
// version 0.2
// What's new?
//  - keypad for mobile
//  - 10 random q from array
//  - results board


// globals
let allPossibleEquations = []
let equations = []
let retries = []
let equation = []

// test global for keypad
let keyPadInput = ""

// stats globals
let totalCorrect = 0

// timer globals
let time = 15
let timer = ""  // for global interval timer

// GENERATE EQUATIONS
for (let i = 3; i <= 5; i++) {
    for (let j = 2; j <= 9; j++) {
        allPossibleEquations.push([i, j])
    }
}

// change totalQuestions to control how many q user sees
totalQuestions = 10

for (let i = 1; i <= totalQuestions; i++) {
    random_index = Math.floor(Math.random() * allPossibleEquations.length)

    current_equation = allPossibleEquations[random_index]

    equations.push(current_equation)

    // remove item from array
    allPossibleEquations.splice(random_index, 1)
}
/***************/

/*  GRAB HTML ELEMENTS */

const equationArea = document.querySelector('#equation-area')

const leftOperand = document.querySelector('#left')
const rightOperand = document.querySelector('#right')
const answerInput = document.querySelector("#answer")

const questionsRemaining = document.querySelector('#questions-remaining')

const playButton = document.querySelector('#play');

const timerArea = document.querySelector('#timer-area')
const timerElement = document.querySelector('#time-remaining')

const keyPadArea = document.querySelector('#keypad-area')

// const instructionsElement = document.querySelector('#instructions')

// results
const resultsArea = document.querySelector('#results')

const numberCorrectElement = document.querySelector('#number-correct')
const totalNumberOfQuestionsElement = document.querySelector('#total-number-of-questions')
const percentElement = document.querySelector('#percent')
const letterGradeElement = document.querySelector('#letter-grade')



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
        totalCorrect++
    } else {
        equationArea.style.backgroundColor = "#da4a4a";
        retries.push(equation)
        console.log(retries)
    }
    
    input = ""

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

    // first, check if there are new questions. if not, present results (for now)

    // move to function
    if (equations <= 0) {
        equationArea.classList.toggle('hidden')
        timerArea.classList.toggle('hidden')
        questionsRemaining.classList.toggle('hidden')
        keyPadArea.classList.toggle('hidden')

        numberCorrectElement.innerText = totalCorrect
        totalNumberOfQuestionsElement.innerText = totalQuestions

        let percent = ((totalCorrect / totalQuestions) * 100).toFixed(0)

        percentElement.innerText = `${percent}%`
        
        let letterGrade = ""

        if (percent >= 80) {
            letterGrade = 'A'
        } else if (percent >= 70) {
            letterGrade = 'B'
        } else if (percent >= 60) {
            letterGrade = 'C'
        } else if (percent >= 50) {
            letterGrade = 'D'
        } else {
            letterGrade = 'F'
        }

        letterGradeElement.innerText = letterGrade

        resultsArea.classList.toggle('hidden')
        
        clearInterval(timer)

        return
    }

    // RESET THINGS
    equationArea.style.backgroundColor = "white";
    questionsRemaining.innerText = `Questions remaining: ${equations.length}`
    keyPadInput = ""
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


// START the practice

playButton.addEventListener('click', () => {
    playButton.disabled = true
    timerElement.classList.toggle('hidden')
    playButton.classList.toggle('hidden')
    keyPadArea.classList.remove('hidden')
    answerInput.focus()
    newQuestion()
})


// KEYPAD Testing

const numberKeys = document.querySelectorAll('[data-key]')
const backspaceKey = document.querySelector('#backspace-key')
const enterKey = document.querySelector('#enter-key')

numberKeys.forEach(key => key.addEventListener('click', (e) => {
    console.log(e);
    // e.preventDefault() // not working for 'enter key'
    if (e.clientX !== 0) {  // means 'enter' was used to 'click' btn ... not great, but it works
        keyPadInput += e.target.getAttribute('data-key')
        console.log(keyPadInput)
        if (!answerInput.disabled) {
            answerInput.value = keyPadInput
            answerInput.focus()
        }
    }
}))

backspaceKey.addEventListener('click', () => {
    if (keyPadInput.length > 0) {
        keyPadInput = keyPadInput.slice(0, keyPadInput.length - 1)
        console.log(keyPadInput);
    }
    if (!answerInput.disabled) {
        answerInput.value = keyPadInput
        answerInput.focus()
    }
})

enterKey.addEventListener('click', (e) => {
    if (e.clientX !== 0) {  // means 'enter' was used to 'click' btn ... not great, but it works
        checkAnswer()
    }
})

// END KEYPAD functions



// LEFTOVERS

// equations = equations.splice(i, 1) // remove equation


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