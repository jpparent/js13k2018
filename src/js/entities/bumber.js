_.Bumber = function(x, y){
	this.uid = _.utils.generateUID();
	this.tag = "bumper";
	this.x = x;
	this.y = y;
	this.size = 64;
	this.shrinkMult = 1.5;
	this.color = '#FFF';

	Events(this);

	this.update = function(dt) {

		this.size -= this.size * this.shrinkMult * dt;

		if (this.size < 16){
			_.removeEntityWithUID(this.uid);
		}
	}

	this.render = function(dt) {
		_.Draw.circle(this.x, this.y, this.size, this.color);
	}

	// onCollision...
};