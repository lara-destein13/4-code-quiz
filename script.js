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


var startButtonEl = document.querySelector("#start-quiz");
var goBackButtonEl = document.querySelector("#scores-back");
var clearHighScoreEl = document.querySelector("#scores-clear");

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

function setDisplay(id, value) {
    var element = document.getElementById(id);
    element.style.display = value;
}

function setInnerHTML(id, value) {
    var element = document.getElementById(id);
    element.innerHTML = value;
}
  
function setOnClick(id, func) {
    var element = document.getElementById(id);
    element.onclick = func;
}

function setTime() {
    var text = `Time: ${time}`;
    setInnerHTML('head-time', text);
  }

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

function checkAnswer(answer) {
    var question = allQuestions[questionNumber];
    if (answer === question.correct) {
      gotItRight();
    } else {
      gotItWrong();
    }
}

function done() {
    setDisplay('quiz', 'none');
    setDisplay('done', 'block');
    window.clearInterval(interval);
}

function gotItRight() {
    setInnerHTML('quiz-response', 'Correct!');
    questionNumber += 1;
    if (questionNumber === allQuestions.length) {
      done();
    } else {
      nextQuestion();
    }
}
  
function gotItWrong() {
    time = time - 10;
    if (time < 0) {
      time = 0;
    }
    setInnerHTML('quiz-response', 'Wrong!');
}

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

function nextQuestion() {
    var question = allQuestions[questionNumber];

    // render the question and possible answers

    setInnerHTML("quiz-question", question.question);
    setInnerHTML("quiz-answer-0", question.answer0);
    setInnerHTML("quiz-answer-1", question.answer1);
    setInnerHTML("quiz-answer-2", question.answer2);
    setInnerHTML("quiz-answer-3", question.answer3);
    setInnerHTML("quiz-response", "");

    // attach a click handler for each possible answer

    setOnClick("quiz-answer-0", answer0);
    setOnClick("quiz-answer-1", answer1);
    setOnClick("quiz-answer-2", answer2);
    setOnClick("quiz-answer-3", answer3);
}

var startButtonClicked = function() {
    setDisplay('quiz', 'block');
    setDisplay('welcome', 'none');
    nextQuestion();
    time = maxTime;
    interval = window.setInterval(countDown, 1000);
};

startButtonEl.addEventListener("click", startButtonClicked);

var goBackButtonClicked = function() {
    alert("fooo");
}

goBackButtonEl.addEventListener("click", goBackButtonClicked);

var clearHighScoreClicked = function() {
    alert("foooo");
}

clearHighScoreEl.addEventListener("click", clearHighScoreClicked);


var element = document.getElementById("welcome");
element.style.display = 'block';

var element = document.getElementById("quiz");
element.style.display = 'none';

var element = document.getElementById("done");
element.style.display = 'none';

var element = document.getElementById("scores");
element.style.display = 'none';

function showHighScores() {
    setDisplay('welcome', 'none');
    setDisplay('quiz', 'none');
    setDisplay('done', 'none');
    setDisplay('scores', 'block');
    setOnClick('scores-back', showWelcome);
    setInnerHTML('scores-0', '&nbsp;');
    setInnerHTML('scores-1', '&nbsp;');
    setInnerHTML('scores-2', '&nbsp;');
}

function doneSubmit() {
    window.alert("hello");
}


setOnClick('head-high-score', showHighScores);

setOnClick('submit-initials', doneSubmit);