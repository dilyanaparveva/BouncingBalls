(function(){
var canv = document.getElementById('myCanvas');
			var c = canv.getContext('2d');
			//c.fillRect(0,0,50,50);
			var gravity = 0.1;
			var dampening = 0.99;
			var pullStrength = 0.01;
			var circles = [];
			var i, numCircles = 10;
			for (i = 0; i < numCircles; i++){
				circles.push( {
					x: Math.random() * canv.width,
					y: Math.random() * canv.height,
					//vx and vy - velocity vector
					vx: 0,
					vy: 0,
					radius: 20
					});
			}
			
	
function executeFrame() {
var i, circle;

for(i = 0; i < numCircles; i++){
circle = circles[i];
//increment location by velocity
circle.x += circle.vx;
circle.y += circle.vy;

circle.vy += gravity;

//slow it down
circle.vy *= dampening;

//bounce bottom
if(circle.y + circle.radius > canv.height){
circle.y = canv.height - circle.radius;
circle.vy = -Math.abs(circle.vy);
}

//bounce right
if(circle.x + circle.radius > canv.width){
circle.x = canv.width - circle.radius;
circle.vx = -Math.abs(circle.vx);
}


//draw circle
c.beginPath();
c.arc(circle.x,circle.y,circle.radius, 0, 2*Math.PI);
c.closePath();

c.fillStyle = 'black';
c.fill();
}

c.fillStyle = 'rgba(255,255,255, 0.05)';
//clear(fill)
c.fillRect(0,0,canv.width,canv.height);
//if(circle.y < canv.height - circle.radius)
requestAnimFrame(executeFrame);
}

canv.addEventListener('mousedown',function(e){
//console.log(e.pageX, e.pageY);
//circle.x = e.pageX;
//circle.y = e.pageY;
var dx, dy, i, circle;
for(i = 0; i < numCircles; i++){
	circle = circles[i];
	dx = e.pageX - circle.x,
	dy = e.pageY - circle.y;
	circle.vx += dx * pullStrength;
	circle.vy += dy * pullStrength;
}
});

//start animation
executeFrame();
})();


