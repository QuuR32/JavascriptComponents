function AjaxRequestListener() {
	this.listRequest = new Array;
	this.stopped = true;
	
	this.subscribeRequestServer = function subscribeRequestServer(_url, _method, _param, _objectWaiting) {
		if (_objectWaiting == null) window.displayMsg("Object waiting cannot be null !");
			
		var request = {
				url: _url,
				method: _method,
				param: _param,
				objectWating: _objectWaiting
		}
		this.listRequest.push(request);
		
		if(this.stopped) {
			this.stopped = false;
			this.treatRequestList();
		}
	};
	
	this.treatRequestList = function treatRequestList() {
		var me = this;
		
		if(this.listRequest.length > 0) {
			var request = this.listRequest.shift();
			me.executeRequestServer(request.url, request.method, request.param, request.objectWating);
		}
		
		if(!this.stopped) {
			self.setTimeout(function(){
				me.treatRequestList();
			}, 1000);
		}
	};
	
	this.executeRequestServer = function executeRequestServer(_url, _method, _param, _objectWaiting) {
		var _url = "/JavascriptComponents_WS/" + _url;
		
		$.ajax({
			url: _url,
			data: {
				m: _method,
				param: _param
			},
			dataType : "json",
			type: "POST",
			success: function(_json) {
				_objectWaiting.callback(_json);
			},
			error: function(xhr, status) {
				_objectWaiting.callbackError(xhr, status);
			}
		});
	}
}