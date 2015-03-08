(function(){

	Tetris.Game.prototype.loadImages = function(){
		
		var blocks = Array.apply(null, Array(1)).map(function() { return new Image() });
		var mainImg = new Image();

		blocks[0].src = "images/block-l.png"
		mainImg.src = "images/maintiles.png"

		for ( var i = 0; i < blocks.length; i++ ){
			blocks[i].onload = function(e) {
				switch ($(e.target).attr('src')){
					case "images/block-l.png":
						Tetris.LBlocks = Tetris.initTiles(e.target);
						break;		
				}
  		};
		}
  	
  	mainImg.onload = (function(){
  		Tetris.initMainTiles(mainImg);
  		this.menu();
  	}).bind(this);
  	
	};

})();