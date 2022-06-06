const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = 'All done! Your final score is ' + mostRecentScore

username.addEventListener('keyup', function() {
    saveScoreBtn.disabled = !username.value
})

function saveHighScore (e) {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value,
    }

    highScores.push(score)

    highScores.sort(function(a,b) {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}