(function(){

	var mainMenu = function(){
		this.name = "Main Menu";
		Events(this);

		this.init = function(){

		};

		this.update = function(dt) {

		};

		this.render = function(dt) {
			_.Draw.clear();
			_.Draw.text(_.width/2, _.height/2, this.name + " click to start", COLOR.PURPLE);
		};

		this.on("start", function(){

			this.init();
			console.log("starting" + this.name);

		}, this);

		this.on("exit", function(){

			console.log("leaving " + this.name);

		}, this);

		this.on("click", function(data){

			_.setState("level1");

		}, this);
	}

	_.states["menu"] = new mainMenu();

})();