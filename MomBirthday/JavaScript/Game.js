var canvas = document.getElementById('Game_Canvas');
var context = canvas.getContext('2d');

var time = 0
var Play_Continue_GO = 0;   // play = 0, continue = 1, go = 2;
var H_BigThen_W = false;
var Now_X_Position = 0;
var score = 0;
var IsMouseDown = false;
var IsKeyDown = false;
var mouse = {x:0, y:0};
var IsUp = false;
var TouchWall = false;

var Canvas_width = canvas.getBoundingClientRect().width;
var Canvas_height = canvas.getBoundingClientRect().height;

// Charactor Data
var C_Data = {
    NCP : Canvas_height / 2, // Now Charactor Position
    Width: 60,               // Charactor Width
    Height: 60,              // Charactor Height
    Eyes_X: 50,              // Charactor X position
    Eye_radius: 5,           // Charactor Eyes radius
    First_Eye: 15,           // Charactor First Eye position
    Eyes_between: 30         // Charactor Distance between two eye
};

if(Canvas_width < Canvas_height){
    H_BigThen_W = true;
    C_Data.Width = 28;
    C_Data.Height = 28;
    C_Data.Eyes_X = 30;
    C_Data.Eye_radius = 3;
    C_Data.First_Eye = 7;
    C_Data.Eyes_between = 15;
}

// Wall Data
var walls = [];

// Wall Set
function Init_Walls(){
    var Amount = Math.floor(Math.random() * 10) + 5;
    var last_x = 0;
    walls.forEach((item, index) => {
        if(item.x_pos > last_x)
            last_x = item.x_pos;
    })

    walls.push({
        width: Canvas_width / Amount,
        Road: Math.floor(Math.random() * 7) + 2,
        x_pos: 500 + last_x
    });
    for(var i = 1; i < 10 ; i++){
        Amount = Math.floor(Math.random() * 10) + 5;
        walls.push({
            width: Canvas_width / Amount,
            Road: Math.floor(Math.random() * 7) + 2,
            x_pos: walls[i - 1].x_pos + Math.floor(Math.random() * 1000) + 500 + last_x
        });
    }
    //console.log(walls);
}

//Init_Walls();

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

Play_Button();

function Play_Button(){
    radiusRect(Canvas_width / 2 - 100, Canvas_height / 2 - 50, 200, 100, 5, '#BBBBBB');
    context.font = "30px Arial";
    context.fillStyle = "Blue";
    context.textAlign = "center";
    context.fillText("Play", Canvas_width / 2, Canvas_height / 2 + 10);
}

function Continue_Button(){
    radiusRect(Canvas_width / 2 - 100, Canvas_height / 2 - 50, 200, 100, 5, '#888888');
    context.font = "30px Arial";
    context.fillStyle = "Green";
    context.textAlign = "center";
    context.fillText("Continue", Canvas_width / 2, Canvas_height / 2 + 10);
}

function Retry_Button(){
    radiusRect(Canvas_width / 2 - 100, Canvas_height / 2 - 50, 200, 100, 5, '#666666');
    context.font = "30px Arial";
    context.fillStyle = "Orange";
    context.textAlign = "center";
    context.fillText("Try Again?", Canvas_width / 2, Canvas_height / 2 + 10);
}

// --- Mouse Event & Touch Event ---
function EventDown(e){
    if(H_BigThen_W){
        mouse = {
            x:e.targetTouches[0].pageX - canvas.getBoundingClientRect().left,
            y:e.targetTouches[0].pageY - canvas.getBoundingClientRect().top
        };
    }else{
        mouse = {x:e.offsetX, y:e.offsetY};
    }
    if(Play_Continue_GO == 2){ // when player is playing
        if(mouse.x >= 10 && mouse.x <= 60 && mouse.y >= 10 && mouse.y <= 60){
            Play_Continue_GO = 1;
            //console.log('press');
        }else{
            IsMouseDown = true;
        }
    }else if(Play_Continue_GO == 3){
        var x = Canvas_width / 2 - 100;
        var y = Canvas_height / 2 - 50;
        if(mouse.x >= x && mouse.x <= x + 200 && mouse.y >= y && mouse.y <= y + 100){
            Sum_Time = 0;
            Now_X_Position = 0;
            score = 0;
            IsMouseDown = false;
            IsKeyDown = false;
            IsUp = false;
            walls = [];
            Play_Continue_GO = 2;
        }
    }else{  // when player is not playing
        var x = Canvas_width / 2 - 100;
        var y = Canvas_height / 2 - 50;
        if(mouse.x >= x && mouse.x <= x + 200 && mouse.y >= y && mouse.y <= y + 100){
            Play_Continue_GO = 2;
            //console.log('press');
        }
    }
    //console.log(mouse);
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
    if(e.keyCode == 38 || e.keyCode == 40){ // 38=up 40=dwon
        IsKeyDown = true;
        if(e.keyCode == 38)
            IsUp = true;
        else    
            IsUp = false;
    }
});

