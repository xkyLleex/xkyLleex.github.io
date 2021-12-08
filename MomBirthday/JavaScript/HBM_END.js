window.onload = function(){
    Canvas_Reset();
    IsComeFrom()
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

function IsComeFrom(){
    var send = location.search.replace('?', '');
    if(send == 'PassTheLevel_2'){
        document.getElementById('zh-Content').innerHTML = '嗨 媽媽 <br>感謝你，讓我知道什麼是母愛！<br>感謝你，讓我認識更多的家人！<br>感謝你，讓我出生在這個世界！<br><br>最近你因為New Father的事情，讓自己深陷壓力之中，<br>但是我還是希望你也要顧好自己，不要累壞了！<br><br>經歷人生大風大浪，累了不妨停下腳步<br>欣賞沿途漂亮風景，感受人生美麗之處<br><br>最後，不用太擔心我，我自己能顧好自己的<br><b style="color:rgb(207, 80, 80)">生日快樂</b>，媽媽(^3^)<br><img src="./Picture/cow.png">';
        document.getElementById('en-Content').innerHTML = "Hey Mom <br>Thank Mom for letting me know what maternal love is!<br>Thank Mom for letting me know a lot of family members!<br>Thank Mom for letting me be born in this world!<br><br>Recently you put yourself under pressure because 'New Father' are sick.<br>But I still hope that you also take care of yourself and don't be too tired!<br><br>Having been through many thick and thin in life, you might as well stop when you are tired<br>Enjoy the beautiful scenery along the way , feel the beauty of life<br><br>Finally, don't worry about me too much, I can take care of myself<br><b style='color:rgb(207, 80, 80)'>Happy Birthday!</b> Mom (^3^)<br></br>"
    }else{
        document.getElementById('zh-Content').innerHTML = '可以不要偷看嗎??';
        document.getElementById('en-Content').innerHTML = 'Can you stop peeking?';
    }
}
