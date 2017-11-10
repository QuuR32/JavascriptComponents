function ListNewsDataAdapter(_elemId) {
	// url and asyncMethodName has to be defined for all data adapters to know what method to call
	this.url = "news.php";
	this.asyncMethodName = "all";
	
	this.elem = document.getElementById(_elemId);
		
	this.currentJson = "=";
	
	this.displayData = function displayData(_json) {
		if (JSON.stringify(this.currentJson) != JSON.stringify(_json)) {
			this.currentJson = _json;
			
			if (_json.length == 0) {
				this.elem.innerHTML = "Aucune news trouvee !";
			} else {
				var body = document.getElementsByTagName('body')[0];
			    var tbl = document.createElement('table');
			    tbl.style.width = '100%';
			    tbl.setAttribute('border', '0');
			    var tbdy = document.createElement('tbody');
			    
				for(var i = 0; i < _json.length; i++) {
				    var tr1 = document.createElement('tr');
				    var td1 = document.createElement('td');
				    var a1 = document.createElement('a');
	                a1.appendChild(document.createTextNode(_json[i].news.Titre));
	                a1.setAttribute("href", "javascript:ShowNews('News_" + _json[i].news.ID+"')");
	                td1.appendChild(a1);
	                tr1.appendChild(td1);
	                tbdy.appendChild(tr1);

				    var tr2 = document.createElement('tr');
				    var td2 = document.createElement('td');
				    td2.innerHTML = _json[i].news.Contenu.replace(/\n/g, "<br />");
	                td2.style.paddingLeft = "25px";
	                td2.style.display = "none";
	                td2.setAttribute("id", "News_" + _json[i].news.ID);
	                tr2.appendChild(td2);
	                tbdy.appendChild(tr2);

				    var tr3 = document.createElement('tr');
				    var td3 = document.createElement('td');
	                td3.style.backgroundColor = "Gray";
	                td3.style.height = "1px";
	                tr3.appendChild(td3);
	                tbdy.appendChild(tr3);
				}
				
			    tbl.appendChild(tbdy);
			    body.appendChild(tbl);
			}
		}
	};
}

function ShowNews(_elemId) {
	this.elem = document.getElementById(_elemId);
	if (elem.style.display == "")
		elem.style.display = "none";
	else
		elem.style.display = "";
}