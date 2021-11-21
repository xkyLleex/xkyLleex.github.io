window.onload = function(){
    Canvas_Reset();
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
    script.src= 'JavaScript/Game.js';  //要載入的js
    head.appendChild(script); 
}