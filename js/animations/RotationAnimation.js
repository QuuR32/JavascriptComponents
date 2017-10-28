function RotationAnimation() {
	this.grade = 0;
	
	this.animate = function animate(_elemID, _dir, _speed, _initialGrade) {
		if (_initialGrade)
			this.grade =_initialGrade;
		
		_elem = document.getElementById(_elemID);
		
		var me = this;
		
		if (_dir == "ccw") {
			this.grade--;
		} else {
			this.grade++;
		}
		
		_elem.style.WebkitTransform = "rotate(" + this.grade + "deg)";
		_elem.style.MozTransform = "rotate(" + this.grade + "deg)";
		_elem.style.msTransform = "rotate(" + this.grade + "deg)";
		_elem.style.OTransform = "rotate(" + this.grade + "deg)";
		_elem.style.transform = "rotate(" + this.grade + "deg)";

		if(this.grade > 359) this.grade = 1;
		if(this.grade < -359) this.grade = -1;
		
		window.setTimeout(function() {
			me.animate(_elemID, _dir, _speed);
		}, _speed);
	};
}