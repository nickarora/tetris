(function(){

	Tetris.Game = function(canvas){
		this.ctx = canvas.getContext("2d");

		this.particles = new Tetris.ParticleEffects({ctx: this.ctx});
		this.board = new Tetris.Board({ ctx: this.ctx, particles: this.particles, game: this });

		this.nextPiece = null;
		this.curPiece = null;
		this.loadImages();

		this.fastmove = false;
		this.fastmoveEnabled = true;
		this.keysDown = {};

		this.score = 0;

		this.history = [
			Math.floor(Math.random()*7),
			Math.floor(Math.random()*7),
			Math.floor(Math.random()*7),
			Math.floor(Math.random()*7)
		];
	};

	Tetris.Game.prototype.generatePiece = function(){
		
		var selected = -1

		while (selected < 0 || this.history.indexOf(selected) >= 0 ){
			selected = Math.floor(Math.random()*7);	
		}

		this.history.push(selected);
		this.history.shift();
		
		switch(selected){
			case 0:
			this.nextPiece = new Tetris.LPiece(this.ctx, this.board);
			break;
			case 1:
			this.nextPiece = new Tetris.JPiece(this.ctx, this.board);
			break;
			case 2:
			this.nextPiece = new Tetris.LinePiece(this.ctx, this.board);
			break;
			case 3:
			this.nextPiece = new Tetris.SPiece(this.ctx, this.board);
			break;
			case 4:
			this.nextPiece = new Tetris.ZPiece(this.ctx, this.board);
			break;
			case 5:
			this.nextPiece = new Tetris.SquarePiece(this.ctx, this.board);
			break;
			case 6:
			this.nextPiece = new Tetris.TPiece(this.ctx, this.board);
			break;
		}
	};

	Tetris.Game.prototype.getNextPiece = function(){
		this.curPiece = this.nextPiece;
	};

	Tetris.Game.prototype.menu = function() {
		this.bindListeners();
		this.generatePiece();

		this.getNextPiece();
		this.generatePiece();

		this.level = 0;
		this.nextLevelCount = Tetris.LEVELUP;
		this.speed = Tetris.LEVEL[this.level];
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
    	if (event.keyCode == Tetris.DOWN || event.keyCode == Tetris.DROP) { 
    		that.fastmove = false;
    		that.fastmoveEnabled = true;
    		that.moveCounter = 0; 
    	}
      delete that.keysDown[event.keyCode];
    });
  };

	Tetris.Game.prototype.play = function() {
		
		this.clearBg();
		this.board.draw();
		this.particles.draw();
		this.showScore();
		this.showLevel();
		this.nextPiece.preview();

		if (!this.board.exploding()){
			this.curPiece.draw();
			this.moveCounter++;
			if (this.moveCounter > 60) { this.moveCounter = 1; }		
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
		}
		
		requestAnimationFrame(this.play.bind(this));
	};

	Tetris.Game.prototype.clearBg = function(){
		Tetris.bg.draw(this.ctx, 0, 0);
	};

	Tetris.Game.prototype.showScore = function(){
  	var strScore = this.score.toString();
  	Tetris.BMF.write(strScore, 275, 45, 'eightbit', this.ctx, 'right');
	}

	Tetris.Game.prototype.showLevel = function(){
  	var strLevel = (this.level + 1).toString();
  	Tetris.BMF.write(strLevel, 275, 105, 'eightbit', this.ctx, 'right');
	}

	Tetris.Game.prototype.attemptBlockMove = function() {
		var canMove = true;
		canMove = this.curPiece.move();
		if (!canMove){ 
			this.landBlock(); 
			return false;
		}
		return true;
	};

	Tetris.Game.prototype.dropBlock = function(){
		this.curPiece.drop();
		this.landBlock();
	}

	Tetris.Game.prototype.landBlock = function() {
		this.board.add(this.curPiece);
		if (this.fastmove) { 
			this.particles.add(this.curPiece); 
			this.fastmove = false;
			this.fastmoveEnabled = false;
		}
		
		this.board.update();
		this.getNextPiece();
		this.generatePiece();
	};

	Tetris.Game.prototype.updateLevel = function(n){
		if (this.level == Tetris.LEVEL.length - 1) { return; }

		this.nextLevelCount -= n;

		if (this.nextLevelCount <= 0){
			this.nextLevelCount = Tetris.LEVELUP;
			this.level += 1;
			this.speed = Tetris.LEVEL[this.level];
		}
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
			} else if (key == Tetris.DROP && this.fastmoveEnabled){
				this.fastmove = true;
				this.dropBlock();
			}
		}

		this.keysDown = {};
	};

})();