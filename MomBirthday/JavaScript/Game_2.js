var canvas = document.getElementById('Game_Canvas');
var context = canvas.getContext('2d');
// player status
var Play_Continue_GO = 0;   // play = 0, continue = 1, go = 2, lose = 3, win = 4;
var H_BigThen_W = false;
var IsMouseDown = false;
var IsKeyDown = false;
var mouse = {x:0, y:0};
// game parameter
var time = 0
var score = 0;
// time
var IsTimeContinue = false;
var Sum_Time = 0;

var Canvas_width = canvas.getBoundingClientRect().width;
var Canvas_height = canvas.getBoundingClientRect().height;

// Charactor Data
var C_Data = {
    pos_x: 50,                  // Charactor Position X
    pos_y : Canvas_height / 2,    // Charactor Position Y
    Width: 60,                  // Charactor Width
    Height: 60                  // Charactor Height
}; 

// Circle Data
var CircleData = {
    Circle_r: Canvas_width / 8,             // Circle radius
    CircleCenter_X: Canvas_width * 4 / 5,   // Circle Center X position
    CircleCenter_Y: Canvas_height / 2,      // Circle Center Y position
    CircleSpeed: 1,                         // Circle Speed
    CircleStep: 0,                          // Now Circle Step
    AllStep: 120,                           // All Circle Step
    CircleRotate: 2 * Math.PI / 120         // The Circle have 60 step
}

if(Canvas_width < Canvas_height){
    H_BigThen_W = true;
    C_Data.Width = 28;
    C_Data.Height = 28;
    C_Data.pos_x = 25;
    CircleData.AllStep = 60;
    CircleData.CircleRotate = 2 * Math.PI / 60;
}

C_Data.pos_y -= C_Data.Height / 2;

// Arrow Data
var ArrowList = [];

// --- Draw Button Function ---
function radiusRect(x, y, width, height, radius, color) {
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(x, y + radius);
    context.lineTo(x, y + height - radius);
    context.quadraticCurveTo(x, y + height, x + radius, y + height);
    context.lineTo(x + width - radius, y + height);
    context.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    context.lineTo(x + width, y + radius);
    context.quadraticCurveTo(x + width, y, x + width - radius, y);
    context.lineTo(x + radius, y);
    context.quadraticCurveTo(x, y, x, y + radius);
    context.closePath();
    context.stroke();
    context.fill();
}

function Play_Button(){
    radiusRect(Canvas_width / 2 - 100, Canvas_height / 2 + 50, 200, 100, 5, '#BBBBBB');
    context.font = "30px Arial";
    context.fillStyle = "Blue";
    context.textAlign = "center";
    context.fillText("Play", Canvas_width / 2, Canvas_height / 2 + 110);
}
Play_Button();

function Continue_Button(){
    radiusRect(Canvas_width / 2 - 100, Canvas_height / 2 + 50, 200, 100, 5, '#888888');
    context.font = "30px Arial";
    context.fillStyle = "Green";
    context.textAlign = "center";
    context.fillText("Continue", Canvas_width / 2, Canvas_height / 2 + 110);
}

function Retry_Button(){
    radiusRect(Canvas_width / 2 - 100, Canvas_height / 2 + 50, 200, 100, 5, '#666666');
    context.font = "30px Arial";
    context.fillStyle = "Orange";
    context.textAlign = "center";
    context.fillText("Try Again?", Canvas_width / 2, Canvas_height / 2 + 110);
}

function Win_Button(){ 
    radiusRect(Canvas_width / 2 - 100, Canvas_height / 2 + 50, 200, 100, 5, '#333333');
    context.font = "30px Arial";
    context.textAlign = "center";
    context.fillStyle = "#09F";
    context.fillText("Win !!!", Canvas_width / 2, Canvas_height / 2 - 100);
    context.fillStyle = "AQUA";
    context.fillText("NextLevel", Canvas_width / 2, Canvas_height / 2 + 110);
}

