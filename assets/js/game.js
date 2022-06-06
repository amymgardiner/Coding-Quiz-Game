// items to target
const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

// global variables
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let timeElapsed = 75
let questionCounter = 0
let availableQuestions = []

// array of questions to go through
let questions = [
    {
        question:'Commonly used data types Do Not include:',
        choice1:'strings',
        choice2:'booleans',
        choice3:'alerts',
        choice4:'numbers',
        answer: 3,
    },
    {
        question:'The condition in an if / else statement is enclosed with _____.',
        choice1:'quotes',
        choice2:'parenthesis',
        choice3:'curly brackets',
        choice4:'square brackets',
        answer: 2,
    },
    {
        question:'Arrays in JavaScript can be used to store _____.',
        choice1:'numbers and strings',
        choice2:'other arrays',
        choice3:'booleans',
        choice4:'all of the above',
        answer: 4,
    },
    {
        question:'String values must be enclosed within _____ when being assigned to variables.',
        choice1:'commas',
        choice2:'curly brackets',
        choice3:'quotes',
        choice4:'parenthesis',
        answer: 3,
    },
    {
        question:'A very useful tool used during development and debugging for printing content to the debugger is:',
        choice1:'console.log',
        choice2:'JavaScript',
        choice3:'terminal/bash',
        choice4:'for loops',
        answer: 1,
    }
]

// amount to decrease from score if there's a wrong answer, will not change
const SCORE_POINTS = 10
// total number of questions
const MAX_QUESTIONS = 5

// start game function linked to timer function and get new questions function, so the timer starts at the same time the questions come through
function startGame () {
    questionCounter = 0
    score = 75
    // array with spread operator to get values from questions array
    availableQuestions = [...questions]
    getNewQuestions ()
    startTimer ()
}

// timer function, with time going down
function startTimer () {
    scoreText.innerText = score
    interval = setInterval(function() {
        timeElapsed--;
        scoreText.innerText = timeElapsed;
        if(timeElapsed == 0) {
            clearInterval(interval)
            return window.location.href = "index.html"
        }
    },1000)
}

// new questions function
function getNewQuestions () {
    // if there are no more questions, go to the end page and save score to local storage
    // will keep track of score
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.href = "end.html"
    }

    questionCounter++
    // utilizing template literal to say question 1 of 5, 2 of 5, etc.
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // calculate what question is on and correspond with percentage of questions done to update the progress bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`


    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    // keep track of what question is on
    currentQuestion = availableQuestions[questionsIndex]
    // which question to ask and text to display
    question.innerText = currentQuestion.question

    choices.forEach(function(choice) {
        // reference data set in html to know what choices are being clicked
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}


choices.forEach(function(choice) {
    choice.addEventListener('click', function (e) {
        if(!acceptingAnswers) return
        acceptingAnswers = false

        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        // utilizing ternary operator, ? is then : is else, to toggle color for correct or incorrect answer
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        // remove points if question is wrong - remove 10 points - from const
        if(classToApply === 'incorrect') {
            decrementScore(SCORE_POINTS)
        }

        score = timeElapsed

        selectedChoice.parentElement.classList.add(classToApply)

        // time to show if answer was right or wrong before moving on to next question
        setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()
        },1000)
    })
})

// decrease score function linked to timer function
function decrementScore(num) {
    timeElapsed = timeElapsed - num
}

startGame()