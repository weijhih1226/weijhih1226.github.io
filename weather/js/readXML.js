L.XML = L.FeatureGroup.extend({
    initialize: function (xml, xmlOptions) {
		this._xml = xml;
		this._layers = {};
		this._xmlOptions = xmlOptions;

		if (xml) {
			this.addXML(xml, xmlOptions);
		}
	},

	addXML: function (xml, xmlOptions) {
		var layers = L.XML.parseXML(xml, xmlOptions);
		// if (!layers || !layers.length) return;
		// for (var i = 0; i < layers.length; i++) {
		// 	this.fire('addlayer', {
		// 		layer: layers[i]
		// 	});
		// 	this.addLayer(layers[i]);
		// }
		this.latLngs = L.XML.getLatLngs(xml);
		this.fire('loaded');
	},

	latLngs: []
})

L.Util.extend(L.XML, {

    parseXML: function (xml, xmlOptions) {
		var style = this.parseStyles(xml, xmlOptions);
		this.parseStyleMap(xml, style);
		var el = xml.getElementsByTagName('Folder');
		var layers = [], l;
		for (var i = 0; i < el.length; i++) {
			if (!this._check_folder(el[i])) { continue; }
			l = this.parseFolder(el[i], style);
			if (l) { layers.push(l); }
		}
		el = xml.getElementsByTagName('Placemark');
		for (var j = 0; j < el.length; j++) {
			if (!this._check_folder(el[j])) { continue; }
			l = this.parsePlacemark(el[j], xml, style);
			if (l) { layers.push(l); }
		}
		el = xml.getElementsByTagName('GroundOverlay');
		for (var k = 0; k < el.length; k++) {
			l = this.parseGroundOverlay(el[k]);
			if (l) { layers.push(l); }
		}
		return layers;
	},

    parseStyles: function (xml, kmlOptions) {
		var styles = {};
		var sl = xml.getElementsByTagName('Style');
		for (var i=0, len=sl.length; i<len; i++) {
			var style = this.parseStyle(sl[i], kmlOptions);
			if (style) {
				var styleName = '#' + style.id;
				styles[styleName] = style;
			}
		}
		return styles;
	},

    parseStyle: function (xml, kmlOptions) {
		var style = {}, poptions = {}, ioptions = {}, el, id;

		var attributes = {color: true, width: true, Icon: true, href: true, hotSpot: true};

		function _parse (xml) {
			var options = {};
			for (var i = 0; i < xml.childNodes.length; i++) {
				var e = xml.childNodes[i];
				var key = e.tagName;
				if (!attributes[key]) { continue; }
				if (key === 'hotSpot')
				{
					for (var j = 0; j < e.attributes.length; j++) {
						options[e.attributes[j].name] = e.attributes[j].nodeValue;
					}
				} else {
					var value = (e.childNodes && e.childNodes.length) ? e.childNodes[0].nodeValue : null;
                    // console.log(value)
					if(!value) {
						continue;
					}
					if (key === 'color') {
						options.opacity = parseInt(value.substring(0, 2), 16) / 255.0;
						options.color = '#' + value.substring(6, 8) + value.substring(4, 6) + value.substring(2, 4);
                    } else if (key === 'width') {
						options.weight = parseInt(value);
					} else if (key === 'Icon') {
						ioptions = _parse(e);
						if (ioptions.href) { options.href = ioptions.href; }
					} else if (key === 'href') {
						options.href = value;
					}
				}
			}
			return options;
		}

		el = xml.getElementsByTagName('LineStyle');
		if (el && el[0]) { style = _parse(el[0]); }
		el = xml.getElementsByTagName('PolyStyle');
		if (el && el[0]) { poptions = _parse(el[0]); }
		if (poptions.color) { style.fillColor = poptions.color; }
		if (poptions.opacity) { style.fillOpacity = poptions.opacity; }
		el = xml.getElementsByTagName('IconStyle');
		if (el && el[0]) { ioptions = _parse(el[0]); }
		if (ioptions.href) {
			var iconOptions = {
				iconUrl: ioptions.href,
				shadowUrl: null,
				anchorRef: {x: ioptions.x, y: ioptions.y},
				anchorType:	{x: ioptions.xunits, y: ioptions.yunits}
			};

			if (typeof kmlOptions === "object" && typeof kmlOptions.iconOptions === "object") {
				L.Util.extend(iconOptions, kmlOptions.iconOptions);
			}
			style.icon = new L.KMLIcon(iconOptions);
            style.opacity = ioptions.opacity;
		}

		id = xml.getAttribute('id');
		if (id && style) {
			style.id = id;
		}

		return style;
	},

    parseStyleMap: function (xml, existingStyles) {
		var sl = xml.getElementsByTagName('StyleMap');

		for (var i = 0; i < sl.length; i++) {
			var e = sl[i], el;
			var smKey, smStyleUrl;

			el = e.getElementsByTagName('key');
			if (el && el[0]) { smKey = el[0].textContent; }
			el = e.getElementsByTagName('styleUrl');
			if (el && el[0]) { smStyleUrl = el[0].textContent; }

			if (smKey === 'normal')
			{
				existingStyles['#' + e.getAttribute('id')] = existingStyles[smStyleUrl];
			}
		}

		return;
	},

    getLatLngs: function (xml) {
        var locTag = xml.getElementsByTagName('location');
		var latTag = xml.getElementsByTagName('lat_wgs84');
        var lonTag = xml.getElementsByTagName('lon_wgs84');

		var coords = [];
		for (var i = 0; i < lonTag.length; i++) {
            var lat = latTag[i].childNodes[0].nodeValue;
            var lon = lonTag[i].childNodes[0].nodeValue;
			coords.push(new L.LatLng(lat, lon));
		}
		return coords;
	},
})

L.XMLCircle = L.Circle.extend({
    options: {
        radius: 2,
		color: 'red',
	}
});