L.Control.TimeSlider = L.Control.extend({
    options: {
        position: 'bottomleft'
    },
    setOpacityLayer: function (layer) {
        opacity_layer = layer;
    },
    onAdd: function (map) {
        var opacity_slider_div = L.DomUtil.create('div', 'leaflet-control-opacity leaflet-bar leaflet-control');
        opacity_slider_div.style.height = '20px';
        opacity_slider_div.style.width = '20px';
        opacity_slider_div.style.backgroundColor = 'white';
        console.log(L.Map)
        $(opacity_slider_div).slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 100,
            value: 100,
            step: 5,
            start: function ( event, ui) {
                map.dragging.disable();
                map.once('mousedown', function (e) { 
                map.dragging.enable();
                });
            },
            slide: function ( event, ui ) {
                var slider_value = ui.value / 100;
                opacity_layer.setOpacity(slider_value);
            }
        });
        return opacity_slider_div;
    }
})

L.control.timeSlider = function(opts) {
    return new L.Control.TimeSlider(opts);
}