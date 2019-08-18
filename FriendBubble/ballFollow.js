
var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = 683;
var y = 312;
var dx = 2;
var dy = 2;
var radius = 30;

var gotoX = x;
var gotoY = y;

animation();

window.addEventListener('mousemove', function (event) {
	gotoX = event.x;
	gotoY = event.y;
	
});

function draw() {

	c.beginPath();
	c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.fillStyle = `#${gotoX}`;
	c.fill();
	c.stroke();

}

function animation() {
	requestAnimationFrame(animation);
		if(gotoX != x || gotoY != y){
			
			if(gotoX > x) x += dx;
			if(gotoX < x) x += -dx;
			if(gotoY > y) y += dy;
			if(gotoY < y) y += -dy;
			
		}
	c.clearRect(0,0,canvas.width,canvas.height);
	draw();

}