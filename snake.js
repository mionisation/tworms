/**
 * @author Michael Ion
 * @email michael.antonius.ion@gmail.com
 */

function Snake(args) {
	this.direction = [];
	this.container = new createjs.Container();
	this.keys = args.keys;
	this.colors = args.colors;
	//check if key was pressed this frame
	var h = new createjs.Shape();
	h.graphics.beginFill(this.colors[1]).rect(0, 0, blockLength, blockLength);
	h.x = args.position[0];
	h.y = args.position[1];
	this.size = args.size;
	this.container.addChild(h);
}

Snake.prototype.addBodypart = function() {
	//create new block for body part
	var body = new createjs.Shape();
    body.graphics.setStrokeStyle(blockLength/50, "square", "bevel").beginStroke("purple").beginFill(this.colors[0]).rect(0, 0, blockLength, blockLength);

	//init body parts on coords of last member
	var numCh = this.container.numChildren;
	var lastMember = this.container.getChildAt((numCh-1));
	body.x = lastMember.x;
	body.y = lastMember.y;
	
	//init direction of previous body part
	this.direction[numCh] = this.direction[numCh-1];
    this.container.addChild(body);
};

Snake.prototype.removeBodypart = function() {};

Snake.prototype.tickHandler = function(event) {
	var oldPositions = [];
	var numCh = this.container.numChildren;
	var t = this.container;
	
	for (var i = 0; i < numCh; i++) {
		oldPositions[i] = [t.getChildAt(i).x, t.getChildAt(i).y];
	}
	
	var h = this.getHead();
	//set direction of head h
	switch(this.direction[0]) {
		case "left":
			h.x -= snSpeed;
		break;
		case "right":
			h.x += snSpeed;
		break;
		case "up":
			h.y -= snSpeed;
		break;
		case "down":
			h.y += snSpeed;
		break;	
	}
	
	for(var i = 1; i < numCh; i++) {
		var cur = t.getChildAt(i);
		cur.x = oldPositions[i-1][0];
		cur.y = oldPositions[i-1][1];
	}
};

Snake.prototype.getHead = function() {
	return this.container.getChildAt(0);
}

Snake.prototype.isCollidingBody = function(shape) {
	for(var i = 1; i<this.container.numChildren; i++) {
		var cur = this.container.getChildAt(i);
		if(shape.x == cur.x && shape.y == cur.y) {return true;}
	}
	return false;
}

Snake.prototype.isCollidingHead = function(shape) {
	var cur = this.container.getChildAt(0);
	if(shape.x == cur.x && shape.y == cur.y) {return true;}
	else{return false;}
}

Snake.prototype.keydownhandler = function(e) {
    //TODO only register a pressed key ONCE per frame
	
	switch (e.keyCode) {
		//press left key
        case this.keys[1]:
			if(this.direction[0] != "right") {
				this.direction[0] = "left";	
			}
            break;
        //press right key
		case this.keys[3]:
			if(this.direction[0] != "left") {
				this.direction[0] = "right";
			}
            break;
		//press up key
        case this.keys[0]:
			if(this.direction[0] != "down") {
				this.direction[0] = "up";
			}
            break;
        //press down key
		case this.keys[2]:
			if(this.direction[0] != "up") {
				this.direction[0] = "down";
			}
            break;
        case KEY_New:
            this.addBodypart();
            break;
        case KEY_Temp1:
            alert(this.container.numChildren);
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
};