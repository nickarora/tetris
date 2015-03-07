(function(){

	Tetris.Board = function(opt){

		this.ctx = opt.ctx;

		this.grid = new Array(Tetris.BOARD_HEIGHT);
		for(var row = 0; row < Tetris.BOARD_HEIGHT; row++) {
			this.grid[row] = new Array(Tetris.BOARD_WIDTH);
			for(var col = 0; col < Tetris.BOARD_WIDTH; col++) {
				this.grid[row][col] = new Tetris.Block({color: 0});
			}
		}
		
	};

	Tetris.Board.prototype.get = function(x,y) {
		return this.grid[y][x];
	};

	Tetris.Board.prototype.set = function(x,y,c) {
		this.grid[y][x] = c;
	};

	Tetris.Board.prototype.draw = function() {
		
		for(var y = 0; y < Tetris.BOARD_HEIGHT; y++){
			for(var x = 0; x < Tetris.BOARD_WIDTH; x++){
				this.get(x,y).draw(x,y, this.ctx);
			}
		}

	};

})();