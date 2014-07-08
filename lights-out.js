var numMoves = 0;

$(document).ready(function(){
    createGameBoard(10, 10);
		
	randomizeLights(10);
	
	attachClickHandler();
});

createGameBoard = function(width, height) {
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

attachClickHandler = function() {
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