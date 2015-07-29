/**
 * @author Michael Ion
 * @email michael.antonius.ion@gmail.com
 */

/*
WINDOW MEASUREMENTS
*/
//resize gaming window

var WINDOW_SIZE;
var canvas;

var blockLength;
var snSpeed;

/*
FRAMERATE SETTINGS
*/

var bpm = 360;
var fps = bpm / 60;;

/*
CREATEJS VARS
*/

var stage;

/*
???
*/

var food = new createjs.Container();

/*
SCORES
*/
var score_l = 0;
var score_r = 0;

var score_l_text = new createjs.Text("LEFT: 0", "30px Impact", "#ff7700");
var score_r_text = new createjs.Text("RIGHT: 0", "30px Impact", "#ff7700");

/*****************
SNAKE INFORMATIONS BEGIN
******************/

/*
 COLORING
 */

var body_c_l = "#7FF" , head_c_l = "#7FF";
var body_c_r = "#800", head_c_r = "#800";

var back_c = "#FFF9D5";
var food_c = "#8F0";
/*
START POSITIONS
*/
var start_l;
var start_r;

/*
KEYMAPPINGS
TODO: make all-browser compatible
*/
var KEY_UP = 38, KEY_LEFT = 37, KEY_DOWN = 40, KEY_RIGHT = 39;
var KEY_W = 87, KEY_A = 65, KEY_S = 83, KEY_D = 68;

//temporary keys
var KEY_New = 78;
var KEY_Temp1 = 85;
var KEY_Temp2 = 73;
var KEY_Temp3 = 79;
var KEY_Temp4 = 80;

/*
SNAKE OBJECTS
*/
var snakeInfos_l;
var snakeInfos_r;


/*****************
SNAKE INFORMATIONS END
******************/

function addFood() {
	var f = new createjs.Shape();
	f.graphics.beginFill("#FFE21C").rect(0, 0, blockLength, blockLength);
	f.x = Math.floor(blockLength*(Math.floor(20*Math.random())));
	f.y = Math.floor(blockLength*(Math.floor(20*Math.random())));
	food.addChild(f);
}

function initCreateJs() {
	
	//set framerate
	createjs.Ticker.framerate = fps;
	stage = new createjs.Stage("game");
	 
	
}

function initSnakeVariables() {
	start_l = [5*blockLength, 10*blockLength];
	start_r = [20*blockLength, 10*blockLength];

	snakeInfos_l = {
		"keys": [KEY_W, KEY_A, KEY_S, KEY_D],
		"colors": [body_c_l, head_c_l],
		"position": [start_l[0], start_l[1]],
		"size":3
	};

	snakeInfos_r = {
		"keys": [KEY_UP, KEY_LEFT, KEY_DOWN, KEY_RIGHT],
		"colors": [body_c_r, head_c_r],
		"position": [start_r[0], start_r[1]],
		"size":3
	};
}

function initSize() {
	canvas = document.getElementById("game");
	canvas.style.backgroundColor = back_c;
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
	
	blockLength = Math.floor(WINDOW_SIZE / 25);
	snSpeed = blockLength;
	
	/*TODO:
	- make ALL THE THINGS resizable 
	*/
	
}

function keydownDelegate(e) {
	snake_l.keydownhandler(e);
	snake_r.keydownhandler(e);
}

function tickDelegate(e) {
	snake_l.tickHandler(e);
	snake_r.tickHandler(e);
	
	//TODO add snakes themselves in some container :O
	h_l = snake_l.getHead();
	h_r = snake_r.getHead();
	//head colliding with enemy's body
	if(snake_l.isCollidingBody(h_r)){alert("Player Left won!");cleanup();}
	if(snake_r.isCollidingBody(h_l)){alert("Player Right won!");cleanup();}
	//head colliding with own body
	if(snake_l.isCollidingBody(h_l)){alert("Player Right won! Dont hit yourself lol");cleanup();}
	if(snake_r.isCollidingBody(h_r)){alert("Player Left won! lol u suck RIGHT");cleanup();}
	//heads colliding
	if(snake_r.isCollidingHead(h_l) || snake_l.isCollidingHead(h_r)){alert("Both players lost!");cleanup();}
	//out of bounds
	if(h_l.x < 0 || h_l.y < 0 || h_l.x > WINDOW_SIZE || h_l.y > WINDOW_SIZE){alert("Player Right won! Don’t hit things");cleanup();} 
	if(h_r.x < 0 || h_r.y < 0 || h_r.x > WINDOW_SIZE || h_r.y > WINDOW_SIZE){alert("Player Left won! LOL");cleanup();} 

	for(var i = 0; i < food.numChildren;i++) {
		var cur = food.getChildAt(i);
		if(h_l.x == cur.x && h_l.y == cur.y) {
			food.removeChild(cur);
			addFood();
			snake_l.addBodypart();
			score_l++;
			score_l_text.text = "LEFT: " + score_l;
		}
		else if(h_r.x == cur.x && h_r.y == cur.y) {
			food.removeChild(cur);
			addFood();
			snake_r.addBodypart();
			score_r++;
			score_r_text.text = "RIGHT: " + score_r;
			score_r_text.x = WINDOW_SIZE-(blockLength+score_r_text.getMeasuredWidth());
		}		
	}
	
	stage.update();
}

function initMainMenu() {
	buildMainMenu();
}

function initGame() {
	initSnakeVariables();
	
	snake_l = new Snake(snakeInfos_l);
	snake_r = new Snake(snakeInfos_r);
	
	stage.addChild(snake_l.container);
	stage.addChild(snake_r.container);
	stage.addChild(food);
	
	score_l_text.x = blockLength;
	score_l_text.y = blockLength;
	score_r_text.y = blockLength;
	score_r_text.x = WINDOW_SIZE-(blockLength+score_r_text.getMeasuredWidth());
	stage.addChild(score_l_text);
	stage.addChild(score_r_text);
	
	//fire listener each tick
	createjs.Ticker.addEventListener("tick", tickDelegate);
	window.addEventListener("keydown", keydownDelegate, false);
	
	addFood();
	addFood();
}

function start() {
	initSize();
	initCreateJs();
	buildShittyRects();
	initMainMenu();

	//initGame();
}

//TODO
function cleanup() {
	stage.removeAllChildren();
	start();
};