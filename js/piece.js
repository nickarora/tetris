(function(){	

	Tetris.Piece = function(opt){
		this.x = opt.x;
		this.y = opt.y;
		this.ctx = opt.ctx;
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
	
})();