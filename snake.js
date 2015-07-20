/**
 * @author Michael Ion
 * @email michael.antonius.ion@gmail.com
 */

/*
KEYMAPPINGS
TODO: make all-browser compatible
*/
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_RIGHT = 39;
var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;

//temporary create new block
var KEY_New = 78;
var KEY_Temp1 = 85;
var KEY_Temp2 = 73;
var KEY_Temp3 = 79;
var KEY_Temp4 = 80;

//check if key was pressed this frame
var KEY_PRESSED = false;

/*
WINDOW MEASUREMENTS
*/
//resize gaming window

var WINDOW_SIZE;
var canvas;

var blockLength;
var snSpeed;

var direction;
var food;

var bpm = 360;
var fps = bpm / 60;;

var stage;
var head;

var snake;

/*
 COLORING
 */

var body_c;
var head_c;
var back_c;
var food_c;

function addBodypart() {
    var body = new createjs.Shape();
    body.graphics.beginFill("#FFE21C").rect(0, 0, blockLength, blockLength);

	//init body parts on coords of last member
	var lastMember = snake.getChildAt((snake.numChildren-1));
	body.x = lastMember.x;
	body.y= lastMember.y;
	
	//init direction of previous body part
	direction[snake.numChildren] = direction[snake.numChildren-1];
    snake.addChild(body);
}

function removeBodypart() {}

function keydownhandler(e) {
    //only register a pressed key ONCE per frame
	if(KEY_PRESSED) {
		return;
	}
	KEY_PRESSED = true;
	
	switch (e.keyCode) {
        case KEY_LEFT:
        case KEY_A:
			if(direction[0] != "right") {
				direction[0] = "left";	
			}
            break;
        case KEY_RIGHT:
        case KEY_D:
			if(direction[0] != "left") {
				direction[0] = "right";
			}
            break;
        case KEY_UP:
        case KEY_W:
			if(direction[0] != "down") {
				direction[0] = "up";
			}
            break;
        case KEY_DOWN:
        case KEY_S:
			if(direction[0] != "up") {
				direction[0] = "down";
			}
            break;
        case KEY_New:
            addBodypart();
            break;
        case KEY_Temp1:
            alert(snake.numChildren);
            break;
        case KEY_Temp2:
            alert();
            break;
        case KEY_Temp3:
            alert();
            break;
        case KEY_Temp4:
            alert();
            break;
    }
}

function addFood() {
	food = new createjs.Shape();
	food.graphics.beginFill("#FFE21C").rect(0, 0, blockLength, blockLength);
	food.x = Math.floor(blockLength*(Math.floor(20*Math.random())));
	food.y = Math.floor(blockLength*(Math.floor(20*Math.random())));
	
	stage.addChild(food);
}

function tickHandler(event) {
	
	var oldPositions = [];
	for (var i = 0; i < snake.numChildren; i++) {
		oldPositions[i] = [snake.getChildAt(i).x, snake.getChildAt(i).y];
	}
	
	//set direction of head
	switch(direction[0]) {
		case "left":
			head.x -= snSpeed;
		break;
		case "right":
			head.x += snSpeed;
		break;
		case "up":
			head.y -= snSpeed;
		break;
		case "down":
			head.y += snSpeed;
		break;	
	}
	
	for(var i = 1; i < snake.numChildren; i++) {
		var cur = snake.getChildAt(i);
		cur.x = oldPositions[i-1][0];
		cur.y = oldPositions[i-1][1];
	}

	if(head.x == food.x && head.y == food.y) {
		stage.removeChild(food);
		addFood();
		addBodypart();
	}
	
	stage.update();
	KEY_PRESSED = false;
}

function start() {
	canvas = document.getElementById("game");
	canvas.style.left = "500px";
	WINDOW_SIZE = canvas.height = window.innerHeight;
	canvas.width = WINDOW_SIZE;
	
	//TODO: handle case of window height > window width
	if(window.innerWidth < WINDOW_SIZE) {
		alert("Please resize your window so that the width is larger than the height and refresh");
	}
	
	/*
	GAME MEASUREMENTS
	
	TODO: make some adjustements
	need space between block to make it look cooler
	*/
	
	blockLength = Math.floor(WINDOW_SIZE / 20);
	snSpeed = blockLength;
	
	/*TODO:
	- make ALL THE THINGS resizable 
	*/
	
	direction = [];

	createjs.Ticker.framerate = fps;
	createjs.Ticker.addEventListener("tick", tickHandler);
	
	window.addEventListener("keydown", keydownhandler, false);
	
	stage = new createjs.Stage("game");
	
	head = new createjs.Shape();
	head.graphics.beginFill("#FFE458").rect(0, 0, blockLength, blockLength);
	head.x = 10*blockLength;
	head.y = 10*blockLength;
	
	snake = new createjs.Container();
	stage.addChild(snake);
	snake.addChild(head);
	addFood();

}

function initSnake() {
	
}
