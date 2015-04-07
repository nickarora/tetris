(function(){

	Parse.initialize("kUXU2YTJwTSy8v2myucFpCtV8Qlw3mn2x4s8Kx98", "U9UWpI2bNOKkX5jtCIkgimfqd8tueFP3NFqOZFhT");
	Tetris.curHighScores = [];

	Tetris.showHighScores = function(e){
		if (!$('body').hasClass('show-high-scores')){
			$('body').addClass('show-high-scores');
		}
	};

	Tetris.hideHighScores = function(e){
		$('body').removeClass('show-high-scores');
	};

	Tetris.populateHighScores = function(){
		var HighScore = Parse.Object.extend("HighScore");
		var query = new Parse.Query(HighScore);
		query.descending('score');
		query.limit(10);

		query.find({
			success: function(results){
				Tetris.curHighScores = [];
				$('#hs-list').html("");
				var template = Handlebars.compile($('#hs-template').html());
				results.forEach(function(result){
					var q = result.toJSON();
					Tetris.curHighScores.push(q.score);
					$('#hs-list').append(template(q))
				});
			},
			error: function(error){
				console.log(error.message);
			}
		});

	};

	Tetris.saveHighScore = function(e, hs){
		e.preventDefault();
		var HighScore = Parse.Object.extend("HighScore");
		var hs = new HighScore();
		hs.set('name', $(e.target).find('#name').val());
		hs.set('score', Number($('#hs-modal').find('#points').text()));
		hs.save(null, {
			success: function(){
				Tetris.closeHighScoreModal();
			},
			error: function(hs, error){
				console.log(error.message);
			}
		});
	}

	Tetris.openHighScoreModal = function(score){
		$('#points').text(score);
		$('body').addClass('modal-active');
	}

	Tetris.closeHighScoreModal = function(){
		Tetris.populateHighScores();
		$('body').removeClass('modal-active');
	}

	Tetris.minForHS = function(){
		return Math.min.apply(null, Tetris.curHighScores);
	}

})()