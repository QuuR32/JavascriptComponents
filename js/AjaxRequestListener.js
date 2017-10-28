function AjaxRequestListener() {
	this.listRequest = new Array;
	this.stopped = true;
	
	this.SubscribeRequestServer = function SubscribeRequestServer(_method, _param, _objectWaiting) {
		if (_objectWaiting == null) window.DisplayMsg("Object waiting cannot be null !");
			
		var request = new Object;
		request["method"] = _method;
		request["param"] = _param;
		request["objectWating"] = _objectWaiting;
		this.listRequest.push(request);
		
		if(this.stopped) {
			this.stopped = false;
			this.TreatRequestList();
		}
	};
	
	this.TreatRequestList = function TreatRequestList() {
		var me = this;
		
		if(this.listRequest.length > 0) {
			var request = this.listRequest.shift();
			ExecuteRequestServer(request.method, request.param, request.objectWating);
		}
		
		if(!this.stopped) {
			self.setTimeout(function(){
				me.TreatRequestList();
			}, 1000);
		}
	};
	
	function ExecuteRequestServer(_method, _param, _objectWaiting) {
		var _url = "php/ws.php";
		
		$.ajax({
			url: _url,
			data: {
				method: _method,
				param: _param
			},
			dataType : "json",
			type: "POST",
			success: function(_json) {
				_objectWaiting.Callback(_json.root);
			},
			error: function(xhr, status) {
				_objectWaiting.CallbackError(xhr, status);
			}
		});
	}
}