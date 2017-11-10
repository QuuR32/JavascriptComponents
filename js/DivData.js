function DivData(_arl, _dataAdapter) {
	this.arl = _arl;
	this.dataAdapter = _dataAdapter;
	
	this.retrieve = function retrieve() {
		var me = this;
		
		this.arl.subscribeRequestServer(this.dataAdapter.url, this.dataAdapter.asyncMethodName, null, this);
		
		window.setTimeout(function() {
			me.retrieve();
		}, 1000);
	};

	this.callback = function callBack(_json) {
		this.dataAdapter.displayData(_json);
	};

	this.callbackError = function callbackError(xhr, status) {
		this.currentDisplay = 'Error : CallbackDivDataError<br />{<p style="padding-left: 1em;">response: ' +  xhr.responseText + '<br />status: ' +  status + '</p>}';
		window.displayMsg(this.currentDisplay);
	};
}