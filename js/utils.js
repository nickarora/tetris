(function() {

  Tetris.Util = function() {};

  Tetris.Util.prototype.inherits = function(ChildClass, ParentClass) {
    var Surrogate = function() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  }

  Tetris.util = new Tetris.Util();
  
})();