(function(){

	Tetris.Menu = function(opt){
		this.game = opt.game;
		this.ctx = opt.game.ctx;
	}

	Tetris.Menu.prototype.run = function(){
		this.draw();

		if (Object.keys(this.game.keysDown).length > 0) {
			this.game.initNewGame();	
			return;
  	}
  
  	requestAnimationFrame(this.run.bind(this));
	}

	Tetris.Menu.prototype.draw = function(){
		this.game.wipeBg();
		Tetris.BMF.write("super", 135, 65, 'bubble', this.ctx, 'center');
		Tetris.BMF.write("TETRIS", 135, 105, 'bubble', this.ctx, 'center');

		Tetris.BMF.write("play", 145, 175, 'eightbit_w', this.ctx, 'center');
		Tetris.BMF.write("high scores", 145, 195, 'eightbit_w', this.ctx, 'center');
	}

})();