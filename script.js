/*
some notes on how this works
 
(1) Pages. Rather than having multiple html pages we have a single html page with
multiple sections. We show only one section at a time. We hide the others by setting the
display property to none.
 
(2) Rendering the question and answer pages. We use a single html section named quiz for
all of the questions. That section has a <h2>> tag that we use for the question and a link for
each of the possible answers.
 
As we move from question to question, we set the .innerHtml property on the <h2>
and <a> to set the text for the question and all the possible answers. And we also
update the onClick property for each of the <a> tags.

(3) We use an interval to keep track of the 60 second countdown. When the user starts
the quiz we create the interval using window.setInterval. This causes the function 
countDown to be called every 1000 milisecond (AKA 1 second). We use the variable time to 
keep track of the last time. We set time to 60 when we initialize the variable.

When function countDown sees that the variable time has reached 0, we cancel the interval
using window.clearInterval. 
 
*/

// create an object for each question and all possible answers
var question0 = {
    question: 'The condition in an if/else statement is enclosed with ______.',
    answer0: '1. quotes',
    answer1: '2. curly brackets',
    answer2: '3. parenthesis',
    answer3: '4. square brackets',
    correct: 2,
};

var question1 = {
    question: 'Arrays in JavaScript can be used to store ______.',
    answer0: '1. numbers and strings',
    answer1: '2. other arrays',
    answer2: '3. booleans',
    answer3: '4. all of the above',
    correct: 3, 
};

var question2 = {
    question: 'String values must be enclosed within ______ when being assigned to variables.',
    answer0: '1. commas',
    answer1: '2. curly brackets',
    answer2: '3. quotes',
    answer3: '4. parenthesis',
    correct: 2, 
};

var question3 = {
    question: 'Commonly used data types DO Not include',
    answer0: '1. strings',
    answer1: '2. booleans',
    answer2: '3. alerts',
    answer3: '4. numbers',
    correct: 2,
};

var question4 = {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answer0: '1. JavaScript',
    answer1: '2. terminal/bash',
    answer2: '3. for loops',
    answer3: '4. console.log',
    correct: 3,
};

// Put all of the questions into an array so that we can access them using the questionNumber
// variable below
var allQuestions = [
    question0,
    question1,
    question2,
    question3,
    question4
];

var interval = null;
var questionNumber = 0;
var time = 0;
var maxTime = 60;
var score;
var initials = '';

// a simple utility function that finds an element and sets its display property
function setDisplay(id, value) {
    var element = document.getElementById(id);
    element.style.display = value;
}

// a simple utility function that grabs an element by its id and sets it's contents
function setInnerHTML(id, value) {
    var element = document.getElementById(id);
    element.innerHTML = value;
}
  
// a simple utility function that grabs an element by its id and attaches a 
// click handler function
function setOnClick(id, func) {
    var element = document.getElementById(id);
    element.onclick = func;
}

// a function that writes the remaining time into a div
function setTime() {
    var text = `Time: ${time}`;
    setInnerHTML('head-time', text);
  }

// a function that is called every second. It updates the remaining time and writes the
// remaining time into the Dom. When the remaining time reaches 0 we clear the interval. 
function countDown() {
    time = time - 1;
    if (time <= 0) {
      window.clearInterval(interval);
      time = 0;
      setTime();
      done();
    } else {
      setTime();
    }
}

// a function that checks whether the selected answer is correct by checking the
// selected answer against the correct answer defined in the object
function checkAnswer(answer) {
    var question = allQuestions[questionNumber];
    if (answer === question.correct) {
      gotItRight();
    } else {
      gotItWrong();
    }
}

// a function that runs when either the user has answered all the questions successfully 
// or the user has run out of time. It hides the quiz section and reveals the done section.
function done() {
    score = time;
    setDisplay('quiz', 'none');
    setDisplay('done', 'block');
    window.clearInterval(interval);
}

// a function that runs when the correct answer is selected. When the correct answer
// is selected, the player views "Correct!" and the quiz jumps to the next question
function gotItRight() {
    setInnerHTML('quiz-response', 'Correct!');
    questionNumber += 1;
    if (questionNumber === allQuestions.length) {
      done();
    } else {
      nextQuestion();
    }
}
 
// a function that runs when the incorrect answer is selected. When the incorrect answer
// is selected, the player loses 10 seconds from the timer and views "Wrong!" 
function gotItWrong() {
    time = time - 10;
    if (time < 0) {
      time = 0;
    }
    setInnerHTML('quiz-response', 'Wrong!');
}

// Here we are calling the check answer function and passing in the selected answer.
function answer0() {
    checkAnswer(0);
}

