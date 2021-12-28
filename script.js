var startButtonEl = document.querySelector("#start-quiz");
var goBackButtonEl = document.querySelector("#scores-back");
var clearHighScoreEl = document.querySelector("#scores-clear");

var question1 = {
    question: 'The condition in an if/else statement is enclosed with ______.',
    answer0: '1. quotes',
    answer1: '2. curly brackets',
    answer2: '3. parenthesis',
    answer3: '4. square brackets',
    correct: 2,
};

var question2 = {
    question: 'Arrays in JavaScript can be used to store ______.',
    answer0: '1. numbers and strings',
    answer1: '2. other arrays',
    answer2: '3. booleans',
    answer3: '4. all of the above',
    correct: 3, 
};

var question3 = {
    question: 'String values must be enclosed within ______ when being assigned to variables.',
    answer0: '1. commas',
    answer1: '2. curly brackets',
    answer2: '3. quotes',
    answer3: '4. parenthesis',
    correct: 2, 
};

var question4 = {
    question: 'Commonly used data types DO Not include',
    answer0: '1. strings',
    answer1: '2. booleans',
    answer2: '3. alerts',
    answer3: '4. numbers',
    correct: 2,
};

var question5 = {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answer0: '1. JavaScript',
    answer1: '2. terminal/bash',
    answer2: '3. for loops',
    answer3: '4. console.log',
    correct: 3,
};

var allQuestions = [
    question1,
    question2,
    question3,
    question4,
    question5
];

var interval;
var questionNumber = 0;
var time = 0;
var maxTime = 60;
var score;
var initials = '';

function setInnerHTML(id, value) {
    var element = document.getElementById(id);
    element.innerHTML = value;
}

function checkAnswer(answer) {
    var question = allQuestions[questionNumber];
    if (answer === question.correct) {
      alert("success");
    } else {
      alert("fail");
    }
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

    var element = document.getElementById("quiz-question");
    element.innerHTML=question.question;

    var element = document.getElementById("quiz-answer-0");
    element.innerHTML=question.answer0;

    var element = document.getElementById("quiz-answer-1");
    element.innerHTML=question.answer1;

    var element = document.getElementById("quiz-answer-2");
    element.innerHTML=question.answer2;

    var element = document.getElementById("quiz-answer-3");
    element.innerHTML=question.answer3;

    var element = document.getElementById("quiz-response");
    element.innerHTML='';

    // attach a click handler for each possible answer

    var element = document.getElementById("quiz-answer-0");
    element.addEventListener("click", answer0);

    var element = document.getElementById("quiz-answer-1");
    element.addEventListener("click", answer1);

    var element = document.getElementById("quiz-answer-2");
    element.addEventListener("click", answer2);

    var element = document.getElementById("quiz-answer-3");
    element.addEventListener("click", answer3);
}

var submitButtonClicked = function() {
    var element = document.getElementById('quiz');
    element.style.display = 'block';
    var element = document.getElementById("welcome");
    element.style.display = 'none';
    nextQuestion();
};



startButtonEl.addEventListener("click", submitButtonClicked);

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


