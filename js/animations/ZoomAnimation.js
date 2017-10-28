function ZoomAnimation() {
	this.animate = function animate(_elemID, _ratio, _speed) {
		document.getElementById(_elemID).style.transition = "all " + _speed + "ms linear";
		setTimeout('document.getElementById("' + _elemID + '").style.transform = "scale(' + _ratio + ')"', 10);
	};
}