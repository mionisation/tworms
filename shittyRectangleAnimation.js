/**
 * @author Michael Ion
 * @email michael.antonius.ion@gmail.com
 */
 
 var rect_c;
 var numRects = 20;
 var rectIter = 0;
 function buildShittyRects() {
	 createjs.Ticker.framerate = 60;
	 createjs.Ticker.addEventListener("tick", moverHandle);
	 rect_c = new createjs.Container();
	 for (var i = 0; i < numRects; i++) {
		 var rect = new createjs.Shape();
		 var rectL = (i/numRects)*(i*0.5)*blockLength;
		 var offset = Math.pow((i/numRects), 3)*300;
		 rect.graphics.beginStroke("#0AF").rect(0,0,rectL,rectL);
		 rect.x = (WINDOW_SIZE/2)-(rectL/2) + offset;
		 rect.y = (WINDOW_SIZE/2)-(rectL/2) + offset;
		 rect_c.addChild(rect);
		 rect.alpha = 0.2;
	 }
	stage.addChild(rect_c);
	stage.update();
}


function moverHandle(event) {
	//klein...groß
	rectIter = rectIter % numRects;
	 for (var i = 0; i < numRects; i++) {
		var rect = rect_c.getChildAt(i);
		rect.alpha = 0.2;	
			if (i == rectIter) {
				rect.graphics.beginFill("#000");
				rect.alpha = 1;
			} else if (i == rectIter-1 || i === rectIter+1) {
				rect.graphics.beginFill("#000");
				rect.alpha = 0.5;
			}
		var pver = Math.pow(i/numRects,2);
		var rectL = (i/numRects)*(i*0.5)*blockLength;
		rect.x = (1-pver)*((WINDOW_SIZE/2)-(rectL/2)) + pver*(stage.mouseX - (rectL/2));
		rect.y = (1-pver)*((WINDOW_SIZE/2)-(rectL/2)) + pver*(stage.mouseY - (rectL/2));
	}
	rectIter++;
	stage.update();
}