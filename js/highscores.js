(function(){

	Tetris.showHighScores = function(e){
		if (!$('body').hasClass('show-high-scores')){
			$('body').addClass('show-high-scores');
		}
	};

	Tetris.hideHighScores = function(e){
		$('body').removeClass('show-high-scores');
	};

})()