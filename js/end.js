const username=document.getElementById('username');
const saveScoreBtn=document.getElementById('saveScoreBtn');

const mostRecentScore=localStorage.getItem('mostRecentScore');
const finalScore=document.getElementById('finalScore');

const highScores=JSON.parse(localStorage.getItem("highScores")) || [];

const max_high_scores=5;
console.log(JSON.parse(localStorage.getItem("highScores")));
finalScore.innerText=mostRecentScore;
username.addEventListener('keyup',()=>{
    //console.log(username.value);
     
    saveScoreBtn.disabled=!username.value;
});

saveHighScore=(e,res)=>{

    console.log("Clicked the save button");
    e.preventDefault()
    const score={
        score:mostRecentScore,
        name:username.value
    };
    highScores.push(score);
    
    highScores.sort((a,b)=>{
        return b.score-a.score;
    });

    highScores.splice(5);

    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.assign('../index.html');

};