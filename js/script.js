//querySelectors
var beginButton = document.querySelector(".begin-button");
var timerEl = document.querySelector(".timer");
var score = document.querySelector(".score");
var questionDiv = document.querySelector(".question-prompt");
var answersLi = document.querySelector(".answer-list");

// variables
var secondCount;
var questionNum = 1;
var timeLoss = secondCount -= 10;
var quizEnded = false;
var finalScore = 0;
var timer;
var isRight = false;
var nextCounter = 0;

//array for questions/answers
var quizQuestions = [{
    question: "question1",
    answer : ["answer1","answer2","answer3"],
    rightAnswer: "answer1"}, 
{
    question: "question2",
    answer : ["answer1","answer2","answer3"],
    rightAnswer: "answer2"},

 {
    question: "question3",
    answer : ["answer1","answer2","answer3"],
    rightAnswer: "answer2"},
 {
    question: "question4",
    answer : ["answer1","answer2","answer3"],
    rightAnswer: "answer3"},
];
function init(){
    getScore();
}
function checkRight(string){
    console.log(string);
    console.log(quizQuestions[questionNum - 1].rightAnswer)
    if(string === quizQuestions[questionNum - 1].rightAnswer){
        console.log("is true");
        return true;
    } else {
    console.log("is false");
        timeLoss;
        return false;
    }


}

/* function checkWrong(answer){
    if(rightAnswer !== answer){
        isRight = false;
        timeLoss;
    }
} */
//starts the quiz
function startQuiz(){
    quizEnded = false;
    secondCount = 50;
    beginButton.disabled = true;
    renderQuestions(0);
    setTimer();

}

//sets the timer    
function setTimer(){

     timer = setInterval(function(){
        secondCount--;
        timerEl.textContent = secondCount;
        if(secondCount >= 0){

            if(quizEnded && secondCount >= 0){
                setScore();
                clearInterval(timer);
                quizEnd();
            }
            
        }
        if(secondCount === 0){
            setScore();
            clearInterval(timer);
            quizEnd();
        }

    }, 1000);
}
function setScore(){
    finalScore = secondCount;
    score.textContent = finalScore;
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
//user types in preferred name and saved to the local storage

quizEnded = true;
beginButton.disabled = false;
setScore();
}

function renderQuestions(index){
  questionDiv.textContent = quizQuestions[index].question;
  for(var i=0; i < quizQuestions[index].answer.length; i++){
  answersLi.children[i].textContent = quizQuestions[index].answer[i];
    }
}
function nextQuestion(){
    nextCounter++;
   if(nextCounter < 4){
    renderQuestions(nextCounter);
   } else{
    quizEnd();
   }
   
   
}






beginButton.addEventListener("click", startQuiz);
init();
checkRight();
// lets the answers have click elements
document.querySelectorAll('ul.answer-list li').forEach((item) => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        checkRight(item.textContent);
      nextQuestion();  
    })
});
    /* var answerList = document.getElementsByClassName("answer-list").getElementsByTagName('li');
    console.log(answerList);
    for(var i = 0; i < answerList.length; i++){
        answerList[i].addEventListener('click', nextQuestion(), false);
    } */




//reset the quiz via back button 
var backButton = document.querySelector(".back-button");

function resetQuiz(){
    
    setScore();
    finalScore = 0;
}

backButton.addEventListener("click", resetQuiz);


