const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let timeElapsed = 0
let questionCounter = 0
let availableQuestions = []

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

const SCORE_POINTS = 10
const MAX_QUESTIONS = 5

function startGame () {
    questionCounter = 0
    score = 75
    availableQuestions = [...questions]
    getNewQuestions ()
    startTimer ()

}

function startTimer () {
    scoreText.innerText = score
    interval = setInterval(function() {
        timeElapsed++;
        scoreText.innerText = score - timeElapsed;
        if(timeElapsed > score) {
            clearInterval(interval)
            return window.location.assign('/index.html')
        }
    },1000)
}

function getNewQuestions () {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(function(choice) {
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

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'incorrect') {
            decrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()
        }, 1000)
    })
})

function decrementScore(num) {
    score -=num
    scoreText.innerText = score
}

startGame()