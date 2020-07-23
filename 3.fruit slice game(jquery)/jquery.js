var playing = false;
var score;
var trialsLeft;
var step;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
$(function(){
    
    //click on start reset button
  $("#startreset").click(function(){
      
      //are we playing?  //yes
    if(playing == true){
        
        //reload page
        location.reload();
        //no 
    }else{
        
        playing = true; //game initiated
        
        //set score to zero
        score=0;
        $("#scorevalue").html(score);
        
        //show trials left 
        $("#life").show();
        trialsLeft = 3;
        addHearts();
         
        //hide game over box
        $("#gameover").hide();
        
        //change start to reset 
        $("#startreset").html("Reset Game");
    
        //start sending fruits    
    startAction();
        
    }
    });  
   
$("#fruit1").mouseover(function(){
           score++;
        $("#scorevalue").html(score);  //update score
    /*document.getElementById("slicesound").play();*/
    $("#slicesound")[0].play(); //play sound
        
        //stop fruit 
       clearInterval(action);
    /*stopAction();
      */
        
        //slicing the fruit
    $("#fruit1").hide("explode", 500);
        
        //send new fruit
        setTimeout(startAction, 500);
/*    startAction();*/
        
        });
       
//functions
function addHearts(){
    $("#life").empty();
     for(i=0; i<trialsLeft; i++){
        $("#life").append('<img src="images/heart.png" class="space">');
    }
}
// start sending  fruits 
function startAction(){
    $("#fruit1").show();
chooseFruit(); // choose a random fruit
    
    //random position
$("#fruit1").css({'left' : Math.round(610*Math.random()),'top':-40}); 
       
 // define a random step
step = 1 + Math.round(5*Math.random());
    
    //2. move fruit down one step every 30 sec
    action = setInterval(function(){

$("#fruit1").css('top',$("#fruit1").position().top + step);
        
    //is fruit too low?
if($("#fruit1").position().top > $("#fruitsContainer").height()){
            //if trials left
    if(trialsLeft > 1){
        $("#fruit1").show();
chooseFruit(); // choose a random fruit
    //random position
$("#fruit1").css({'left' : Math.round(610*Math.random()),'top':-40}); 
       
 // define a random step
step = 1 + Math.round(5*Math.random());
            
    //reduce trial by 1
            trialsLeft --;
            
                //populate trialsleft box
            addHearts();
              
             }else{ //game over
playing = false; //not playing anymore
        $("#startreset").html("Start Game"); //change button to start game
        $("#gameover").show();
        $("#gameover").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
             $("#life").hide();
             stopAction();
               }
        }
  }, 10);
}
// generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(8*Math.random())] +'.png');
}
//stop dropping fruit
   function stopAction(){
       clearInterval(action);
       $("#fruit1").hide();
   }
});