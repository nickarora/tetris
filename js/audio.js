(function(){

	Tetris.Audio = function(){
		var that = this;

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
  		urls: ['./sounds/line-remove.mp3']
		});

		this.tetris = new Howl({
  		urls: ['./sounds/line-removal4.mp3']
		});

		this.select = new Howl({
  		urls: ['./sounds/select.mp3']
		});

		this.whoosh = new Howl({
  		urls: ['./sounds/whoosh.mp3']
		});

		this.gameover = new Howl({
  		urls: ['./sounds/gameover.mp3'],
  		onend: function(){
  			that.music.play();
  		}
		});

		this.start = new Howl({
  		urls: ['./sounds/start.mp3']
		});

		this.pause = new Howl({
  		urls: ['./sounds/pause.mp3']
		});

		this.music = new Howl({
		  urls: ['./sounds/music.mp3'],
		  volume: 0.25,
  		onend: function(){
  			that.music.play();
  		}
		});
	};

})()