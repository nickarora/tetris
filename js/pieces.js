(function(){

	Tetris.LinePiece = function(ctx, board){
		this.shapes = [
	    [[0,0,0,0],
	     [0,0,0,0],
	     [1,1,1,1]],
	    [[0,1,0],
	     [0,1,0],
	     [0,1,0],
	     [0,1,0]] 
		];

		this.offsetx = 13.5;
		this.offsety = 10.5;

		var opt = { 
			x: 4, 
			y: 2,
			ctx: ctx,
			board: board,
			color: Tetris.BLOCKCOLORS.LINE
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.SquarePiece = function(ctx, board){
		this.shapes = [
			[[1,1],
			 [1,1]]
		];

		this.offsetx = 14.5;
		this.offsety = 12;

		var opt = { 
			x: 4, 
			y: 2,
			ctx: ctx,
			board: board,
			color: Tetris.BLOCKCOLORS.SQUARE
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.ZPiece = function(ctx, board){
		this.shapes = [
      [[1,1,0],
       [0,1,1]],
      [[0,1],
       [1,1],
       [1,0]]
		];

		this.offsetx = 14;
		this.offsety = 12;	

		var opt = { 
			x: 4, 
			y: 2,
			ctx: ctx,
			board: board,
			color: Tetris.BLOCKCOLORS.Z
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.SPiece = function(ctx, board){

		this.shapes = [
		 	[[0,1,1],
	     [1,1,0]],
	    [[1,0],
	     [1,1],
	     [0,1]]
		];

		this.offsetx = 14;
		this.offsety = 12;

		var opt = { 
			x: 4, 
			y: 2,
			ctx: ctx,
			board: board,
			color: Tetris.BLOCKCOLORS.S
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.LPiece = function(ctx, board){
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

		this.offsetx = 14;
		this.offsety = 11;

		var opt = { 
			x: 4, 
			y: 2,
			ctx: ctx,
			board: board,
			color: Tetris.BLOCKCOLORS.L
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.JPiece = function(ctx, board){
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

		this.offsetx = 14;
		this.offsety = 11;

		var opt = { 
			x: 4, 
			y: 2,
			ctx: ctx,
			board: board,
			color: Tetris.BLOCKCOLORS.J
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.TPiece = function(ctx, board){
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

		this.offsetx = 14;
		this.offsety = 11;

		var opt = { 
			x: 4, 
			y: 2,
			ctx: ctx,
			board: board,
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