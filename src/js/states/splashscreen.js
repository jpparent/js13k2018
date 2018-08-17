(function(){

	var splashscreen = function(){
		this.name = "Splashscreen";
		Events(this);

		this.init = function(){

		};

		this.update = function(dt) {

		};

		this.render = function(dt) {
			_.Draw.clear();
			_.Draw.text(_.width/2, _.height/2, this.name + " PLEASE CONNECT TO THE SERVER", COLOR.PURPLE);
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

	_.states["splashscreen"] = new splashscreen();

})();