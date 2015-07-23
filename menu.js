/**
 * @author Michael Ion
 * @email michael.antonius.ion@gmail.com
 */
 
 var circles;
 function buildMainMenu() {
	 circles = new createjs.Container();
	 for (var i = 0; i < 25; i++) {
		 var circle = new createjs.Shape();
		 circle.graphics.beginStroke("#0AF").drawCircle(0,0,(i/25)*(i*0.5)*blockLength);
		 circles.addChild(circle);
	 }
	circles.x = WINDOW_SIZE/2;
	circles.y = WINDOW_SIZE/2;
	stage.addChild(circles);
	canvas.addEventListener("mousemove", moverHandle);
	stage.update();
}

function moverHandle(event) {
	//klein...groß
	 for (var i = 0; i < 25; i++) {
		var circle = circles.getChildAt(i);
		var pver = Math.pow(i/25, 1.75);
		circle.x = pver*(stage.mouseX-WINDOW_SIZE/2);
		circle.y = pver*(stage.mouseY-WINDOW_SIZE/2);
	}
	stage.update();
}