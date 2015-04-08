(function(){

	Tetris.Game = function(canvas){
		this.ctx = canvas.getContext("2d");

		this.particles = new Tetris.ParticleEffects({ctx: this.ctx});
		this.board = new Tetris.Board({ ctx: this.ctx, particles: this.particles, game: this });
		this.audio = new Tetris.Audio();
	
		this.history = [
			Math.floor(Math.random()*7),
			Math.floor(Math.random()*7),
			Math.floor(Math.random()*7),
			Math.floor(Math.random()*7)
		];

		this.keysDown = {};
		this.bindListeners();
		this.gameOver = true;
		this.menu = new Tetris.Menu({game: this});

		this.initHighScores();
		this.loadImages();
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

	Tetris.Game.prototype.initNewGame = function(){
		this.gameOver = false;
		this.gameOverCounter = 0;

		this.wipeBg();
		this.board.initBoard();

		this.nextPiece = null;
		this.curPiece = null;
		this.generatePiece();
		this.getNextPiece();
		this.generatePiece();

		this.level = 0;
		this.nextLevelCount = Tetris.LEVELUP;
		this.speed = Tetris.LEVEL[this.level];
		this.moveCounter = 0;
		
		this.fastmove = false;
		this.fastmoveEnabled = true;
		this.keysDown = {};

		this.score = 0;

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
    	if (that.gameOver){
    		if (event.keyCode == Tetris.DOWN) { 
    			that.audio.select.play();
    			that.menu.choice += 1;
    			if (that.menu.choice > 2) that.menu.choice = 0;
    		} else if (event.keyCode == Tetris.UP) {
    			that.audio.select.play();
    			that.menu.choice -= 1;
    			if (that.menu.choice < 0) that.menu.choice = 2;
    		}
    	} else {
	    	if (event.keyCode == Tetris.DOWN || event.keyCode == Tetris.DROP) { 
	    		that.fastmove = false;
	    		that.fastmoveEnabled = true;
	    		that.moveCounter = 0; 
	    	}
	      delete that.keysDown[event.keyCode];
    	}
    });

    $('#main').click(function (e) {
    	if (that.gameOver) that.menu.clickHandler(e); 
		});

		$('#main').on('mousemove', function(e){
			if (that.gameOver) that.menu.mouseMoveHandler(e);
		})

  };

  Tetris.Game.prototype.initHighScores = function(){
  	Tetris.populateHighScores();
		$('#close-hs-modal').click(Tetris.closeHighScoreModal);
		$('#new-hs').submit(Tetris.saveHighScore);
  };

	Tetris.Game.prototype.play = function() {
		
		if (!this.gameOver){
			this.clearBg();
			this.board.draw();
			this.particles.draw();
			this.showScore();
			this.showLevel();
			this.nextPiece.preview();
			this.keyHandler();

			if (!this.board.exploding()){
				this.curPiece.draw();
				this.moveCounter++;
				if (this.moveCounter > 60) { this.moveCounter = 1; }		
				

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
		}
	};

	Tetris.Game.prototype.wipeBg = function() {
		this.ctx.fillStyle = 'rgba(0,0,0,1)';
		this.ctx.fillRect(0,0, 304, 320);
	};

	Tetris.Game.prototype.showGameOver = function(){
  	if (this.gameOverCounter < 10){
  		this.gameOverCounter++;
  		this.ctx.fillStyle = 'rgba(50,11,11,0.1)';
  		this.ctx.fillRect(0,0, 304, 320);
  		Tetris.BMF.write("Game", 195, 105, 'bubble', this.ctx, 'right');
  		Tetris.BMF.write("Over", 195, 150, 'bubble', this.ctx, 'right');
  	}

  	if (Object.keys(this.keysDown).length > 0 && this.gameOverCounter >= 10) {
  		this.keysDown = {};
  		if ( this.score > Tetris.minForHS() ){
  			Tetris.openHighScoreModal(this.score);	
  		}
			this.menu.run();
  		return;
  	}

  	requestAnimationFrame(this.showGameOver.bind(this));
	};

	Tetris.Game.prototype.clearBg = function(){
		this.wipeBg();
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
		if (!this.board.add(this.curPiece)){
			this.gameOver = true;
			this.particles.stop();
			this.showGameOver();
		}

		if (this.fastmove) { 
			this.particles.add(this.curPiece); 
			this.fastmove = false;
			this.fastmoveEnabled = false;
			this.audio.forceHit.play();
		} else {
			this.audio.slowHit.play();
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
				this.audio.blockRotate.play();
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