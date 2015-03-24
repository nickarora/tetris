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
		Tetris.BMF.write("super", 195, 65, 'bubble', this.ctx, 'right');
		Tetris.BMF.write("TETRIS", 215, 105, 'bubble', this.ctx, 'right');
	}

})();