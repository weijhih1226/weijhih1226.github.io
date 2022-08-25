L.Control.Colorbar = L.Control.extend({
    onAdd: function(map) {
        var cb = L.DomUtil.create('div', 'leaflet-bar my-control');
        cb.innerHTML = 'Colorbar';
        cb.style.background = '#fff';
        cb.style.color = '#888';
        return cb;
    },
  
    onRemove: function(map) {
      // Nothing to do here
    }
});
  
L.control.colorbar = function(opts) {
    return new L.Control.Colorbar(opts);
}