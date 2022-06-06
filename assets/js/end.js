// items to target
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
// getting high score
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// can only show top five high scores, so they can change
const MAX_HIGH_SCORES = 5

// text on page to show game is over and what final score is
finalScore.innerText = 'All done! Your final score is ' + mostRecentScore

// can't submit unless the username has a value
username.addEventListener('keyup', function() {
    saveScoreBtn.disabled = !username.value
})

function saveHighScore (e) {
    // doesn't automatically refresh
    e.preventDefault()

    // saving score information with name and score together to go to highscores page
    const score = {
        score: mostRecentScore,
        name: username.value,
    }

    // how the name and score get sent to the highscores page
    highScores.push(score)

    // how to sort the scores in order
    highScores.sort(function(a,b) {
        return b.score - a.score
    })

    // can delete lower scores so only top five show on highscores page
    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./index.html')
}