(function(){

	Tetris.Game = function(canvas){
		this.ctx = canvas.getContext("2d");
		this.board = new Tetris.Board({ ctx: this.ctx });
	};

	Tetris.Game.prototype.play = function() {
		this.board.draw();
	};

})();