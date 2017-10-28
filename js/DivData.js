function DivData(_arl, _dataAdapter) {
	this.arl = _arl;
	this.dataAdapter = _dataAdapter;
	
	this.Retrieve = function Retrieve() {
		var me = this;
		
		this.arl.SubscribeRequestServer(this.dataAdapter.asyncMethodName, null, this);
		
		window.setTimeout(function() {
			me.Retrieve();
		}, 1000);
	};

	this.Callback = function CallBack(_json) {
		this.dataAdapter.DisplayData(_json);
	};

	this.CallbackError = function CallbackError(xhr, status) {
		this.currentDisplay = 'Error : CallbackDivDataError<br />{<p style="padding-left: 1em;">response: ' +  xhr.responseText + '<br />status: ' +  status + '</p>}';
		window.DisplayMsg(this.currentDisplay);
	};
}