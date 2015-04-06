(function(){
	Tetris.showHowToPlay = function(e){
		if (!$('body').hasClass('show-how-to-play')){
			$('body').addClass('show-how-to-play');
		}
	};

	Tetris.hideHowToPlay = function(e){
		$('body').removeClass('show-how-to-play');
	};
})()