"use strict";

var GRAVITY = 9.8,
	WIDTH = 600,
	HEIGHT = 800,
	COLOR    = { BLACK: '#000000', YELLOW: '#ECD078', BRICK: '#D95B43', PINK: '#C02942', PURPLE: '#542437', GREY: '#333', SLATE: '#53777A', GOLD: 'gold' },
  	COLORS   = [ COLOR.YELLOW, COLOR.BRICK, COLOR.PINK, COLOR.PURPLE, COLOR.GREY ];

var _ = {};  // the game engine!

var dt = 0;
var pX = 0; // pointer X
var pY = 0; // pointer Y

_.entities = [];
_.states = {};
_.currentState;

_.init = function (){
	_.canvas = document.getElementById('canvas');
	_.canvas.width = _.width = WIDTH;
	_.canvas.height = _.height = HEIGHT;
	_.ctx = _.canvas.getContext('2d');

	AddEventListeners();


	_.lastFrame = 0;
	_.step = 1/60; // run at 60FPS

	_.currentState = _.states["splashscreen"];
	_.currentState.emit("start");
	_.loop(window.performance.now());
};

// main game loop
_.loop = function(frame){
	window.requestAnimFrame(_.loop);

	dt = dt + Math.min(1, (frame - _.lastFrame)/1000);
	while (dt > _.step){
		dt = dt - _.step;
		_.currentState.update(_.step);
	}
	
	_.currentState.render(dt);
	_.lastFrame = frame;
};

_.checkCollisions = function(entities){
	for (var i = entities.length - 1; i >= 0; i--) {
		var obj1 = entities[i];
		for (var j = entities.length -1; j >= 0; j--) {
			if (i !== j){
				var obj2 = entities[j];
				var collisionDetected = _.checkSpheresCollide(obj1, obj2);
				if (collisionDetected){
					obj1.emit("collision", obj2);
				}
			}
		}
	}
}

_.setState = function(newState){
	_.currentState.emit("exit");
	_.currentState = _.states[newState];
	_.currentState.emit("start");
}

_.spawnBall = function (){
	
	_.entities.push(new _.Ball(_.width/2, -32));
	
}

_.removeEntityWithUID = function(uid){
	_.entities = _.entities.filter(function(item){
		return item.uid != uid;
	});
}

_.spawnBumber = function(x, y) {
	_.entities.push(new _.Bumber(x, y))
}

_.checkSpheresCollide = function(obj1, obj2){
	var rad1 = obj1.size;
	var rad2 = obj2.size;

	var dx = obj2.x - obj1.x;
	var dy = obj2.y - obj1.y;
	var distanceBetweenBothSq = dx*dx + dy*dy;

	if (distanceBetweenBothSq < Math.pow(rad1 + rad2, 2)){
		return true;
	}

	return false;
}

// ========== DOM event handlers ==============
// TODO: change to minivents ?
window.addEventListener('load', function(e){ 
	_.init();

}, false);

function AddEventListeners () {


	// MOUSE
	_.canvas.addEventListener('click', function(e){
		if (e.button === 0 
			&& e.pageX - _.canvas.offsetLeft <= _.width 
			&& e.pageY - _.canvas.offsetTop <= _.height){
			_.currentState.emit("click", {x: pX, y: pY});
			e.preventDefault();
		}
	});

	_.canvas.addEventListener("mousemove", mouseMoveHandler);
	function mouseMoveHandler(e) {
	    pX = e.pageX - _.canvas.offsetLeft;
	    pY = e.pageY - _.canvas.offsetTop;
	}
	// TOUCH
	_.canvas.addEventListener("touchstart", touchHandler);
	_.canvas.addEventListener("touchmove", touchHandler);
	function touchHandler(e) {
	    if(e.touches) {
	        pX = e.touches[0].pageX - _.canvas.offsetLeft;
	        pY = e.touches[0].pageY - _.canvas.offsetTop;
	        e.preventDefault();
	    }
	}
}