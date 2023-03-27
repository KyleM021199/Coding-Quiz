//querySelectors
var beginButton = document.querySelector(".begin-button");
var timerEl = document.querySelector(".timer");
//createElement
var answerslistEl = document.createElement("ol")
var answerOne = document.createElement("li");
var answerTwo = document.createElement("li");
var answerThree = document.createElement("li");
// variables
var secondCount;
var timeLoss;
var quizEnded = false;
var finalScore = 0;
var isRight = false;


//array for questions/answers
var quizQuestions = [{
    question: "question1",
    answer : ["answer1","answer2","answer3"],
    rightAnswer: 1
}, 
{
    question: "question2",
    answer : ["answer1","answer2","answer3"],
    rightAnswer: 1
},

 {
    question: "question3",
    answer : ["answer1","answer2","answer3"],
    rightAnswer: 1},
 {
    question: "question4",
    answer : ["answer1","answer2","answer3"],
    rightAnswer: 1},
];


function startQuiz(){
    quizEnded = false;
    secondCount = 60;
    beginButton.disable = true;
    renderQuestions();
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

beginButton.disabled = false;
setScore();
}

function renderQuestions(){
    

}

function checkRight(answer){

    if(rightAnswer === answer){
        isRight = true;
    }


}

function checkWrong(answer){
    if(rightAnswer !== answer){
        isRight = false;
        secondCount -= 10;
    }
}
beginButton.addEventListener("click", startQuiz);
init();

//reset the quiz via back button 
var backButton = document.querySelector(".back-button");

function resetQuiz(){
    finalScore = 0;
    setScore();
}

backButton.addEventListener("click", resetQuiz);


