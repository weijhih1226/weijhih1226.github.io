L.XMLPicture = L.FeatureGroup.extend({
    initialize: function (url, options) {
		var xhr = new XMLHttpRequest();
		var parser = new DOMParser();
		xhr.open("get" , url , false);
        xhr.send(null);
		var xmlText = xhr.responseText;
		var xml = parser.parseFromString(xmlText, 'text/xml');

		this._xml = xml;
		this._layers = {};
		this._xmlOptions = options;

		if (xml) {
			this.addXML(xml, options);
		}
	},

	addXML: function (xml, options) {
		var layers = L.XMLPicture.parseXML(xml, options);
		if (!layers || !layers.length) return;
		for (var i = 0; i < layers.length; i++) {
			console.log(layers[i])
			this.fire('addlayer', {
				layer: layers[i]
			});
			this.addLayer(layers[i]);
		}
		this.fire('loaded');
	},
})

L.Util.extend(L.XMLPicture, {

    parseXML: function (xml, options) {
		var layers = [], l;
		var data = xml.getElementsByTagName('dataset')[0]
						.getElementsByTagName('contents')[0]
						.getElementsByTagName('content')[0].innerHTML.split(',');
		var lng_start = 120;
		var lat_start = 21.88;
		var res = 0.03;
		var num_lng = 67;
		var num_lat = 120;
		for (var j = 0; j < num_lat; j++) {
			for (var i = 0; i < num_lng - 1; i++) {
				l = new L.CircleMarker(new L.LatLng(lat_start + j * res, lng_start + i * res) , {
					radius: 1 , 
					color: options.color , 
					fillOpacity: 1 , 
				})
				if (l) { layers.push(l); }
			}
		}
		return layers;
	},
})

L.xmlPicture = function(url, options) {
	return new L.XMLPicture(url, options);
};