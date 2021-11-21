var canvas = document.getElementById('Firework_Canvas');
var context = canvas.getContext('2d');

var time = 0;
var Firework_Balls = [];
var Firework_Explode = [];

var mouse = { x: 0, y: 0};

var Canvas_width = canvas.getBoundingClientRect().width;
var Canvas_height = canvas.getBoundingClientRect().height;

canvas.addEventListener('mousemove', function (e) {
	mouse = { x: e.offsetX, y: e.offsetY };
})

// Click Function
canvas.addEventListener('click', function (e) {
    mouse = { x: e.offsetX, y: e.offsetY };
    console.log(mouse);
    var mx = mouse.x - (Canvas_width / 2);
    var my = mouse.y - Canvas_height;
    var ball = {
        velocity: 500,
        angle: Math.atan(my / mx),
        start_position: { x: (Canvas_width / 2), y: Canvas_height},
        end_position: { x: mouse.x, y: mouse.y}
    }
    if (mx < 0) {
		ball.velocity *= -1;
	}
    Firework_Balls.push(ball);
})

// Flash
function Timer(t){
    //context.clearRect(0, 0, Canvas_width, Canvas_height)
    canvas.width = canvas.width;
    Motion(t - time);
	time = t;

    requestAnimationFrame(Timer);
}
requestAnimationFrame(Timer);

// Animation
function Motion(offset) {
	Firework_Balls.forEach((item, index) => {
        item.start_position.x += item.velocity * Math.cos(item.angle) / 1000 * offset;
		item.start_position.y += item.velocity * Math.sin(item.angle) / 1000 * offset;

		var x1 = item.start_position.x;
		var y1 = item.start_position.y;
		var x2 = item.end_position.x;
		var y2 = item.end_position.y;
		var dis = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

		//console.log(x1 + ' ' + y1);
        
		if (dis > 10) {
			context.fillStyle = 'red';
			context.beginPath();
			context.arc(x1, y1, 5, 0, Math.PI * 2);
			context.fill();
		} else {
			//console.log(`boom at (${x2}, ${y2})`);
			delete Firework_Balls.splice(index, 1);
			Prepare_Firework(x2, y2);
		}
    })

	Firework_Explode.forEach((element, index) => {
		element.life--

		if (element.life) {
			element.velocity.x += element.acceleration.x;
			element.position.x += element.velocity.x / 1000 * offset;
			element.acceleration.y += 1;
			element.velocity.y += element.acceleration.y;
			element.position.y += element.velocity.y / 1000 * offset;
			context.fillStyle = element.color;
			context.beginPath();
			context.arc(element.position.x, element.position.y, element.radius, 0, Math.PI * 2);
			context.fill();
		} else {
			delete Firework_Explode.splice(index, 1);
		}
	})
}

// 
function Prepare_Firework(x, y) {
	var angle;
	var color = '#' + parseInt(Math.random() * (256 * 256 * 256 - 1)).toString(16);
	for (var i = 0; i < 100; i++) {
		angle = Math.random() * Math.PI * 2
		// color = '#' + parseInt(Math.random() * (256 * 256 * 256 - 1)).toString(16)
		Firework_Explode.push({
			life: 100,
			position: {
				x: x,
				y: y
			},
			velocity: {
				x: 0,
				y: 0
			},
			acceleration: {
				x: Math.cos(angle) * (Math.random() * 10 + 10),
				y: Math.sin(angle) * (Math.random() * 10 + 10)
			},
			radius: 2,
			color: color
		})
	}
}