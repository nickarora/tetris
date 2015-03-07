(function(){

	Tetris.Game = function(canvas){
		this.ctx = canvas.getContext("2d");
		this.board = new Tetris.Board({ ctx: this.ctx });
		this.curPiece = null;
		this.loadImages();
	};

	Tetris.Game.prototype.loadImages = function(){
		var LImg = new Image();
  	LImg.onload = function(){
  		Tetris.LBlocks = Tetris.initTiles(LImg);
  	};
  	LImg.src = "images/block-l.png"

		var mainImg = new Image();
  	mainImg.onload = (function(){
  		Tetris.initMainTiles(mainImg);
  		this.play();
  	}).bind(this);
  	mainImg.src = "images/maintiles.png"
	};

	Tetris.Game.prototype.generatePiece = function(){
		this.curPiece = new Tetris.LPiece();
		this.board.add(this.curPiece);
	};

	Tetris.Game.prototype.play = function() {
		this.generatePiece();
		this.board.draw();
	};

})();