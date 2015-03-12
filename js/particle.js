(function(){

  Tetris.ParticleEffects = function(opt){
    this.ctx = opt.ctx;
    this.emitters = [];
    this.canvasHelper = new EPSY.CanvasHelper(this.ctx);

    this.blockConfig = new Array(4);
    this.initBlockConfig();

    this.blockCount = 0;
  }

  Tetris.ParticleEffects.prototype.initBlockConfig = function(){
    for(var i = 0; i < 4; i++ ){
      this.blockConfig[i] = [{"pos":{"x":0,"y":0},"posVar":{"x":8,"y":0},"speed":1,"speedVar":0,"angle":0,"angleVar":0,"life":0.7,"lifeVar":0,"radius":4,"radiusVar":0,"textureAdditive":true,"startScale":.5,"startScaleVar":0,"endScale":.5,"endScaleVar":0,"startColor":[66,70,119,.4],"startColorVar":[0,0,0,0],"endColor":[0,0,0,0],"endColorVar":[0,0,0,0],"colorList":[],"gravity":{"x":0,"y":-200},"radialAccel":0,"radialAccelVar":0,"tangentialAccel":0,"tangentialAccelVar":0,"texture":"./images/particle.png","totalParticles":25,"emissionRate":25,"xEquation":"","yEquation":"","textureEnabled":true,"active":true,"duration":null,"id":"landblock","aFactor":{"x":0,"y":0},"xFactor":{"x":0,"y":0}, "zIndex":1}];
    }
  };

  Tetris.ParticleEffects.prototype.updateState = function(){
    if ( this.blockCount > 0) { this.blockCount--; }
    if (!this.blockCount){ this.removeBlockEmitters(); };
  }

  Tetris.ParticleEffects.prototype.draw = function(){
    this.updateState();
    this.canvasHelper.draw();
  };

  Tetris.ParticleEffects.prototype.addBlockEmitters = function(row, cols){
    this.removeBlockEmitters();
    this.initBlockConfig(); 

    var e = 0;
    for (var i=0; i < cols.length; i++){
      this.addBlockEmitter(cols[i], row, e);
      e++;
    }

    this.blockCount = Tetris.BP_DURATION;
  };

  Tetris.ParticleEffects.prototype.addBlockEmitter = function(x,y,e){    
    var px = x * Tetris.TILESIZE + Tetris.TILESIZE/2;
    var py = y * Tetris.TILESIZE - 1;
    this.canvasHelper.loadSystem(this.blockConfig[e], px, py);
  };

  Tetris.ParticleEffects.prototype.add = function(piece){
    var curShape = piece.shapes[piece.current]
    var topRow = -1;
    var topCols = [];

    for (var row = 0; row < curShape.length; row++){
      for (var col = 0; col < curShape[row].length; col++ ) {
        if (topRow >= 0 && topRow < row) { break; }

        if (topRow >= 0 && curShape[row][col]){
          topCols.push(col + piece.x);
        }
        
        if (topRow < 0 && curShape[row][col]) { 
          topRow = row; 
          topCols.push(col + piece.x);
        }
        
      }
    }

    topRow += piece.y;

    this.addBlockEmitters(topRow, topCols);
  };

  Tetris.ParticleEffects.prototype.removeBlockEmitters = function(){
    this.canvasHelper.emitters = [];
  };
  
})();