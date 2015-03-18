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
		var shadow = this.locateLowest();

		for (var row = 0; row < curShape.length; row++){
			for (var col = 0; col < curShape[row].length; col++ ) {
				if (curShape[row][col]) {	
					var block = new Tetris.Block({ color: this.color })
					var shadowBlock = new Tetris.Block({ color: this.color, shadow: true })
					
					shadowBlock.draw(col + shadow[0], row + shadow[1], this.ctx);	
					block.draw(col + this.x, row + this.y, this.ctx);
				}
			}
		}

	};

	Tetris.Piece.prototype.preview = function() {
		var curShape = this.shapes[this.current];

		for (var row = 0; row < curShape.length; row++){
			for (var col = 0; col < curShape[row].length; col++ ) {
				if (curShape[row][col]) {	
					var block = new Tetris.Block({ color: this.color })
					block.draw(col + this.offsetx, row + this.offsety, this.ctx);
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

	Tetris.Piece.prototype.drop = function() {
		var lowest = this.locateLowest();
		this.y = lowest[1];
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
		var testShape = this.shapes[cur];

		for (var row = 0; row < testShape.length; row++){
			for (var col = 0; col < testShape[row].length; col++ ) {
				if (col + x > Tetris.BOARD_WIDTH - 1) { continue; }
				if (row + y > Tetris.BOARD_HEIGHT - 1) { continue; }
				if (testShape[row][col]) {	
					if (this.board.get(col + x, row + y).color){
						return false;
					}
				}
			}
		}

		return true;
	};

	Tetris.Piece.prototype.height = function(){
		var testShape = this.shapes[this.current]
		var height = 0;
		
		for(var y = 0; y < testShape.length; y++){
			if (testShape[y].indexOf(1) != -1) { height++; }
		}
		return height;
	};

	Tetris.Piece.prototype.locateLowest = function(){

		var testShape = this.shapes[this.current]
		var lowestRow = Tetris.BOARD_HEIGHT - 1 - this.height();

		hitY = null;

		for (var y = this.y+1; y <= lowestRow; y++){
			if (!this.checkCollision(this.x, y, this.current)){
				hitY = y - 1;
				break;
			}
			hitY = y;
		}

		return [this.x, hitY];
	}
	
})();