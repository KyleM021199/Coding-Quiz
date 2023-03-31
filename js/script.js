//querySelectors
var pageOne = document.querySelector("#page-1");
var pageTwo = document.querySelector("#page-2");
var pageThree = document.querySelector("#page-3");
var pageFour = document.querySelector("#page-4");
var beginButton = document.querySelector(".begin-button");
var submitButton = document.querySelector("#submit-button")
var timerEl = document.querySelector(".timer");
var score = document.querySelector(".score");
var questionDiv = document.querySelector(".question-prompt");
var answersLi = document.querySelector(".answer-list");
var userNameEl = document.querySelector("#name");

// variables
var secondCount;
var questionNum = 1;
var quizEnded = false;
var finalScore = 0;
var timer;
var nextCounter = 0;
var correctAnswerCounter= 1;

//array for questions/answers
var quizQuestions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    answer : ["<script>","<javascript>","<js>"],
    rightAnswer: "<script>"}, 
{
    question: "Where is the correct place to insert a JavaScript?",
    answer : ["The <meta> section","The <body> section","The <button> section"],
    rightAnswer: "The <body> section"},

 {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answer : ["<script name = 'xxx.js'>","<script src ='xxx.js'>","<script href = 'xxx.js'>"],
    rightAnswer: "<script src ='xxx.js'>"},
 {
    question: "How do you create a function in JavaScript?",
    answer : ["function:myFunction()","function = myFunction()","function myFunction()"],
    rightAnswer: "function myFunction()"},
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
    pageFour.style.display = "none";
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
        timerEl.textContent = "Time: "+ secondCount;
        if(secondCount >= 0){

            if(quizEnded && secondCount >= 0){
                setScore();
                clearInterval(timer);
                quizEnd();
                checkRight();
            }
            
        }
        if(secondCount === 0){
            setScore();
            clearInterval(timer);
            quizEnd();
        }


    }, 1000);
}
//set the score in local storage
function setScore(){
    //timerEl.textContent = finalScore;
    score.textContent = secondCount;
    localStorage.setItem("endScore", secondCount);
    

}

function getScore(){
    var storedScore = JSON.parse(localStorage.getItem("endScore"));
    if (storedScore === null){
        secondCount = 0;
    } else {
        secondCount = storedScore;
    }
   score.textContent = secondCount;
}

 function setHighscore(){
// get userscore and name
var nameUser =userNameEl.value();

//Make a user object with user score and name
var userInfo ={
    userName: nameUser,
    userScore: secondCount,

};
//stringify object
var highscorer =JSON.stringify(userInfo);

localStorage.setItem("endScore", highscorer);

 }

function quizEnd(){
    pageTwo.style.display = "none";
    pageThree.style.display = "block";
//user types in preferred name and saved to the local storage
quizEnded = true;
beginButton.disabled = false;
setHighscore();
setScore();
}

function renderHighscore(){

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
pageFour.style.display = "none";
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




//reset the quiz via back button 
var backButton = document.querySelector(".back-button");

function resetQuiz(){
    secondCount = 50;
    renderQuestions(0);
    setScore();
   startQuiz();
}

backButton.addEventListener("click", resetQuiz);


