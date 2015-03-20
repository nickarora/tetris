(function(){

	Tetris.Board = function(opt){

		this.ctx = opt.ctx;
		this.particles = opt.particles;
		this.game = opt.game;

		this.grid = new Array(Tetris.BOARD_HEIGHT);
		for(var row = 0; row < Tetris.BOARD_HEIGHT; row++) {
			this.grid[row] = new Array(Tetris.BOARD_WIDTH);
			for(var col = 0; col < Tetris.BOARD_WIDTH; col++) {
				this.grid[row][col] = new Tetris.Block({color: Tetris.EMPTY});
			}
		}

		this.initBorders();
		this.completed = [];
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
					this.get( col + piece.x, row + piece.y).counter = Tetris.FLASH_DURATION;
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
		if (!this.exploding() && this.completed.length) { 
			this.removeCompletedRows(); 
		}
		
		for(var y = 0; y < Tetris.BOARD_HEIGHT; y++){
			for(var x = 0; x < Tetris.BOARD_WIDTH; x++){
				this.get(x,y).draw(x,y, this.ctx);
			}
		}
	};

	Tetris.Board.prototype.update = function() {
		completed = []

		for (var row = 0; row < Tetris.BOARD_HEIGHT - 1; row++){
			var complete = true
			for (var col = 1; col < Tetris.BOARD_WIDTH - 1; col++){
				if (!this.get(col, row).color) {
					complete = false;
				}
			}
			if (complete) { completed.push(row) }
		}

		if (completed.length){
			this.animateCompletedRows(completed);
		}

	};

	Tetris.Board.prototype.animateCompletedRows = function(completed) {
		this.particles.removeBlockEmitters();

		for(i=0; i < completed.length; i++){
			y = completed[i];

			for(x=0; x < Tetris.BOARD_WIDTH - 1; x++){
				this.get(x, y).explodeAnimation = true;
				this.get(x, y).counter = Tetris.FLASH_DURATION;
			}	
		}

		this.completed = this.completed.concat(completed);
		this.updateScore(completed.length);
	};

	Tetris.Board.prototype.updateScore = function(n){
		switch(n){
			case 1:
				this.game.score += 1;
				break;
			case 2:
				this.game.score += 3;
				break;
			case 3:
				this.game.score += 5;
				break;
			case 4:
				this.game.score += 8;
				break;
		}

		this.game.updateLevel(n);
	};

	Tetris.Board.prototype.removeCompletedRows = function(){
		for(i=0; i < this.completed.length; i++){
			this.remove(this.completed[i]); 	
		}

		this.particles.addExplosions(this.completed);
		this.particles.blockCount = Tetris.FLASH_DURATION * 2;
		this.completed = [];
	};

	Tetris.Board.prototype.exploding = function(){
		for (var y = Tetris.BOARD_HEIGHT - 2; y >= 0; y--){
			for (var x = 1; x < Tetris.BOARD_WIDTH - 1; x++){
				if (this.get(x, y).explodeAnimation) { return true; }
			}
		}

		return false;
	};

	Tetris.Board.prototype.remove = function(row) {
		for (var y = row; y >= 1; y--){
			for (var x = 1; x < Tetris.BOARD_WIDTH - 1; x++){
				this.set(x,y, this.get(x,y - 1).color)
			}
		}
	};

})();