var playing = false;
 var score;
var action;
var timeremaining;
var correctanswer;

//if we click on the start/reset
document.getElementById("startreset").onclick=function(){
   
    //if we are playing
    if(playing == true){
    
    location.reload(); //reload page
    }else{//if we are not playing
    
 playing = true;//change mode to playing
         
 score = 0; //set score to 0

document.getElementById("scorevalue").innerHTML= score;
    
        //show countdown box

        show("time");
        timeremaining = 60;
        
        //hide game over box
        hide("gameover");

document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    
    //change button to reset
document.getElementById("startreset").innerHTML = "Reset Game";
       
        //start countdown
        startCountdown();
        
        //generate que and ans
        generateQA();
 }

}
//clicking on answer box
for(i=1;i<5;i++){
    document.getElementById("box"+ i).onclick=function(){
    if(playing==true){
        if(this.innerHTML==correctanswer){
            score++;
 document.getElementById("scorevalue").innerHTML=score;
            hide("wrong");
            show("correct");
            setTimeout(function(){
               hide("correct"); 
            }, 1000);
            //generate new question
            generateQA();
            
        }else{
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000);
            
        }
    }
}

}

//start counter
function startCountdown(){
    action = setInterval(function(){
      timeremaining -= 1;

document.getElementById("timeremainingvalue").innerHTML = timeremaining;
if(timeremaining == 0){//game over
    stopCountdown();
    show("gameover")
    
document.getElementById("gameover").innerHTML="<p>Game over</p><p>Your score is " + score + ".</p>";
    
    hide("time");
    hide("correct");
    hide("wrong");
    playing = false;
document.getElementById("startreset").innerHTML = "Start Game";
    }
    }, 1000);
}
//stop counter
function stopCountdown(){
    clearInterval(action);
}
//hide an element
function hide(Id){
document.getElementById(Id).style.display="none";
}
//show an element
function show(Id){
document.getElementById(Id).style.display="block";
}
//generate question and answers
function generateQA(){
 var x = 1+ Math.round(19*Math.random());
 var y = 1+ Math.round(19*Math.random());
    correctanswer = x*y;
 
document.getElementById("question").innerHTML= x + "x" + y;
    var correctposition = 1 + Math.round(3*Math.random());

document.getElementById("box"+correctposition).innerHTML = correctanswer; //fill one box with the correct answer
    
//fill other boxes with wrong answer
var answers = [correctanswer];
 for(i=1;i<5;i++){
     if(i != correctposition){
         var wronganswer;
         do{
        wronganswer = (1+ Math.round(19*Math.random()))*(1+ Math.round(19*Math.random())); 
         }while(answers.indexOf(wronganswer)>-1)
    
    document.getElementById("box"+i).innerHTML = wronganswer;
         answers.push(wronganswer);
     }
     }
 
}