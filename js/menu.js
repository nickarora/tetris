(function(){

	Tetris.Menu = function(opt){
		this.game = opt.game;
		this.ctx = opt.game.ctx;
		this.choice = 0;

		$('#close-high-score').click(Tetris.hideHighScores);
		$('#close-how-to-play').click(Tetris.hideHowToPlay);
	};

	Tetris.Menu.prototype.run = function(){
		this.game.wipeBg();
		this.galaxyHandler();
		this.draw();
		if (!this.keyHandler()) return;
  	requestAnimationFrame(this.run.bind(this));
	};

	Tetris.Menu.prototype.galaxyHandler = function(){
		if (this.game.particles.infiniteLoop) {
			this.game.particles.draw();
		} else {
			this.game.particles.removeBlockEmitters();
			this.game.particles.infiniteLoop = true;
			this.game.particles.initGalaxyConfig();
			this.game.particles.addGalaxyEmitter(145,110);
		}
	};

	Tetris.Menu.prototype.keyHandler = function(){
		for(var key in this.game.keysDown) {
			if ( key != Tetris.UP && key != Tetris.DOWN) {
				if (!this.choice){
					this.game.particles.infiniteLoop = false;
					this.game.particles.removeBlockEmitters();
					this.game.initNewGame();	
					return false;	
				} else if (this.choice == 1) {
					Tetris.showHighScores();
				} else if (this.choice == 2) {
					Tetris.showHowToPlay();
				}
			}
		}

		this.game.keysDown = {};

  	return true;
	};

	Tetris.Menu.prototype.clickHandler = function(e){
		var coords = this.getRelativeCoords(e);
		if (this.coordsWithinBounds(coords,75,172,150,25) ||
			  this.coordsWithinBounds(coords,75,200,150,25) || 
			  this.coordsWithinBounds(coords,75,231,150,25)){
			this.game.keysDown[Tetris.DROP] = true;
		} else {
			this.game.keysDown[Tetris.UP] = true;
		}
	};

	Tetris.Menu.prototype.mouseMoveHandler = function(e){
		var coords = this.getRelativeCoords(e);
		if (this.coordsWithinBounds(coords,75,172,150,25)){
			this.choice = 0;
		} else if (this.coordsWithinBounds(coords,75,200,150,25)){
			this.choice = 1;
		} else if (this.coordsWithinBounds(coords,75,231,150,25)) {
			this.choice = 2;
		}
	};

	Tetris.Menu.prototype.coordsWithinBounds = function(coords, topLeftX, topLeftY, width, height){
		var x,y;
		x = coords[0];
		y = coords[1];

		if ( x >= topLeftX && x <= topLeftX + width &&
			   y >= topLeftY && y <= topLeftY + height){
			return true;
		}
		return false;
	};

	Tetris.Menu.prototype.getRelativeCoords = function(e){
		var clickedX, clickedY;
		canoffset = $('canvas').offset();
		clickedX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
		clickedY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;
		clickedX = Math.floor(clickedX * .935);
		clickedY = Math.floor(clickedY * .935);
		return [clickedX, clickedY]
	}

	Tetris.Menu.prototype.draw = function(){
		Tetris.BMF.write("super", 135, 65, 'bubble', this.ctx, 'center');
		Tetris.BMF.write("TETRIS", 135, 105, 'bubble', this.ctx, 'center');

		if (this.choice == 0) { 
			this.ctx.fillStyle = "rgb(253,179,43)";
      this.ctx.fillRect (75,172,150,25);
      Tetris.BMF.write("start game", 146, 176, 'eightbit', this.ctx, 'center');
			Tetris.BMF.write("start game", 145, 175, 'eightbit_w', this.ctx, 'center');
			Tetris.BMF.write("high scores", 145, 205, 'eightbit_w', this.ctx, 'center');
			Tetris.BMF.write("how to play", 145, 235, 'eightbit_w', this.ctx, 'center');
		} else if (this.choice == 1) {
			this.ctx.fillStyle = "rgb(253,179,43)";
      this.ctx.fillRect (75,200,150,25);
			Tetris.BMF.write("start game", 145, 175, 'eightbit_w', this.ctx, 'center');
			Tetris.BMF.write("high scores", 146, 206, 'eightbit', this.ctx, 'center');
			Tetris.BMF.write("high scores", 145, 205, 'eightbit_w', this.ctx, 'center');
			Tetris.BMF.write("how to play", 145, 235, 'eightbit_w', this.ctx, 'center');
		} else if (this.choice == 2) {
			this.ctx.fillStyle = "rgb(253,179,43)";
      this.ctx.fillRect (75,231,150,25);
			Tetris.BMF.write("start game", 145, 175, 'eightbit_w', this.ctx, 'center');
			Tetris.BMF.write("high scores", 145, 205, 'eightbit_w', this.ctx, 'center');
			Tetris.BMF.write("how to play", 146, 236, 'eightbit', this.ctx, 'center');
			Tetris.BMF.write("how to play", 145, 235, 'eightbit_w', this.ctx, 'center');
		}
		
	}

})();