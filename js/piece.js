(function(){	

	Tetris.Piece = function(opt){
		this.x = opt.x;
		this.y = opt.y;
		this.ctx = opt.ctx;
		this.board = opt.board;
		this.color = opt.color;
		this.current = 0;
	};

	Tetris.Piece.prototype.draw = function() {

		var curShape = this.shapes[this.current]

		for (var row = 0; row < curShape.length; row++){
			for (var col = 0; col < curShape[row].length; col++ ) {
				if (curShape[row][col]) {	
					var block = new Tetris.Block({ color: this.color })
					block.draw(col + this.x, row + this.y, this.ctx);
				}
			}
		}
	};

	Tetris.Piece.prototype.rotateRight = function() {
		var newShape = this.current + 1;
		if (newShape >= this.shapes.length) { newShape = 0; }
		if (this.checkCollision(this.x, this.y, newShape)){
			this.current = newShape;
		}
	}

	Tetris.Piece.prototype.rotateLeft = function() {
		var newShape = this.current - 1;
		if (newShape < 0) { newShape = this.shapes.length - 1; }
		if (this.checkCollision(this.x, this.y, newShape)){
			this.current = newShape;
		}
	}

	Tetris.Piece.prototype.move = function() {
		if (this.checkCollision(this.x, this.y + 1, this.current)){
			this.y++;
			return true;
		} else {
			return false;
		}
	}

	Tetris.Piece.prototype.moveLeft = function() {
		if (this.checkCollision(this.x - 1, this.y, this.current)){
			this.x--;	
		}
	}

	Tetris.Piece.prototype.moveRight = function() {
		if (this.checkCollision(this.x + 1, this.y, this.current)){
			this.x++;
		}
	}

	Tetris.Piece.prototype.checkCollision = function(x,y,cur){
		var testShape = this.shapes[cur]

		for (var row = 0; row < testShape.length; row++){
			for (var col = 0; col < testShape[row].length; col++ ) {
				if (testShape[row][col]) {	
					if (this.board.get(col + x, row + y).color){
						return false;
					}
				}
			}
		}

		return true;
	}
	
})();