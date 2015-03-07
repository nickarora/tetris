(function(){

	Tetris.Game = function(canvas){
		this.ctx = canvas.getContext("2d");
		this.board = new Tetris.Board({ ctx: this.ctx });

		var img = new Image();
  	img.onload = (function(){
  		Tetris.initSprites(img);
  		this.play();
  	}).bind(this);
  	img.src = "images/maintiles.png"
	};

	Tetris.Game.prototype.play = function() {
		this.board.draw();
	};

})();