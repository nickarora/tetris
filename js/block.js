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