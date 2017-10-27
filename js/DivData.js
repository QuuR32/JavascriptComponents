function DivData(_arl) {
	this.arl = _arl;
	this.currentDisplay = "";
	
	this.retrieve = function retrieve() {
		var me = this;
		
		this.arl.SubscribeRequestServer("GetListNews", null, this);
		
		setTimeout(function() {
			me.retrieve();
		}, 1000);
	};

	this.callback = function callBack(_json) {
		if (_json['root'].length == 0) {
			window.displayMsg('Aucune news trouvée');
		} else {
			var toDisplay = "";
			for(i=0; i<_json['root'].length; i++) {
				var news = _json['root'][i]['news'];
				toDisplay = toDisplay + "" + news.Titre + "<br />";
			}
			
			if (toDisplay != this.currentDisplay) {
				this.currentDisplay = toDisplay;
				window.displayMsg(toDisplay);
			}
		}
	};

	this.callbackError = function callbackError() {
		window.displayMsg('Error : CallbackDivDataError');
	};
}