function DivData(_arl) {
	this.arl = _arl;
	
	this.retrieve = function retrieve() {
		var me = this;
		
		this.arl.SubscribeRequestServer("GetListNews", null, this.callback, this.callbackError);
		
		setTimeout(function() {
			me.retrieve(id, dir, speed);
		}, 1000);
	};

	this.callback = function callBack(_json) {
		if (_json['root'].length == 0) {
			window.displayInfo('Aucune news trouvée');
		} else {
			for(i=0; i<_json['root'].length; i++) {
				var news = _json['root'][i]['news'];
				window.displayInfo(news.Titre);
			}
		}
	};

	this.callbackError = function callbackError() {
		window.displayInfo('Error : CallbackGetOtherAdherentByKeywordError');
	};
}