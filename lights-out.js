var numMoves = 0;

$(document).ready(function(){
    randomizeLights(10);
	
	attachClickHandler();
});

randomizeLights = function(numberToTurnOn) {
	randomElements = $(".circle").get().sort(function(){ 
	  return Math.round(Math.random())-0.5
	}).slice(0,numberToTurnOn);
	
	$(randomElements).toggleClass('on');
}

attachClickHandler = function() {
    $('.game').delegate('.circle', 'click', function() {
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