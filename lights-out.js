var numMoves = 0;
var width = 5;
var height = 5;

$(document).ready(function(){
    startGame();
});

startGame = function() {
	numMoves = 0;
	$('.moves').text(numMoves);
    createGameBoard(width, height);
		
	randomizeLights(Math.floor(Math.random() * (width * height) - 1) + 1);
	
	attachClickHandlers();
}

getGameBoardSize = function() {
	width = $('.width').val();
	height = $('.height').val();
}

createGameBoard = function(width, height) {
	$(".game-board").empty();
	
	for(i=0;i<height;i++) {
	   $(".game-board").append("<div class='row'></div>")
	}
    
	$(".row").each(function() {
		for(i=0;i<width;i++) {
	    	$(this).append("<div class='circle'></div>")
		}    
	});
}

randomizeLights = function(numberToTurnOn) {
	randomElements = $(".circle").get().sort(function(){ 
	  return Math.round(Math.random())-0.5
	}).slice(0,numberToTurnOn);
	
	$(randomElements).toggleClass('on');
}

attachClickHandlers = function() {
	$('input').off();
	$('input').on('click', function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		
		getGameBoardSize();
		
		startGame();
	});
	
	$('.container').undelegate();
    $('.container').delegate('.circle', 'click', function() {
        $(this).toggleClass('on');
		$(this).next().toggleClass('on');
		$(this).prev().toggleClass('on');
		
		var index = $(this).parent().children().index(this);
		
		var element = $(this).parent().prev().children()[index];
		toggleLight(element);
		
		var element = $(this).parent().next().children()[index];
		toggleLight(element);
		
		if(!didWin()) {
			$('.moves').text(++numMoves);
		} else {
			alert('success');
		}
    });
}

toggleLight = function(element) {
	$(element).toggleClass('on');
}

didWin = function() {
	return $('.on').length < 1;
}