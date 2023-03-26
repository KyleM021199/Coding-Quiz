//querySelectors
var beginButton = document.querySelector(".begin-button");
var timerEl = document.querySelector(".timer");
// variables
var secondCount;
var timeLoss;
var quizEnded = false;
var finalScore = 0;


//array for questions and answers
var questions = [];
var answers = [];

function startQuiz(){
    quizEnded = false;
    secondCount = 10;
    beginButton.disable = true;
    renderQuestions();
    renderAnswers();
    setTimer();

}
function init(){
    getScore();
}
//sets the timer    
function setTimer(){

    var timer = setInterval(function(){
        secondCount--;
        timerEl.textContent = secondCount;
        if(secondCount >= 0){
            if(quizEnded && secondCount > 0){
                setScore();
                clearInterval(timer);
                quizEnd();
            }
        }



    }, 1000);
}
function setScore(){
    timerEl.textContent = finalScore;
    localStorage.setItem("endScore", finalScore);

}
function getScore(){
    var storedScore = localStorage.getItem("endScore");
    if (storedScore === null){
        finalScore = 0;
    } else {
        finalScore = storedScore;
    }
   timerEl.textContent = finalScore;
}


function quizEnd(){

}

function renderAnswers(){

}
function renderQuestions(){

}

beginButton.addEventListener("click", startQuiz);
init();

//reset the quiz via back button 
var backButton = document.querySelector(".back-button");

function resetQuiz(){

}

backButton.addEventListener("click", resetQuiz);


