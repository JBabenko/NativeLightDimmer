var switchButton = document.getElementsByClassName('switch__slide')[0];
var switchStrip = document.getElementsByClassName('switch')[0];
var pageBackground = document.getElementsByClassName('page__background')[0];

switchButton.onmousedown = function(e) {
	var buttonCoords = getCoords(switchButton);
	var shiftX = e.pageX - buttonCoords.left;
	
	var sliderCoords = getCoords(switchStrip);

	switchButton.ondragstart = function() {
	  return false;
	};
	document.onmousemove = function(e) {
		var newLeft = e.pageX - shiftX - sliderCoords.left;
		
		if (newLeft < 0) {
			newLeft = 0;
		} 
		var rightEdge = switchStrip.offsetWidth - switchButton.offsetWidth - 2;
		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}
		var pageOpacity = newLeft / rightEdge;
		pageBackground.style.opacity = pageOpacity;
		switchButton.style.left = newLeft + 'px';
	}
	
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	}

	function getCoords(elem) {
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    }
}