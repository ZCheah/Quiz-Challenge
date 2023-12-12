// define elements
var questionEl = document.getElementById("question");
var choiceEls = document.getElementsByClassName("choice");
var quizForm = document.getElementById("quizForm");
var resultP = document.getElementById("result");
var submitButton = document.getElementById("submit");

// initialize current question index
var currentQuestionIndex = 0;

// load current question
function loadCurrentQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    
    // set question text
    questionEl.textContent = currentQuestion.question;
    
    // load choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var currentChoice = currentQuestion.choices[i];
        choiceEls[i].textContent = currentChoice;
    }
}

// handle submit button click
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    // check selected answer
    var selectedAnswer = -1;
    for (var i = 0; i < choiceEls.length; i++) {
        if (choiceEls[i].checked) {
            selectedAnswer = i;
            break;
        }
    }
    
    // if no answer selected, show alert and return
    if (selectedAnswer === -1) {
        alert("Please select an answer before submitting.");
        return;
    }
    
    // check if selected answer is correct
    var currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        resultP.textContent = "Correct!";
    } else {
        resultP.textContent = "Incorrect.";
    }
    
    // go to next question if not all questions have been answered
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadCurrentQuestion();
    } else {
        quizForm.style.display = "none"; // hide quiz form
        resultP.style.display = "none"; // hide result paragraph
        submitButton.style.display = "none"; // hide submit button
    }
});

// start quiz
loadCurrentQuestion();