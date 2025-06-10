let countdown=3
let totalTime=480
let timeLeft=480
let gameTimer
const backBtn=document.getElementById("back-btn")
const countdownEl=document.createElement("div")
countdownEl.id="countdown"
const heading=document.getElementById("heading")
const timerDiv = document.getElementById("timer")
const scoreDiv=document.getElementById("score")
//created elm should be appended to some elm of html
document.body.appendChild(countdownEl)
backBtn.style.display="none"
scoreDiv.style.display="none"
let interval=setInterval(() => {
heading.style.display="none"

countdownEl.textContent=countdown
countdown--
if(countdown<0){
    clearInterval(interval)
    heading.style.display="block"
   countdownEl.style.display = "none"
    backBtn.style.display="block"
    timerDiv.style.display="block"

    generatequestions()
    startGameTimer()
    showquestion()
}
},1000)
    
function startGameTimer() {
    timerDiv.innerHTML = `<i class="fa-regular fa-clock"></i> ${timeLeft} sec`

    gameTimer = setInterval(() => {
        timeLeft--
        timerDiv.innerHTML = `<i class="fa-regular fa-clock"></i> ${timeLeft} sec`

        if (timeLeft <= 0) {
            clearInterval(gameTimer)
            endGame()
        }
    }, 1000)
}

function endGame() {
    document.getElementById("options").innerHTML = "";
    questionEl.style.display="none" 
    heading.style.display="none"
    scoreDiv.innerHTML = `<h2>Time's Up!</h2>
        <p>Your score: ${score}/80</p>`
        scoreDiv.style.position="fixed"
        scoreDiv.style.top="50%"
        scoreDiv.style.left="50%"
        scoreDiv.style.transform="translate(-50%,-50%)"


}
let questions=[]
let currentquestion=0
let score=0

function generatequestions(){
    console.log("generatingg questions...")
for(let i=0;i<80;i++){

let num1 = Math.random() < 0.3 ? 
            parseFloat((Math.random() * 100).toFixed(2)) : 
            Math.floor(Math.random() * 100);
        
let num2 = Math.random() < 0.3 ? 
            parseFloat((Math.random() * 100).toFixed(2)) : 
            Math.floor(Math.random() * 100);

const operators = ['+', '-', '*', '/']
let operator = operators[Math.floor(Math.random() * 4)]
       
if(operator === '/' && num2 === 0) {
            num2 = Math.random() < 0.3 ? 
                parseFloat((Math.random() * 100 + 1).toFixed(2)) : 
                Math.floor(Math.random() * 100 + 1);
        }


let answer
switch(operator){
    case '+': answer=parseFloat((num1+num2).toFixed(2));break;
    case '-': answer=parseFloat((num1-num2).toFixed(2));break;
    case '*': answer=parseFloat((num1*num2).toFixed(2));break;
    case '/': answer=parseFloat((num1/num2).toFixed(2));
}

const options=[answer]
while(options.length<4){
    let offset
    if(Number.isInteger(num1)&&Number.isInteger(num2)){
         offset=Math.floor(Math.random()*4)+1
    }else{
        offset=Math.random() *4 +1
   }
     const variation=Math.random()< 0.5 ? -offset:offset
    if(variation<0 && answer<-variation){continue;}
    let wronganswer= parseFloat((answer+variation).toFixed(2))
   
        if(!options.includes(wronganswer)){
        options.push(wronganswer)
   
    }

}

//shuffle
for(let j=options.length-1;j>0;j--){
    let k=Math.floor(Math.random()*(j+1))
    const temp=options[j]
        options[j]=options[k]
        options[k]=temp
}

questions.push({
    ques:`${num1} ${operator} ${num2} = ?`,
    correctans:answer,
    options:options
})
}
console.log("Generated", questions.length, "questions")
}

const questionEl=document.getElementById("question")
const currentEl=document.getElementById("current")
const optionsDiv=document.getElementById("options")
   
function showquestion(){
    console.log("Showing question", currentquestion)
    if(!questions || questions.length === 0) {
        console.error("No questions available!")
        return;
    }
    const question=questions[currentquestion]
     questionEl.textContent=question.ques
     currentEl.textContent=currentquestion+1
    optionsDiv.innerHTML=""
    question.options.forEach(value => {
    const option = document.createElement("button")
    option.textContent=value
    option.style.display = "block"
    option.onclick= ()=>submitanswer(value)
    optionsDiv.appendChild(option)

 })
}


function submitanswer(selectedopt){
 const correctopt=questions[currentquestion].correctans
 if(parseFloat(selectedopt)===correctopt){
    score++
 }else{
    score--
 }
scoreDiv.style.display="block"
    
scoreDiv.innerHTML=`<i class="fa-solid fa-star"></i> ${score}`
currentquestion++
if(currentquestion<80){
    showquestion()
}else{
     clearInterval(gameTimer)
     questionEl.style.display="none" 
     heading.style.display="none"
    scoreDiv.innerHTML = `<h2>Game Complete!</h2>
        <p>Your score: ${score}/80</p>`
        scoreDiv.style.position="fixed"
        scoreDiv.style.top="50%"
        scoreDiv.style.left="50%"
        scoreDiv.style.transform="translate(-50%,-50%)"
        scoreDiv.style.padding="50px"
       
       
}
}
function restartGame(){
     heading.style.display="none"
      countdownEl.style.display="flex"
    scoreDiv.style.display="none"
    backBtn.style.display="none"
    timerDiv.style.display="none"
    scoreDiv.textContent=""
    currentEl.textContent=""
    questionEl.textContent=""
    timerDiv.textContent=""
    optionsDiv.innerHTML=""

    clearInterval(interval)
    clearInterval(gameTimer)

    countdown=3
    timeLeft=totalTime
    currentquestion=0
    score=0
    questions=[]

    
    interval=setInterval(() => {
heading.style.display="none"
countdownEl.textContent=countdown
countdown--
if(countdown<0){
    clearInterval(interval)
    heading.style.display="block"
    timerDiv.style.display="block"
    countdownEl.style.display = "none"
    backBtn.style.display="block"
    generatequestions()
    startGameTimer()
    showquestion()
}
},1000)
}
backBtn.onclick=function(){
    restartGame()
}