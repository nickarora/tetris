(function(){

	Tetris.Game = function(canvas){
		this.ctx = canvas.getContext("2d");
		this.particles = new Tetris.ParticleEffects({ctx: this.ctx});
		this.board = new Tetris.Board({ ctx: this.ctx, particles: this.particles });
		this.curPiece = null;
		this.loadImages();

		this.fastmove = false;
		this.fastmoveEnabled = true;
		this.keysDown = {};

		
	};

	Tetris.Game.prototype.generatePiece = function(){
		selected = Math.floor(Math.random()*7);
		switch(selected){
			case 0:
			this.curPiece = new Tetris.LPiece(this.ctx, this.board);
			break;
			case 1:
			this.curPiece = new Tetris.JPiece(this.ctx, this.board);
			break;
			case 2:
			this.curPiece = new Tetris.LinePiece(this.ctx, this.board);
			break;
			case 3:
			this.curPiece = new Tetris.SPiece(this.ctx, this.board);
			break;
			case 4:
			this.curPiece = new Tetris.ZPiece(this.ctx, this.board);
			break;
			case 5:
			this.curPiece = new Tetris.SquarePiece(this.ctx, this.board);
			break;
			case 6:
			this.curPiece = new Tetris.TPiece(this.ctx, this.board);
			break;
		}
	};

	Tetris.Game.prototype.menu = function() {
		this.bindListeners();
		this.generatePiece();
		this.speed = Tetris.LEVEL1;
		this.moveCounter = 0;
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
    	if (event.keyCode == Tetris.DOWN) { 
    		that.fastmove = false;
    		that.fastmoveEnabled = true;
    		this.moveCounter = 0; 
    	}
      delete that.keysDown[event.keyCode];
    });
  };

	Tetris.Game.prototype.play = function() {
		this.moveCounter++;
		if (this.moveCounter > 60) { this.moveCounter = 1; }

		this.board.draw();
		this.curPiece.draw();
		this.particles.draw();
		this.keyHandler();

		if (this.fastmove) {
			if ( this.moveCounter % Tetris.FASTMOVE == 0 ) { 
				this.attemptBlockMove();
			}
		} else {
			if ( this.moveCounter % this.speed == 0 ) { 
				this.attemptBlockMove();
			}
		}
		
		requestAnimationFrame(this.play.bind(this));
	};

	Tetris.Game.prototype.attemptBlockMove = function() {
		var canMove = true;
		canMove = this.curPiece.move();
		if (!canMove){ 
			this.landBlock(); 
			return false;
		}

		return true;
	};

	Tetris.Game.prototype.landBlock = function() {
		this.board.add(this.curPiece);
		if (this.fastmove) { this.particles.add(this.curPiece); }
		
		this.board.update();
		this.generatePiece();
		
		this.fastmove = false;
		this.fastmoveEnabled = false;
	};

	Tetris.Game.prototype.keyHandler = function(){
		
		for(var key in this.keysDown) {
			if ( key == Tetris.Z) {
				this.curPiece.rotateLeft();
			} else if (key == Tetris.X) {
				this.curPiece.rotateRight();
			} else if (key == Tetris.UP){
				this.curPiece.rotateRight();
			} else if (key == Tetris.LEFT){
				this.curPiece.moveLeft();
			} else if (key == Tetris.RIGHT){
				this.curPiece.moveRight();
			} else if (key == Tetris.DOWN && this.fastmoveEnabled){
				this.fastmove = true;
			}
		}

		this.keysDown = {};
	};

})();