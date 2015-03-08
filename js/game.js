(function(){

	Tetris.Game = function(canvas){
		this.ctx = canvas.getContext("2d");
		this.board = new Tetris.Board({ ctx: this.ctx });
		this.curPiece = null;
		this.loadImages();

		this.keysDown = {};
	};

	Tetris.Game.prototype.generatePiece = function(){
		this.curPiece = new Tetris.LPiece(this.ctx, this.board);
	};

	Tetris.Game.prototype.menu = function() {
		this.bindListeners();
		this.generatePiece();
		this.speed = Tetris.LEVEL1;
		this.frameCounter = 0;
		requestAnimationFrame(this.play.bind(this));
	};

 	Tetris.Game.prototype.bindListeners = function(){
    var that = this;
    $(window).keypress(function(event){
    	that.keysDown[event.keyCode] = true;
    });

    $(window).keydown(function(event){
      that.keysDown[event.keyCode] = true;
    });

    $(window).keyup(function(event){
      delete that.keysDown[event.keyCode];
    });
  };

	Tetris.Game.prototype.play = function() {
		this.frameCounter++;
		if (this.frameCounter > 60) { this.frameCounter = 1; }

		this.board.draw();
		this.curPiece.draw();
		this.keyHandler();

		var canMove = true;
		if ( this.frameCounter % this.speed == 0 ) { 
			canMove = this.curPiece.move();
		}

		if (!canMove){
			this.board.add(this.curPiece);
			this.generatePiece();
		}

		requestAnimationFrame(this.play.bind(this));
	};

	Tetris.Game.prototype.keyHandler = function(){
		
		for(var key in this.keysDown) {
			if ( key == Tetris.Z) {
				this.curPiece.rotateLeft();
			} else if (key == Tetris.X) {
				this.curPiece.rotateRight();
			} else if (key == Tetris.LEFT){
				this.curPiece.moveLeft();
			} else if (key == Tetris.RIGHT){
				this.curPiece.moveRight();
			}
		}

		this.keysDown = {};
	};

})();