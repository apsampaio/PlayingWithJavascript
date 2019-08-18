var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;

var count = 0;

var slider = document.getElementById('myRange');

setInterval(drawFunction, 1);


function mapValues() {

	count < 49 ? pointerValue = map(count, 0, 49, 270, 360) : pointerValue = map(count, 50, 100, 0, 90);
	Math.ceil(pointerValue);
	pointerValue = ( pointerValue * Math.PI /180); // Value in Degrees */
	count = slider.value;
	
	ctx.beginPath();
	ctx.font = "40px Georgia";
	ctx.fillStyle = 'white';
	ctx.fillText(count + '%', -30, 100);

}

function drawFunction() {
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawFace(ctx, radius);
    mapValues();
	drawPointer(ctx, pointerValue, radius * 0.95, radius*0.05);

}

function map( x,  in_min,  in_max,  out_min,  out_max){

  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

}


function drawPointer(ctx, pos, length, width) {
	
	ctx.beginPath();
	ctx.strokeStyle = '#333';
	ctx.lineWidth = width;
	ctx.lineCap = 'round';
	ctx.moveTo(0,0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
	
}

function drawFace(ctx, radius) {
	
	
	ctx.lineCap = 'round';
	
	//Main part
	ctx.beginPath();
    ctx.arc( 0, 0, (radius + 10), 0, 2 * Math.PI, false); 
	ctx.fillStyle = '#333';
	ctx.fill();
	
	ctx.shadowBlur = 0;
	ctx.lineCap = 'butt';
	ctx.beginPath();
    ctx.arc( 0, 0, radius, 0, Math.PI, true); 
	ctx.fillStyle = 'white';
	ctx.fill();
	
	
	//Center
	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, Math.PI, true);
	ctx.fillStyle = '#333';
	ctx.fill();
	
	//Value Context Red
	ctx.beginPath();
	ctx.arc( 0, 0, radius * 0.95, 0, 1.75 * Math.PI , true); 
	ctx.lineWidth = 19;
	ctx.strokeStyle = '#D21F3C';
	ctx.stroke();
	
	//Value Context Green
    ctx.beginPath();
	ctx.rotate(180 * Math.PI/180);
	ctx.arc( 0, 0, radius * 0.95, 0, 0.25 * Math.PI  , false); 
	ctx.lineWidth = 19;
	ctx.strokeStyle = '#00A86B';
	ctx.stroke();
	
	//Value Context Yellow
	ctx.beginPath();
	ctx.rotate(0.785);
	ctx.arc( 0, 0, radius * 0.95, 0, 0.5 * Math.PI  , false); 
	ctx.lineWidth = 19;
	ctx.strokeStyle = '#FFBF00';
	ctx.stroke();
	
	ctx.rotate(-180 * Math.PI/180) //Rotate back
	ctx.rotate(-0.785);
}