(function(){

  Tetris.ParticleEffects = function(opt){
    this.ctx = opt.ctx;
    this.emitters = [];
    this.canvasHelper = new EPSY.CanvasHelper(this.ctx);

    this.blockConfig = new Array(4);
    this.initBlockConfig();

    this.explodeConfig = new Array(4);
    this.initExplodeConfig();

    this.blockCount = 0;
  }

  Tetris.ParticleEffects.prototype.initBlockConfig = function(){
    for(var i = 0; i < 4; i++ ){
      this.blockConfig[i] = [{"pos":{"x":0,"y":0},"posVar":{"x":8,"y":0},"speed":1,"speedVar":0,"angle":0,"angleVar":0,"life":0.7,"lifeVar":0,"radius":4,"radiusVar":0,"textureAdditive":true,"startScale":.9,"startScaleVar":0,"endScale":.9,"endScaleVar":0,"startColor":[66,70,119,.4],"startColorVar":[0,0,0,0],"endColor":[0,0,0,0],"endColorVar":[0,0,0,0],"colorList":[],"gravity":{"x":0,"y":-200},"radialAccel":0,"radialAccelVar":0,"tangentialAccel":0,"tangentialAccelVar":0,"texture":"./images/particle.png","totalParticles":25,"emissionRate":25,"xEquation":"","yEquation":"","textureEnabled":true,"active":true,"duration":null,"id":"landblock","aFactor":{"x":0,"y":0},"xFactor":{"x":0,"y":0}, "zIndex":1}];
    }
  };

  Tetris.ParticleEffects.prototype.initExplodeConfig = function(){
    for(var i = 0; i < 4; i++){
      this.explodeConfig[i] = [{"pos":{"x":0,"y":0},"posVar":{"x":160,"y":16},"speed":20,"speedVar":0,"angle":90,"angleVar":20,"life":1,"lifeVar":0,"radius":10,"radiusVar":0,"textureAdditive":false,"startScale":2.5,"startScaleVar":0,"endScale":2.5,"endScaleVar":0,"startColor":[255,255,255,.4],"startColorVar":[0,0,0,0],"endColor":[0,0,0,0],"endColorVar":[0,0,0,0],"colorList":[],"gravity":{"x":0,"y":500},"radialAccel":0,"radialAccelVar":0,"tangentialAccel":0,"tangentialAccelVar":0,"texture":"./images/particle.png","totalParticles":50,"emissionRate":250,"xEquation":"","yEquation":"","textureEnabled":false,"active":true,"duration":null,"cycles":1, "id":"rowexplode","aFactor":{"x":0,"y":0},"xFactor":{"x":0,"y":0},"border":{"top":400,"left":200,"bottom":200,"right":200},"zIndex":1}]
    }
  }

  Tetris.ParticleEffects.prototype.updateState = function(){
    if ( this.blockCount > 0) { this.blockCount--; }
    if (!this.blockCount && this.canvasHelper.emitters.length){ 
      this.removeBlockEmitters(); };
  }

  Tetris.ParticleEffects.prototype.draw = function(){
    this.updateState();
    this.canvasHelper.draw();
  };

  Tetris.ParticleEffects.prototype.addExplosions = function(rows){
    this.removeBlockEmitters();
    this.initExplodeConfig();

    var e = 0;
    for (var i=0; i < rows.length; i++){
      this.addExplosion(i,e)
      e++;
    }
  };

  Tetris.ParticleEffects.prototype.addExplosion = function(row, e){    
    var px = Tetris.TILESIZE;
    var py = y * Tetris.TILESIZE;
    this.canvasHelper.loadSystem(this.explodeConfig[e], px, py);
  };

  Tetris.ParticleEffects.prototype.addBlockEmitters = function(positions){
    this.removeBlockEmitters();
    this.initBlockConfig(); 

    var e = 0;
    for (var i=0; i < positions.length; i++){
      this.addBlockEmitter(positions[i][1], positions[i][0], e);
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
    var positions = []

    for (var row = 0; row < curShape.length; row++){
      for (var col = 0; col < curShape[row].length; col++ ) {
        if (row == 0 && curShape[row][col]) {
          positions.push([row + piece.y, col + piece.x])
        } else if (row && !curShape[row-1][col] && curShape[row][col]) {
          positions.push([row + piece.y, col + piece.x])
        }
      }
    }

    this.addBlockEmitters(positions);
  };

  Tetris.ParticleEffects.prototype.removeBlockEmitters = function(){
    this.canvasHelper.emitters = [];
  };
  
})();