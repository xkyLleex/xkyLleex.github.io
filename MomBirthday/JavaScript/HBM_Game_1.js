window.onload = function(){
    Canvas_Reset();
    var Display_Exp = false;
    document.getElementById('Display_ExpBtn').addEventListener('click', function(){
        if(Display_Exp){
            document.getElementById('Display_Exp').style.display = 'none';
            Display_Exp = false;
        }else{
            document.getElementById('Display_Exp').style.display = 'block';
            Display_Exp = true;
        }
    });
}

window.onresize = function(){
    Canvas_Reset();
}

function Canvas_Reset(){
    var Canvas_width = document.body.clientWidth * 0.9;
    var Canvas_height = document.body.clientHeight * 0.7;
    var str = '<canvas id="Game_Canvas" width="' + Canvas_width + '" height="' + Canvas_height + '"></canvas>';
    document.getElementById('Game_Canvas_Control').innerHTML = str;

    var head= document.getElementsByTagName('head')[0]; 
    var script= document.createElement('script'); 
    script.type= 'text/javascript'; 
    script.src= 'JavaScript/Game_1.js';  //要載入的js
    head.appendChild(script); 
}

