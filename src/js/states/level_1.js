(function(){

	var layout = [
		[1, 1, 0, 0],
		[0, 1, 0, 1],
		[1, 1, 1, 1],
		[1, 1, 0, 1],
		[0, 1, 1, 1]
	];

	var level1 = function(){
		this.name = "Level 1";
		Events(this);

		this.init = function(){
			_.entities = [];
			_.spawnBall();


			// quick and dirty spawn nodes TODO: clean this
			var screenOffset = 50;
			var spaceBetween = 25;

			for (var row = 0; row < layout.length; row++) {
				for (var col = 0; col < layout[row].length; col++) {
					var active = layout[row][col] === 1 ;
					var x = col === 0 ? screenOffset : screenOffset + (16 + spaceBetween) * col;
					var y = row === 0 ? screenOffset : screenOffset + (16 + spaceBetween) * row;
					_.entities.push( new _.Node(x, y, active));
				}

			}
		};

		this.update = function(dt){
			for (var i = _.entities.length - 1; i >= 0; i--) {
				_.entities[i].update(dt);
			}

			_.checkCollisions(_.entities);
		};

		this.render = function(dt){
			_.Draw.clear();

			for (var i = _.entities.length - 1; i >= 0; i--) {
				_.entities[i].render(dt);
			}
		}

		this.on("start", function(){

			this.init();
			console.log("starting " + this.name);

		}, this);

		this.on("exit", function(){

			console.log("leaving " + this.name);

		}, this);

		this.on("click", function(data){
			_.spawnBumber(data.x, data.y);
		}, this);
	}

	_.states["level1"] = new level1();

})();