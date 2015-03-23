(function(){

	Tetris.BitmapFontLoader = function(url, imgUrl){
		this.url = url;
		this.img = new Image();
		this.img.src = imgUrl;
		this.img.onload = (function(){
  		this.load();
  	}).bind(this);
	}

	Tetris.BitmapFontLoader.prototype.load = function(){
		var that = this;
		$.ajax({
			type: "GET",
			url: this.url,
			dataType: "xml",
			success: function(xml){
				that.onXMLLoaded(xml);
			},
			error: function(jq,status,message){
				that.onXMLFail(jq, status, message);
			}
		});
	}

	Tetris.BitmapFontLoader.prototype.onXMLLoaded = function(xml){

		var data = {}
		var info = xml.getElementsByTagName('info')[0];
		var common = xml.getElementsByTagName('common')[0];

		data.font = info.getAttribute('face');
		data.size = parseInt(info.getAttribute('size'), 10);
    data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
    data.chars = {};

    var letters = xml.getElementsByTagName('char');

    for (var i = 0; i < letters.length; i++) {
    	
    	var charCode = parseInt(letters[i].getAttribute('id'), 10);

    	var letterSprite = new Tetris.Sprite(
    		this.img,
    		parseInt(letters[i].getAttribute('x'), 10),
      	parseInt(letters[i].getAttribute('y'), 10),
      	parseInt(letters[i].getAttribute('width'), 10),
     	 	parseInt(letters[i].getAttribute('height'), 10));

    	data.chars[charCode] = {
        xOffset: parseInt(letters[i].getAttribute('xoffset'), 10),
        yOffset: parseInt(letters[i].getAttribute('yoffset'), 10),
        xAdvance: parseInt(letters[i].getAttribute('xadvance'), 10),
        sprite: letterSprite
      };
    }

    Tetris.BMF.fonts[data.font] = data;
	}

	Tetris.BitmapFontLoader.prototype.onXMLFail = function(jq,status,message){
		console.log("ERROR: Unable to Load Bitmap Font");
	}

	Tetris.BitmapText = function(){
		this.fonts = {};
	}

	Tetris.BitmapText.prototype.write = function(text, x, y, font, ctx, align, kearn){
		
		var data = this.fonts[font];
		var pos = 0;
		var prevCharCode = null;
		var chars = [];

		if (!data) { return; }

		for (var i = 0; i < text.length; i++){
			var charCode = text.charCodeAt(i);
			var charData = data.chars[charCode];
			if (!charData) { continue; }
			 
			if (prevCharCode && kearn) { pos += kearn; }

			chars.push({
			 	sprite: charData.sprite,
			 	charCode: charCode,
			 	x: pos + x + charData.xOffset,
			 	y: y + charData.yOffset,
			 	next: pos + x + (charData.xOffset*2)
			})

			pos += charData.xAdvance;
			prevCharCode = charCode;
		}

		var lineOffset = 0;

		if (align && align == 'right'){
			var farX = chars[chars.length-1].next;
			var w = farX - x;
			lineOffset = -w;
		} else if (align && align == 'center'){
			var farX = chars[chars.length-1].next;
			var w = farX - x;
			lineOffset = -Math.floor(w/2);
		}

		for (i = 0; i < chars.length; i++){
			var c = chars[i];
			c.sprite.draw(ctx, c.x + lineOffset, c.y);
		}
	}

	Tetris.BMF = new Tetris.BitmapText();
	new Tetris.BitmapFontLoader('./fonts/eightbit.fnt', './fonts/eightbit.png');
	new Tetris.BitmapFontLoader('./fonts/bubble.fnt', './fonts/bubble.png');
	
})();