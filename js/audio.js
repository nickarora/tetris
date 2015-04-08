(function(){

	Tetris.Audio = function(){
		this.blockRotate = new Howl({
  		urls: ['./sounds/block-rotate.mp3']
		});

		this.slowHit = new Howl({
  		urls: ['./sounds/slow-hit.mp3']
		});

		this.forceHit = new Howl({
  		urls: ['./sounds/force-hit.mp3']
		});

		this.lineDrop = new Howl({
  		urls: ['./sounds/line-drop.mp3']
		});

		this.lineRemove = new Howl({
  		urls: ['./sounds/line-remove.ogg']
		});

		this.tetris = new Howl({
  		urls: ['./sounds/line-removal4.mp3']
		});

		this.select = new Howl({
  		urls: ['./sounds/select.mp3']
		});

	};
})()