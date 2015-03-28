(function(){

	Tetris.Menu = function(opt){
		this.game = opt.game;
		this.ctx = opt.game.ctx;
		this.choice = 0;
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
				} else {
					// show highscores!
				}
			}
		}

		this.game.keysDown = {};

  	return true;
	};

	Tetris.Menu.prototype.draw = function(){
		Tetris.BMF.write("super", 135, 65, 'bubble', this.ctx, 'center');
		Tetris.BMF.write("TETRIS", 135, 105, 'bubble', this.ctx, 'center');

		if (this.choice == 0) { 
			this.ctx.fillStyle = "rgb(253,179,43)";
      this.ctx.fillRect (75,172,150,25);
      Tetris.BMF.write("play", 146, 176, 'eightbit', this.ctx, 'center');
			Tetris.BMF.write("play", 145, 175, 'eightbit_w', this.ctx, 'center');
			Tetris.BMF.write("high scores", 145, 205, 'eightbit_w', this.ctx, 'center');
		} else {
			this.ctx.fillStyle = "rgb(253,179,43)";
      this.ctx.fillRect (75,200,150,25);
			Tetris.BMF.write("play", 145, 175, 'eightbit_w', this.ctx, 'center');
			Tetris.BMF.write("high scores", 146, 206, 'eightbit', this.ctx, 'center');
			Tetris.BMF.write("high scores", 145, 205, 'eightbit_w', this.ctx, 'center');
		}
		
	}

})();