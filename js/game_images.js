(function(){

	Tetris.Game.prototype.loadImages = function(){
		
		var blocks = Array.apply(null, Array(7)).map(function() { return new Image() });
		var mainImg = new Image();
		var bgImg = new Image();

		blocks[0].src = "images/block-l.png"
		blocks[1].src = "images/block-j.png"
		blocks[2].src = "images/block-line.png"
		blocks[3].src = "images/block-s.png"
		blocks[4].src = "images/block-z.png"
		blocks[5].src = "images/block-square.png"
		blocks[6].src = "images/block-t.png"
		mainImg.src = "images/maintiles.png"
		bgImg.src = "images/bg.png"

		for ( var i = 0; i < blocks.length; i++ ){
			blocks[i].onload = function(e) {
				switch ($(e.target).attr('src')){
					case "images/block-l.png":
						Tetris.LBlocks = Tetris.initTiles(e.target);
						break;
					case "images/block-j.png":
						Tetris.JBlocks = Tetris.initTiles(e.target);
						break;
					case "images/block-line.png":
						Tetris.LineBlocks = Tetris.initTiles(e.target);
						break;
					case "images/block-s.png":
						Tetris.SBlocks = Tetris.initTiles(e.target);
						break;
					case "images/block-z.png":
						Tetris.ZBlocks = Tetris.initTiles(e.target);
						break;
					case "images/block-square.png":
						Tetris.SquareBlocks = Tetris.initTiles(e.target);
						break;
					case "images/block-t.png":
						Tetris.TBlocks = Tetris.initTiles(e.target);
						break;
				}
  		};
		}

  	bgImg.onload = (function(){
  		Tetris.initBG(bgImg);
  	}).bind(this);
  	
  	mainImg.onload = (function(){
  		Tetris.initMainTiles(mainImg);
  		this.menu();
  	}).bind(this);
  	
	};

})();