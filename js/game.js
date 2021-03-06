const question=document.getElementById('question');
const choices=Array.from(document.getElementsByClassName('choice-text'));

const progressText=document.getElementById('progressText');
const scoreText=document.getElementById("score");

const progressBarFull=document.getElementById("progressBarFull");

let currentQuestion={};
let acceptingAnswers=false;

let score=0;
let questionCounter=0;
let availableQuestions=[];

// let questions = [
//     {
//         question: 'Inside which HTML element do we put the JavaScript??',
//         choice1: '<script>',
//         choice2: '<javascript>',
//         choice3: '<js>',
//         choice4: '<scripting>',
//         answer: 1,
//     },
//     {
//         question:
//             "What is the correct syntax for referring to an external script called 'xxx.js'?",
//         choice1: "<script href='xxx.js'>",
//         choice2: "<script name='xxx.js'>",
//         choice3: "<script src='xxx.js'>",
//         choice4: "<script file='xxx.js'>",
//         answer: 3,
//     },
//     {
//         question: " How do you write 'Hello World' in an alert box?",
//         choice1: "msgBox('Hello World');",
//         choice2: "alertBox('Hello World');",
//         choice3: "msg('Hello World');",
//         choice4: "alert('Hello World');",
//         answer: 4,
//     },
// ];

let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple')
.then((res) => {
    return res.json();
})
.then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question,
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
            formattedQuestion.answer - 1,
            0,
            loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
            formattedQuestion['choice' + (index + 1)] = choice;
        });

        return formattedQuestion;
    });
    startGame();
})
.catch((err) => {
    console.error(err);
});


const correct_bonus=10;
const max_questions=10;

startGame=()=>{
questionCounter=0;
score=0;
availableQuestions=[...questions];
getNewQuestion();
}

getNewQuestion=()=>{
    
    if(availableQuestions.length==0 && questionCounter>=max_questions){
    localStorage.setItem('mostRecentScore',score);
        return window.location.assign('end.html');
    }

questionCounter++;
progressText.innerText=`Question ${questionCounter}/${max_questions}`;
console.log(progressBarFull);
progressBarFull.style.width=`${(questionCounter/max_questions)*100}%`;


const questionIndex=Math.floor(Math.random()*availableQuestions.length);
currentQuestion=availableQuestions[questionIndex];
question.innerText=currentQuestion.question;

choices.forEach(choice=>{
    const number=choice.dataset['number'];
    choice.innerText=currentQuestion['choice'+number];
});
availableQuestions.splice(questionIndex,1);
acceptingAnswers=true;
};
var correct_audio=new Audio('../static/sound_effects/correct.mp3');
var wrong_audio=new Audio('../static/sound_effects/wrong.mp3');
choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers) return;

        acceptingAnswers=false;

        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset["number"];
        
        const classToApply=selectedAnswer==currentQuestion.answer?"correct":"incorrect";
        console.log(classToApply);
        if(classToApply==='correct'){
        incrementScore(correct_bonus);
        correct_audio.play();
        }
        else
        wrong_audio.play()
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },800);

       
    });
})

incrementScore=num=>{
    score+=num;
    scoreText.innerText=score;
};
startGame();

