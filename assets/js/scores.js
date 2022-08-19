function printScores() {
  // Get scores from localstorage or set to empty array
  var scores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // Sort high scores
  scores.sort(function(a, b) {
    return b.score - a.score;
  });

  // Display on page
  scores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.name + " - " + score.score;

    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

// Clear scores
function clearScores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
document.getElementById("clear").addEventListener('click', clearScores);


printScores();