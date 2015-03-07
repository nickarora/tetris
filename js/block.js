(function(){

	Tetris.Block = function(opt) {
		this.color = opt.color;
	};

	Tetris.Block.prototype.draw = function(x, y, ctx) {
		var px = x * Tetris.TILESIZE;
		var py = y * Tetris.TILESIZE;

		ctx.beginPath();
    ctx.rect(px, py, Tetris.TILESIZE, Tetris.TILESIZE);
    ctx.fillStyle = this.getRandomColor();
    ctx.fill();
    ctx.stroke();
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