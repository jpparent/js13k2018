_.Draw = {
	clear: function() {
		_.ctx.clearRect(0, 0, _.width, _.height);
	},

	circle: function(x, y, r, color){
		_.ctx.beginPath();
		_.ctx.arc(x, y, r, 0, Math.PI * 2);
		_.ctx.fillStyle = color;
		_.ctx.fill();
	},

	text: function(x, y, text, color){
		_.ctx.fillStyle = color;
		_.ctx.fillText(text, x, y);
	}
};