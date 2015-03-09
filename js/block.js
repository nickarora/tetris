(function(){

	Tetris.Block = function(opt) {
		this.color = opt.color;
	};

	Tetris.Block.prototype.draw = function(x, y, ctx) {
		var px = x * Tetris.TILESIZE;
		var py = y * Tetris.TILESIZE;
		this.getSprite().draw(ctx, px, py);
	};

	Tetris.Block.prototype.getSprite = function(){
		switch(this.color) {
    case 0:
      return Tetris.bgBlock;
    case 1:
    	return Tetris.LBlocks[0];
    case 2:
    	return Tetris.JBlocks[0];
    case 3:
    	return Tetris.LineBlocks[0];
    case 4:
    	return Tetris.SBlocks[0];
    case 5:
    	return Tetris.ZBlocks[0];
    case 6:
    	return Tetris.SquareBlocks[0];
    case 7:
    	return Tetris.TBlocks[0];
    case 9:
      return Tetris.borderBlock;
    default:
      return Tetris.bgBlock;
		}
	};

	Tetris.Block.prototype.getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
	}

})();