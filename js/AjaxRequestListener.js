function AjaxRequestListener() {
	this.listRequest = new Array;
	this.stopped = true;
	this.idToken;
	
	this.SubscribeRequestServer = function SubscribeRequestServer(_method, _param, _callbackMethodName, _callbackErrorMethodName) {
		var request = new Object;
		request["method"] = _method;
		request["param"] = _param;
		request["callbackMethodName"] = _callbackMethodName;
		request["callbackErrorMethodName"] = _callbackErrorMethodName;
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
			ExecuteRequestServer(request.method, request.param, request.callbackMethodName, request.callbackErrorMethodName);
		}
		
		if(!this.stopped) {
			this.idToken = self.setInterval(function(){
				me.TreatRequestList();
			}, 1000);
		} else {
			clearInterval(idToken);
		}
	};
	
	function ExecuteRequestServer(_method, _param, _callbackSuccessMethodName, _callbackErrorMethodName) {
		window.displayMsg("Chargement : " + _method + "...");
		
		var _url = "php/ws.php";
		
		$.ajax({
			// the URL for the request
			url: _url,
			
			// the data to send (will be converted to a query string)
			data: {
				method: _method,
				param: _param
			},
			
			// the type of data we expect back
			dataType : "json",
			
			// whether this is a POST or GET request
			type: "POST",
			
			// code to run if the request succeeds;
			// the response is passed to the function
			success: function( _json ) {
				if (_callbackSuccessMethodName != null) {
					if (_json['root'].length != 0) {
						// alert(_json['root']);
						for(i=0; i<_json['root'].length; i++) {
							for(var key in _json['root'][i]) {
								var object = _json['root'][i][key];
								
								var jsonFound;
								
								object = GetObjectWithJsonTransform(object);
								
								_json['root'][i][key] = object;
							}
						}
					}
					window[_callbackSuccessMethodName](_json);
				}
			},
			
			// code to run if the request fails; the raw request and
			// status codes are passed to the function
			error: function(xhr, status) {
				window.displayMsg("Sorry, there was a problem : " + xhr.responseText);
				
				window[_callbackErrorMethodName](_json);
			}
		});
	}
	
	function GetObjectWithJsonTransform(object) {
		for(var keyObject in object) {
			if(object.hasOwnProperty(keyObject)) {
				try
				{
					var jsonFound = JSON.parse(object[keyObject]);
					   
					if (jsonFound['root'] != null) {
						if (jsonFound['root'].length > 1) {
							object[keyObject] = new Array;
							for(j=0; j<jsonFound['root'].length; j++) {
								object[keyObject][j] = GetObjectWithJsonTransform(jsonFound['root'][j][keyObject]);
							}
						} else {
							object[keyObject] = GetObjectWithJsonTransform(jsonFound['root'][0][keyObject]);
						}
					}
				}
				catch(e)
				{
				}
			}
		}
		
		return object;
	}
}