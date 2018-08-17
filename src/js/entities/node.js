_.Node = function(x, y, active){
	this.uid = _.utils.generateUID();
	this.tag = "node";
	this.x = x;
	this.y = y;
	this.size = 16;
	this.active = active;

	Events(this);

	this.update = function(dt) {

	}

	this.render = function(dt) {
		_.Draw.circle(this.x, this.y, this.size, this.active ? COLOR.GOLD : COLOR.SLATE);
	}

	// onCollision...
};