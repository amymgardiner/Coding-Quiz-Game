const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
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

const MAX_QUESTIONS = 5

function startGame () {

}

function getNewQuestions () {

}