function answer1() {
    checkAnswer(1);
}

function answer2() {
    checkAnswer(2);
}

function answer3() {
    checkAnswer(3);
}

 // Renders the question and possible answers. Also attaches a click handler 
 // for each possible answer.
function nextQuestion() {
    var question = allQuestions[questionNumber];

    setInnerHTML("quiz-question", question.question);
    setInnerHTML("quiz-answer-0", question.answer0);
    setInnerHTML("quiz-answer-1", question.answer1);
    setInnerHTML("quiz-answer-2", question.answer2);
    setInnerHTML("quiz-answer-3", question.answer3);
    setInnerHTML("quiz-response", "");

    setOnClick("quiz-answer-0", answer0);
    setOnClick("quiz-answer-1", answer1);
    setOnClick("quiz-answer-2", answer2);
    setOnClick("quiz-answer-3", answer3);
}

// a function that recognizes the start button being clicked. It reveals the quiz section and
// hides the welcome section. An interval is created that calls our countdown function that runs
//once every 1000 miliseconds (1 second).
var startButtonClicked = function() {
    setDisplay('quiz', 'block');
    setDisplay('welcome', 'none');
    nextQuestion();
    time = maxTime;
    interval = window.setInterval(countDown, 1000);
};

// a function that writes an empty array of scores into local storage. It then re renders the
// high score section.
function clearHighScore() {
    setAllScores([]);
    showHighScores();
}

// a function that reveals the welcome section and hides all other sections.
function showWelcome() {
    setDisplay('welcome', 'block');
    setDisplay('quiz', 'none');
    setDisplay('done', 'none');
    setDisplay('scores', 'none');
}

// a function that both sets the display for the high scores table and renders the view
// containing both the initials and scores of the top 3 players. 
function showHighScores() {
    setDisplay('welcome', 'none');
    setDisplay('quiz', 'none');
    setDisplay('done', 'none');
    setDisplay('scores', 'block');
    setOnClick('scores-back', showWelcome);
    setInnerHTML('scores-0', '&nbsp;');
    setInnerHTML('scores-1', '&nbsp;');
    setInnerHTML('scores-2', '&nbsp;');

    var scores = getAllScores();
    if (scores.length > 0) {
      var score0 = scores[0];
      var text0 = `1. ${score0.initials} - ${score0.score}`;
      setInnerHTML('scores-0', text0);
    }
    if (scores.length > 1) {
      var score1 = scores[1];
      var text1 = `2. ${score1.initials} - ${score1.score}`;
      setInnerHTML('scores-1', text1);
    }
    if (scores.length > 2) {
      var score2 = scores[2];
      var text2 = `3. ${score2.initials} - ${score2.score}`;
      setInnerHTML('scores-2', text2);
    }
}

// a function that pulls the stored top three high scores in local storage and renders them
function getAllScores() {
    var scores = window.localStorage.getItem('scores');
    console.log(`xxx scores: ${scores}`);
    if (scores === null) {
      scores = [];
    } else {
      scores = JSON.parse(scores);
    }
    return scores;
}

// a function that writes the scores to the local storage
function setAllScores(scores) {
    var scoresString = JSON.stringify(scores);
    window.localStorage.setItem('scores', scoresString);
}

// a function that gets the initials from the text input field and 
// stores it in our global variable "initials"
function getInitials() {
    var inputDiv = document.getElementById('done-input');
    initials = inputDiv.value;
    initials = initials.toUpperCase();
}

  // Get an array of scores from local storage.  Add a new score to the array of scores.
  // Sort the scores array in decreasing value. Remove low scores until the length of
  // the array is three or fewer. Save the scores in localStorage. Show high scores.
function updateHighScore() {
    var scores = getAllScores();
  
    var newScore = {
      initials: initials, 
      score: score,
    };

    scores.push(newScore);
  
    scores.sort((a, b) => (a.score < b.score) ? 1 : -1)
  
    while (scores.length > 3) {
      scores.pop();
    }
  
    setAllScores(scores);
    showHighScores();
}

// This function gets the intials from the user input field and calls
// updateHighScore.
function doneSubmit() {
    getInitials();
    if (initials.length === 0) {
      alert('Please enter your initials');
    } else {
      updateHighScore();
    }
}

// Hide all sections except for welcome
setDisplay('welcome', 'block');
setDisplay('quiz', 'none');
setDisplay('done', 'none');
setDisplay('scores', 'none');

// Attach our click handlers
setOnClick('start-quiz', startButtonClicked);
setOnClick('head-high-score', showHighScores);
setOnClick('submit-initials', doneSubmit);
setOnClick('scores-clear', clearHighScore);
