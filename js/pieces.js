(function(){

	Tetris.blockColors = {
	  'L' 			: '1',
	  'J' 			: '2',
	  'LINE' 		: '3',
	  'S' 			: '4',
	  'Z' 			: '5',
	  'SQUARE'	: '6',
	  'T'				: '7'
  }

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

		this.color = Tetris.blockColors.LINE;
	}

	Tetris.SquarePiece = function(){
		this.shapes = [
			[[1,1],
			 [1,1]]
		];

		this.color = Tetris.blockColors.SQUARE;
	}

	Tetris.ZPiece = function(){
		this.shapes = [
      [[1,1,0],
       [0,1,1]],
      [[0,1],
       [1,1],
       [1,0]]
		];

		this.color = Tetris.blockColors.Z;
	}

	Tetris.SPiece = function(){

		this.shapes = [
		 	[[0,1,1],
	     [1,1,0]],
	    [[1,0],
	     [1,1],
	     [0,1]]
		];

		this.color = Tetris.blockColors.S;
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

		this.color = Tetris.blockColors.L;
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

		this.color = Tetris.blockColors.J;
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

		this.color = Tetris.blockColors.T;
	}

	Tetris.util.inherits(Tetris.LinePiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.SquarePiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.ZPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.SPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.LPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.JPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.TPiece, Tetris.Piece);

})();