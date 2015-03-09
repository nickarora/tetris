(function(){

	if (typeof window.Tetris === "undefined") {
		window.Tetris = {};
	}

	Tetris.TILESIZE = 16;
	Tetris.BOARD_HEIGHT = 20;
	Tetris.BOARD_WIDTH = 12;

	Tetris.EMPTY = 0;

	Tetris.BLOCKCOLORS = {
	  'L' 			: 1,
	  'J' 			: 2,
	  'LINE' 		: 3,
	  'S' 			: 4,
	  'Z' 			: 5,
	  'SQUARE'	: 6,
	  'T'				: 7
  };

  Tetris.BORDER_BLOCK = 9;

  Tetris.LBlocks = [];
  Tetris.JBlocks = [];
  Tetris.LineBlocks = [];
  Tetris.SquareBlocks = [];
  Tetris.ZBlocks = [];
  Tetris.SBlocks = [];
  Tetris.TBlocks = [];

  /* Key Codes */
  Tetris.LEFT = 37;
  Tetris.UP = 38;
  Tetris.RIGHT = 39;
  Tetris.DOWN = 40;
  Tetris.Z = 122;
  Tetris.X = 120;

  /* Speeds */
  Tetris.FASTMOVE = 3;
  Tetris.LEVEL1 = 30;
	
})();