// --- Mouse Event & Touch Event ---
function EventDown(e){
    // get mouse location
    if(H_BigThen_W){
        mouse = {
            x:e.targetTouches[0].pageX - canvas.getBoundingClientRect().left,
            y:e.targetTouches[0].pageY - canvas.getBoundingClientRect().top
        };
    }else{
        mouse = {x:e.offsetX, y:e.offsetY};
    }
    // player status
    if(Play_Continue_GO == 2){          // when player is playing
        if(mouse.x >= 10 && mouse.x <= 60 && mouse.y >= 10 && mouse.y <= 60){
            Play_Continue_GO = 1;
        }else{
            IsMouseDown = true;
        }
    }else if(Play_Continue_GO == 3){    // when player lose
        var x = Canvas_width / 2 - 100;
        var y = Canvas_height / 2 + 50;
        if(mouse.x >= x && mouse.x <= x + 200 && mouse.y >= y && mouse.y <= y + 100){
            Sum_Time = 0;
            Now_X_Position = 0;
            score = 0;
            IsMouseDown = false;
            IsKeyDown = false;
            Play_Continue_GO = 2;
            ArrowList = [];
        }
    }else if(Play_Continue_GO == 4){    // when player win
        var x = Canvas_width / 2 - 100;
        var y = Canvas_height / 2 + 50;
        if(mouse.x >= x && mouse.x <= x + 200 && mouse.y >= y && mouse.y <= y + 100){
            
        }
    }else{                              // when player is not playing
        var x = Canvas_width / 2 - 100;
        var y = Canvas_height / 2 + 50;
        if(mouse.x >= x && mouse.x <= x + 200 && mouse.y >= y && mouse.y <= y + 100){
            Play_Continue_GO = 2;
        }
    }
}

function EventMove(e){
    if(H_BigThen_W){
        mouse = {
            x:e.targetTouches[0].pageX - canvas.getBoundingClientRect().left,
            y:e.targetTouches[0].pageY - canvas.getBoundingClientRect().top
        };
    }else{
        mouse = {x:e.offsetX, y:e.offsetY};
    }
}

function EventUp(e){
    IsMouseDown = false;
}

if(H_BigThen_W){
    canvas.addEventListener('touchstart', EventDown)
    canvas.addEventListener('touchmove',EventMove);
    canvas.addEventListener('touchend', EventUp);
    canvas.addEventListener('touchcancel', EventUp);
}else{
    canvas.addEventListener('mousedown', EventDown)
    canvas.addEventListener('mousemove',EventMove);
    canvas.addEventListener('mouseup', EventUp);
}
    
// --- KeyBoard Event ---
window.addEventListener('keydown', function(e){
    if(e.keyCode == 32){ // 32 = space
        IsKeyDown = true;
    }
});

window.addEventListener('keyup', function(e){
    IsKeyDown = false;
});


// --- Frame ---

// Every Frame Function
function Timer(t){
    if(Play_Continue_GO == 2){          // when player playing
        if(H_BigThen_W){
            if(score >= 100)
                Play_Continue_GO =  4;
        }else{
            if(score >= 200)
                Play_Continue_GO =  4;
        }
            
        
        canvas.width = canvas.width; // clear frame
        // --- Top Text
        if(!IsTimeContinue){ // Time debug
            time = t;
            IsTimeContinue = true;
        }
        TopText(t - time + Sum_Time);

         // --- Charactor
        if(IsMouseDown || IsKeyDown){
            var arrow = {
                pos_X: 70,
                IsInsert: false,
                CircleStep: CircleData.AllStep / 2
            }
            ArrowList.push(arrow);
            IsMouseDown = false;
            IsKeyDown = false;
        }
        
        Charactor();
        Circle_Arrow_Draw();
        if(H_BigThen_W)
            CircleData.CircleSpeed = 0.5 + score / 10;
        else
            CircleData.CircleSpeed = 1 + score / 15;
    }else if(Play_Continue_GO == 3){    // when player lose
        if(IsTimeContinue){
            Sum_Time += t - time;
            Retry_Button();
            IsTimeContinue = false;
        }
    }else if(Play_Continue_GO == 4){    // when player win
        if(IsTimeContinue){
            Sum_Time += t - time;
            Win_Button();
            IsTimeContinue = false;
        }
    }else if(Play_Continue_GO == 1){    // when player Stop
        if(IsTimeContinue){
            canvas.width = canvas.width;
            Sum_Time += t - time;
            TopText(Sum_Time);
            Continue_Button();
            IsTimeContinue = false;
        }
    }
    
    requestAnimationFrame(Timer);
}
requestAnimationFrame(Timer);

