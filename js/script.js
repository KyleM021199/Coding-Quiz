//querySelectors
var pageOne = document.querySelector("#page-1");
var pageTwo = document.querySelector("#page-2");
var pageThree = document.querySelector("#page-3");
var beginButton = document.querySelector(".begin-button");
var timerEl = document.querySelector(".timer");
var score = document.querySelector(".score");
var questionDiv = document.querySelector(".question-prompt");
var answersLi = document.querySelector(".answer-list");
var userNameEl = document.querySelector("#user-name");

// variables
var secondCount;
var questionNum = 1;
//var timeLoss = secondCount -= 10;
var quizEnded = false;
var finalScore = 0;
var timer;
var nextCounter = 0;
var correctAnswerCounter= 1;

//array for questions/answers
var quizQuestions = [{
    question: "question1",
    answer : ["answer1-1","answer2-1","answer3-1"],
    rightAnswer: "answer1-1"}, 
{
    question: "question2",
    answer : ["answer1-2","answer2-2","answer3-2"],
    rightAnswer: "answer2-2"},

 {
    question: "question3",
    answer : ["answer1-3","answer2-3","answer3-3"],
    rightAnswer: "answer2-3"},
 {
    question: "question4",
    answer : ["answer1-4","answer2-4","answer3-4"],
    rightAnswer: "answer3-4"},
];
function init(){
    getScore();
}
function checkRight(clicked){
    
    for(var i=0; i < 4; i++){
    console.log(clicked);
    if(clicked === quizQuestions[questionNum-1].rightAnswer){
        
        console.log("is true");
        correctAnswerCounter++;
        return true;
    } else {
    console.log("is false");
    secondCount -= 10;
        correctAnswerCounter++;
        return false;
        }


    }
}
//starts the quiz
function startQuiz(){

    pageOne.style.display = "none";
    pageTwo.style.display = "block";
    pageThree.style.display = "none";
    if(secondCount <=0){
        secondCount = 50;
    }
    quizEnded = false;
    beginButton.disabled = true;
    renderQuestions(0);
    setTimer();

}

//sets the timer    
function setTimer(){

     timer = setInterval(function(){
        secondCount--;
        timerEl.textContent = "Seconds left: "+ secondCount;
        if(secondCount >= 0){

            if(quizEnded && secondCount >= 0){
                setScore();
                clearInterval(timer);
                quizEnd();
                checkRight();
            }
            
        }else if(secondCount === 1){
            secondCount--;
        timerEl.textContent = "Second left: "+ secondCount;

        }
        if(secondCount === 0){
            setScore();
            clearInterval(timer);
            quizEnd();
        }


    }, 1000);
}
function setScore(){
    //timerEl.textContent = finalScore;
    score.textContent = secondCount;
    localStorage.setItem("endScore", secondCount);
    

}
function getScore(){
    var storedScore = localStorage.getItem("endScore");
    if (storedScore === null){
        secondCount = 0;
    } else {
        secondCount = storedScore;
    }
   score.textContent = secondCount;
   //timerEl.textContent = finalScore;
}


function quizEnd(){
    pageTwo.style.display = "none";
    pageThree.style.display = "block";
//user types in preferred name and saved to the local storage
/* userNameEl.addEventListener('keydown', function (event) {
    // Access value of pressed key with key property
    var key = event.key.toLowerCase();
    var alphabetNumericCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789 '.split(
      ''
    );
    if (alphabetNumericCharacters.includes(key)) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].textContent += event.key;
        }
      }
    }); */

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





pageOne.style.display = "block";
pageTwo.style.display = "none";
pageThree.style.display = "none";
beginButton.addEventListener("click", startQuiz);
init();
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
    secondCount = 0;
    // console.log(finalScore);
    // console.log(secondCount);
    setScore();
   
}

backButton.addEventListener("click", resetQuiz);


