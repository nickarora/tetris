(function(){

	if (typeof window.Tetris === "undefined") {
		window.Tetris = {};
	}

	Tetris.TILESIZE = 16;
	Tetris.BOARD_HEIGHT = 20;
	Tetris.BOARD_WIDTH = 12;

	Tetris.BLOCKCOLORS = {
	  'L' 			: '1',
	  'J' 			: '2',
	  'LINE' 		: '3',
	  'S' 			: '4',
	  'Z' 			: '5',
	  'SQUARE'	: '6',
	  'T'				: '7'
  };
	
})();