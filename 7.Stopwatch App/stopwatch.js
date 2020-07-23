$(function(){
   var appMode = false;
   var timeCounter = 0;
   var lapCounter = 0;
    var action;
    var lapNumber = 0;
    var timeMinutes , timeSeconds , timeCentiseconds , lapMinutes , lapSeconds , lapCentiseconds;
    
    hideshowbuttons("#startbutton","#lapbutton");
    
    $("#startbutton").click(function(){
        appMode = true;
        
        hideshowbuttons("#stopbutton","#lapbutton");
        
        startAction();
        
    });    
    
    
    $("#stopbutton").click(function(){
         hideshowbuttons("#resumebutton","#resetbutton");
        clearInterval(action);
        
    });
    
     $("#resumebutton").click(function(){
         hideshowbuttons("#stopbutton","#lapbutton");
        startAction();
        
    });

    $("#resetbutton").click(function(){
         hideshowbuttons("#stopbutton","#lapbutton");
        location.reload();
    });
    
     $("#lapbutton").click(function(){
        if(appMode==true){
            clearInterval(action);
            lapCounter=90;
            addLap();
            startAction();
        }
    });
    
    
    
    
    
    
    
    function hideshowbuttons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    function startAction(){
        action = setInterval(function(){
           timeCounter++;
            if(timeCounter==100*60*100){
                timeCounter=0;
            }
           lapCounter++;
            if(lapCounter==100*60*100){
                lapCounter=0;
            }
           updateTime();
        },10);
    }
    
    function updateTime(){
        timeMinutes = Math.floor(timeCounter/6000);
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;
        
        $("#timeminute").text(format(timeMinutes));
        $("#timeseconds").text(format(timeSeconds));    // 1 centiseconds = 100 sec 
        $("#timecentiseconds").text(format(timeCentiseconds));
        
        lapMinutes = Math.floor(lapCounter/6000);
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100;
        
        $("#lapminute").text(format(lapMinutes));
        $("#lapseconds").text(format(lapSeconds));
        $("#lapcentiseconds").text(format(lapCentiseconds));
    }
    
    function format(number){
        if(number < 10){
            return '0' + number;
        }
        else{
            return number;
        }
    }
    
    function addLap(){
        lapNumber++;
        var mylapdetails = '<div class="lap">' + 
            '<div class="laptimetitle">' + 'Lap' + lapNumber + '</div>'+ 
            '<div class="laptime">' + '<span>' + format(lapMinutes) + '</span>' 
                    + ':<span>' + format(lapSeconds) + '</span>'  
                    + ':<span>' + format(lapCentiseconds) + '</span>' +  '</div>'  +  
            '</div>';
        $(mylapdetails).prependTo('#laps');
    }
    
});