// Top Text Draw
function TopText(t){
    if(Play_Continue_GO == 2){
        radiusRect(10, 10, 50, 50, 5, '#BBBBBB');
        context.font = "30px Arial";
        context.fillStyle = "red";
        context.fillText("||", 27, 45);
    }
    if(H_BigThen_W){
        context.font = "20px Arial";
        context.fillStyle = "green";
        context.fillText('Time:' + (t / 1000).toFixed(2), 100, 25);
        context.fillStyle = "blue";
        context.fillText("SCORE:" + score, 100, 55);
    }else{
        context.font = "30px Arial";
        context.fillStyle = "green";
        context.fillText('Time:' + (t / 1000).toFixed(2), 100, 45);
        context.fillStyle = "blue";
        context.fillText("SCORE:" + score, Canvas_width - 200, 45);
    }
}

// Charactor Draw
function Charactor(){
    context.fillStyle = "orange";
    context.fillRect(C_Data.pos_x, C_Data.pos_y, C_Data.Width, C_Data.Height);
    base_image = new Image();
    base_image.src = 'Picture/cow.png';
    context.drawImage(base_image, C_Data.pos_x, C_Data.pos_y, C_Data.Width, C_Data.Height);
}

function Circle_Arrow_Draw(){
    // Outside
    context.beginPath();
    context.arc(CircleData.CircleCenter_X, CircleData.CircleCenter_Y, CircleData.Circle_r, 0, Math.PI * 2, false);
    context.fillStyle = "black";
    context.stroke();
    context.fill();
    context.restore();
    context.save();
    
    // Inside
    context.translate(CircleData.CircleCenter_X, CircleData.CircleCenter_Y);
    context.rotate(CircleData.CircleRotate * CircleData.CircleStep);
    context.translate(CircleData.Circle_r * 3 / 5, 0);
    context.beginPath();
    context.arc(0, 0, CircleData.Circle_r / 8, 0, Math.PI * 2,);
    context.stroke();
    context.fillStyle = "orange";
    context.fill();
    CircleData.CircleStep = CircleData.CircleStep % CircleData.AllStep;
    CircleData.CircleStep += CircleData.CircleSpeed;

    var step = [];
    // Arrow
    ArrowList.forEach((item, index) => {
        context.restore();
        context.save();
        if(item.IsInsert){
            context.translate(CircleData.CircleCenter_X, CircleData.CircleCenter_Y);
            context.rotate(CircleData.CircleRotate * item.CircleStep);
            context.fillStyle = "red";
            context.fillRect(CircleData.Circle_r - 30, -1 * CircleData.Circle_r / 32, 40, CircleData.Circle_r / 16);
            item.CircleStep =  item.CircleStep % CircleData.AllStep;
            item.CircleStep += CircleData.CircleSpeed;
            step.push(item.CircleStep);
        }else{
            if(CircleData.CircleCenter_X - CircleData.Circle_r <= item.pos_X + 20){
                
                for(var i=0;i<step.length;i++){
                    if(Math.abs(step[i] - CircleData.AllStep / 2) <= 1){
                        Play_Continue_GO = 3;
                        context.fillStyle = "green";
                        context.fillRect(item.pos_X, CircleData.CircleCenter_Y - CircleData.Circle_r / 32, 40, CircleData.Circle_r / 16);
                    }
                }
                if(Play_Continue_GO != 3){
                    item.IsInsert = true;
                    score += 1;
                }
                //console.log(step);
            }else{
                context.fillStyle = "green";
                item.pos_X += 8;
                context.fillRect(item.pos_X, CircleData.CircleCenter_Y - CircleData.Circle_r / 32, 40, CircleData.Circle_r / 16);
            }
        }

    });

    context.restore();
    //console.log(CircleData.CircleStep);
}           
