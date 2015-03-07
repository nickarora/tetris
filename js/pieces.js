(function(){

	Tetris.LinePiece = function(){
		this.shapes = [
	    [[0,0,0,0],
	     [0,0,0,0],
	     [1,1,1,1]],
	    [[0,1,0],
	     [0,1,0],
	     [0,1,0],
	     [0,1,0]] 
		];

		var opt = { 
			x: 4, 
			y: 2,
			color: Tetris.BLOCKCOLORS.LINE
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.SquarePiece = function(){
		this.shapes = [
			[[1,1],
			 [1,1]]
		];

		var opt = { 
			x: 4, 
			y: 2,
			color: Tetris.BLOCKCOLORS.SQUARE
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.ZPiece = function(){
		this.shapes = [
      [[1,1,0],
       [0,1,1]],
      [[0,1],
       [1,1],
       [1,0]]
		];

		var opt = { 
			x: 4, 
			y: 2,
			color: Tetris.BLOCKCOLORS.Z
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.SPiece = function(){

		this.shapes = [
		 	[[0,1,1],
	     [1,1,0]],
	    [[1,0],
	     [1,1],
	     [0,1]]
		];

		var opt = { 
			x: 4, 
			y: 2,
			color: Tetris.BLOCKCOLORS.S
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.LPiece = function(){
		this.shapes = [
      [[0,0,0],
       [1,1,1],
       [1,0,0]],
      [[1,1,0],
       [0,1,0],
       [0,1,0]],
      [[0,0,1],
       [1,1,1],
       [0,0,0]],
      [[0,1,0],
       [0,1,0],
       [0,1,1]]
		];

		var opt = { 
			x: 4, 
			y: 2,
			color: Tetris.BLOCKCOLORS.L
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.JPiece = function(){
		this.shapes = [
      [[0,0,0],
       [1,1,1],
       [0,0,1]],
      [[0,1,0],
       [0,1,0],
       [1,1,0]],
      [[1,0,0],
       [1,1,1],
       [0,0,0]],
      [[0,1,1],
       [0,1,0],
       [0,1,0]]
		];

		var opt = { 
			x: 4, 
			y: 2,
			color: Tetris.BLOCKCOLORS.J
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.TPiece = function(){
		this.shapes = [
      [[0,0,0],
       [1,1,1],
       [0,1,0]],
      [[0,1,0],
       [1,1,0],
       [0,1,0]],
      [[0,1,0],
       [1,1,1],
       [0,0,0]],
      [[0,1,0],
       [0,1,1],
       [0,1,0]]		
		];

		var opt = { 
			x: 4, 
			y: 2,
			color: Tetris.BLOCKCOLORS.T
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.util.inherits(Tetris.LinePiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.SquarePiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.ZPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.SPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.LPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.JPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.TPiece, Tetris.Piece);

})();