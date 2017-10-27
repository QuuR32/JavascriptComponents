function RotationAnimation() {
	this.grade = 0;
	
	this.animate = function animate(id, dir, speed) {
		var elem = document.getElementById(id);
		var me = this;
		
		if (dir == "ccw") {
			this.grade--;
		} else {
			this.grade++;
		}
		
		elem.style.WebkitTransform = "rotate(" + this.grade + "deg)";
		elem.style.MozTransform = "rotate(" + this.grade + "deg)";
		elem.style.msTransform = "rotate(" + this.grade + "deg)";
		elem.style.OTransform = "rotate(" + this.grade + "deg)";
		elem.style.transform = "rotate(" + this.grade + "deg)";

		if(this.grade > 359) this.grade = 1;
		if(this.grade < -359) this.grade = -1;
		
		setTimeout(function() {
			me.animate(id, dir, speed);
		}, speed);
	};
}