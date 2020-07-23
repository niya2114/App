$(function(){
   $(".slider").slider({
   min:3,
   max: 30,
  slide : function(event,ui){
      $(".circle").height(ui.value);
      $(".circle").width(ui.value);
  }
                       
});
    
    /*var canvas = document.getElementById("paint");
    var context = canvas.getContext("2d");
    
    context.beginPath();    // to set a new path
    context.lineWidth=40; // to set a line width
    context.strokeStyle= '#7f2bec'; // to set a color of the line
    context.lineCap="butt";      // to set the cap to the line(round,butt,square)
    context.lineJoin="bevel";    // to set the line join style(bevel,round,miter)
    context.moveTo(50,50);       // set the context points
    context.lineTo(200,200);      // draw a straight line from starting point to new position
    context.lineTo(400,100);      //draw another line
    context.stroke();             // make line visible
    */
    
    var paint = false;
    var paint_erase = "paint";
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext('2d');
    var container = $("#container");
     var mouse = {x:0,y:0}  ;  //coordinates of canvas
    
   
    if(localStorage.getItem('imgCanvas')!= null){
        var img = new Image();
        img.onload  = function(){
            ctx.drawImage(img,0,0);
        }
        img.src = localStorage.getItem('imgCanvas');
    };
    
    
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    
    container.mousedown(function(e){
        paint = true;
       ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
       ctx.moveTo(mouse.x,mouse.y);
    });
   
    
    
    container.mousemove(function(e){
         mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                ctx.strokeStyle= $("#paintColor").val()  ;
            }
            else{
                ctx.strokeStyle="white";
            }
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
    });
   
    
    container.mouseup(function(){
       paint  = false;
    });
    
     container.mouseleave(function(){
       paint  = false;
    });
    
    
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    
    
    $("#save").click(function(){
        if(typeof(localStorage)!= null){
          localStorage.setItem('imgCanvas', canvas.toDataURL());  
        }else{
            window.alert("your browser does not support local storage")
        }
    });
   
    
    
    $("#erase").click(function(){
        if(paint_erase=="paint"){
            paint_erase = "erase";
        }
        else{
            paint_erase = "paint";
        }
        $(this).toggleClass('eraseMode');
        });
    
   
    
    $("#paintColor").change(function(){
        $(".circle").css("background-color",$(this).val());
    });
    
    
   
    $(".slider").slider({
   min:3,
   max: 30,
  slide : function(event,ui){
      $(".circle").height(ui.value);
      $(".circle").width(ui.value);
      ctx.lineWidth = ui.value;
  }
                       
});
});