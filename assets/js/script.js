// Variable id's from page
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#startBtn");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");

// Quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // Hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // Toggle questions visability
  questionsEl.removeAttribute("class");

  // Timer start
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  getQuestion();
}


function getQuestion() {
  // Current question
  var currentQuestion = questions[currentQuestionIndex];

  // Update title
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // Clear out any old question choices
  choicesEl.innerHTML = "";

  // Loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // Create buttons for choices
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // Check if guess is wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // Subtract time
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // Display updated time
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }

  // Show feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // Next question
  currentQuestionIndex++;

  // Time check
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Stop timer
  clearInterval(timerId);

  // Show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hide questions
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // Update time
  time--;
  timerEl.textContent = time;

  // Check if time ran out
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // Get content of input box
  var name = nameEl.value.trim();

  if (name !== "") {
    // Get saved scores from localstorage, or set to empty array if there are no scores
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Format new score object
    var newScore = {
      score: time,
      name: name
    };

    // Save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Next page
    window.location.href = "scores.html";
  }
}

// Submit
submitBtn.addEventListener('click', saveHighscore);

// Start quiz
startBtn.addEventListener('click', startQuiz);
