(function(){

	Tetris.Board = function(opt){

		this.ctx = opt.ctx;

		this.grid = new Array(Tetris.BOARD_HEIGHT);
		for(var row = 0; row < Tetris.BOARD_HEIGHT; row++) {
			this.grid[row] = new Array(Tetris.BOARD_WIDTH);
			for(var col = 0; col < Tetris.BOARD_WIDTH; col++) {
				this.grid[row][col] = new Tetris.Block({color: Tetris.EMPTY});
			}
		}

		this.initBorders();
	};

	Tetris.Board.prototype.clear = function(x,y){
		this.grid[y][x].color = Tetris.EMPTY;
	}

	Tetris.Board.prototype.get = function(x,y) {
		return this.grid[y][x];
	};

	Tetris.Board.prototype.set = function(x,y,c) {
		this.grid[y][x].color = c;
	};

	Tetris.Board.prototype.add = function(piece) {
		var curShape = piece.shapes[piece.current]

		for (var row = 0; row < curShape.length; row++){
			for (var col = 0; col < curShape[row].length; col++ ) {
				if (curShape[row][col]) {	
					this.set( col + piece.x, row + piece.y, piece.color);
				}
			}
		}
	};

	Tetris.Board.prototype.initBorders = function(){
		for(var x = 0; x < Tetris.BOARD_WIDTH; x++ ){
			this.set(x, Tetris.BOARD_HEIGHT - 1, Tetris.BORDER_BLOCK);
		}

		for(var y = 0; y < Tetris.BOARD_HEIGHT; y++ ){
			this.set(0, y, Tetris.BORDER_BLOCK);
			this.set(Tetris.BOARD_WIDTH - 1, y, Tetris.BORDER_BLOCK);
		}
	};

	Tetris.Board.prototype.draw = function() {
		for(var y = 0; y < Tetris.BOARD_HEIGHT; y++){
			for(var x = 0; x < Tetris.BOARD_WIDTH; x++){
				this.get(x,y).draw(x,y, this.ctx);
			}
		}
	};

})();