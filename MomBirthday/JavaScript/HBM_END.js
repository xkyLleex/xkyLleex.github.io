window.onload = function(){
    Canvas_Reset();
}

window.onresize = function(){
    Canvas_Reset();
}

function Canvas_Reset(){
    var str = '<canvas id="Firework_Canvas" width="' + document.body.clientWidth + '" height="' + document.body.clientHeight + '"></canvas>';
    document.getElementById('Canvas_Control').innerHTML = str;

    var head= document.getElementsByTagName('head')[0]; 
    var script= document.createElement('script'); 
    script.type= 'text/javascript'; 
    script.src= 'JavaScript/Firework.js';  //要載入的js
    head.appendChild(script); 
}