window.addEventListener('keyup', function(e){
    IsKeyDown = false;
});

// --- Frame ---
var IsTimeContinue = false;
var Sum_Time = 0;

// Every Frame Function
function Timer(t){
    if(Play_Continue_GO == 2){ // when player playing
        canvas.width = canvas.width;
        Walls_Draw();
        // Top Text
        if(!IsTimeContinue){ // Time debug
            time = t;
            IsTimeContinue = true;
        }
        TopText(t - time + Sum_Time);

         // Charactor
        if(IsMouseDown || IsKeyDown){
            if(IsMouseDown){
                if(mouse.y > C_Data.NCP + C_Data.Height / 2){ // down
                    IsUp = false;
                }else{
                    IsUp = true;
                }
            }
            if(IsUp){
                if(C_Data.NCP - 3 > 65)
                    C_Data.NCP -= 3;
            }else{
                if(C_Data.NCP + 3 < Canvas_height - C_Data.Height - 5)
                    C_Data.NCP += 3;
            }
        }
        Charactor();
        if(TouchWall){
            TouchWall = false;
            Play_Continue_GO = 3;
        }
        Now_X_Position += 2 * (Math.floor(score / 5) / 2 + 1);
    }else if(Play_Continue_GO == 3){ // when player fail
        if(IsTimeContinue){
            Sum_Time += t - time;
            Retry_Button();
            IsTimeContinue = false;
        }
    }else if(Play_Continue_GO == 1){ // when player Stop
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
    context.fillRect(10, C_Data.NCP, C_Data.Width, C_Data.Height);
    context.strokeRect(10, C_Data.NCP, C_Data.Width, C_Data.Height);
    context.beginPath();
    context.arc(C_Data.Eyes_X, C_Data.NCP + C_Data.First_Eye, C_Data.Eye_radius, 0, Math.PI * 2);
    context.arc(C_Data.Eyes_X, C_Data.NCP + C_Data.First_Eye + C_Data.Eyes_between, C_Data.Eye_radius, 0, Math.PI * 2);
    context.fillStyle = "black";
    context.closePath();
    context.fill();
}

// Wall Draw
function Walls_Draw(){
    walls.forEach((item, index) => {
        if(item.x_pos - Now_X_Position < Canvas_width){
            //console.log(item);
            // Draw wall
            for(var i = 0; i < 10; i++){
                if(i == item.Road || i == item.Road + 1)continue;
                context.fillStyle = "black";
                context.fillRect(item.x_pos - Now_X_Position, Canvas_height / 10 * i, item.width, Canvas_height / 10);
            }

            // Check Whether Touch to wall 
            if(item.x_pos - Now_X_Position <= 10 + C_Data.Width){
                for(var i = 0; i < 10; i++){
                    if(i == item.Road || i == item.Road + 1)continue;
                    if(C_Data.NCP > Canvas_height / 10 * i && C_Data.NCP < Canvas_height / 10 * (i + 1))
                        TouchWall = true;
                    if(C_Data.NCP + C_Data.Height > Canvas_height / 10 * i && C_Data.NCP + C_Data.Height < Canvas_height / 10 * (i + 1))
                        TouchWall = true;
                }
            }
        }
        if(item.x_pos - Now_X_Position + item.width < 0){
            delete walls.splice(index, 1);
            score += 1;
        }
    })
    if(walls.length < 5){
        Init_Walls();
    }
    console.log(Now_X_Position);
}