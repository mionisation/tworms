/**
 * @author Michael Ion
 * @email michael.antonius.ion@gmail.com
 */
 
 var textContainer = new createjs.Container();
 function buildMainMenu() {
	menu = new createjs.Stage("game");
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", updateMenu);

	buildLotsaTitles();
	buildBigAssTitles();
	

}
 
 function updateMenu(event) {
	 menu.update();
	
	for(var i = 0; i < textContainer.numChildren; i++) {
		var cur = textContainer.getChildAt(i);
		if(cur.x > (WINDOW_SIZE - cur.getBounds.width)) {
			textContainer.addChild(getBackgroundTitle());
		}
		else if(cur.x > WINDOW_SIZE) {
			textContainer.removeChildAt(i);
		}
	}
	while(textContainer.numChildren < 80) {
		textContainer.addChild(getBackgroundTitle());
	}
 }
 
 function buildBigAssTitles() {
	var textS = 0;
	var title_shadow = new createjs.Shadow("#000000", 5, 5, 10);
	var title_top = new createjs.Text("TWORMS", textS +"px Arial Black", "#FFF");
	while(title_top.getBounds().width < WINDOW_SIZE/2) {
			title_top = new createjs.Text("TWO", textS +"px Arial Black", "#FB0");
			title_top.shadow = title_shadow;
			title_top.y = title_top.x = WINDOW_SIZE/4;		
			textS += 2;
	}
	var title_bottom = new createjs.Text("RMS", textS +"px Arial Black", "#F70");
	title_bottom.x = WINDOW_SIZE/4;
	title_bottom.shadow = title_shadow;
	title_bottom.y = (title_top.getBounds().height) + WINDOW_SIZE/4;
	menu.addChild(title_top);
	menu.addChild(title_bottom);
	createjs.Tween.get(title_top, { loop: false }).wait(700).to({ x: 0 }, 1000, createjs.Ease.getPowInOut(4)).to({ y: WINDOW_SIZE/3 }, 1000, createjs.Ease.getPowInOut(4));
	createjs.Tween.get(title_bottom, { loop: false }).wait(700).to({ x: WINDOW_SIZE/2 }, 1000, createjs.Ease.getPowInOut(4)).to({ y: WINDOW_SIZE/3}, 1000, createjs.Ease.getPowInOut(4));
	
 }
 
 function buildLotsaTitles() {
	 textContainer = new createjs.Container();
		
	 for(var i = 0; i < 80; i++) {
		 var little = getBackgroundTitle(Math.random()*WINDOW_SIZE);
		 textContainer.addChild(little);
	 } 
	 menu.addChild(textContainer);
 }
 
 function getBackgroundTitle(xc) {
	 var color = '#' + Math.random().toString(16).substring(2, 8);
	 var little_shadow = new createjs.Shadow(color, 0, 0, 25);
	 var little = new createjs.Text("TWORMS", (WINDOW_SIZE/20) + Math.random()*(WINDOW_SIZE/10)+"px Arial Black", color);
	 if(xc == undefined) {
		 xc = -1* little.getBounds().width;
	 } else {
		xc -= little.getBounds().width;
	 }
	 little.shadow = little_shadow;
	 little.alpha = 0.2 * Math.random();
	 little.x = xc;
	 little.y = Math.random()*WINDOW_SIZE;
	 randTime = 3000 + Math.random()*10000;
	 createjs.Tween.get(little).to({x : WINDOW_SIZE+Math.random()*WINDOW_SIZE}, randTime, createjs.Ease.linear);
	 return little;
 }
 
 function getRandColor(brightness){
    //6 levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";
  }
 
 function buildBackgroundCandy() {
	 
 }