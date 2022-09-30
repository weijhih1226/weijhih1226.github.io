L.Control.RadarDBZColorbar = L.Control.extend({
    onAdd: function(opts) {
        const textColor = '#000';
        const lineHeight = '16px';
        const units = '<strong>回波</strong>(dBZ)';

        var cb = L.DomUtil.create('div', 'leaflet-control-radardbzcolorbar leaflet-control-colorbar leaflet-bar leaflet-control');
        cb.innerHTML = '<div class="units"></div><div class="colorbar"><div class="colors"></div><div class="ticks"></div></div>';
        cb.style.backgroundColor = 'rgba(255, 255, 255, .7)';
        cb.style.borderRadius = '5px';
        cb.style.padding = '6px 8px';
        cb.style.boxShadow = '0 0 15px rgba(0, 0, 0, .5)';
        var cbUnits = cb.querySelector('.units');
        var cbColorbar = cb.querySelector('.colorbar');
        var cbColors = cb.querySelector('.colors');
        var cbTicks = cb.querySelector('.ticks');
        cbUnits.style.lineHeight = lineHeight;
        cbUnits.innerHTML = units;
        cbUnits.style.color = textColor;
        cbColorbar.style.display = 'flex';
        cbColors.style.padding = '8px 0';
        cbColors.style.lineHeight = lineHeight;
        cbColors.style.zIndex = '2';
        cbTicks.style.lineHeight = lineHeight;
        cbTicks.style.color = textColor;
        cbTicks.style.zIndex = '2';

        var ticks = [65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, "0"];

        for (var i = 0; i < ticks.length; i++) {
            cbColors.innerHTML += ticks[i] ? '<i id="color' + i + '"></i><br>' : '';
        }

        var colors = cbColors.querySelectorAll('i');
        for (var i = 0; i < colors.length; i++) {
            colors[i].style.marginLeft = '2px';
            colors[i].style.marginRight = '8px';
            colors[i].style.width = '18px';
            colors[i].style.height = '16px';
            colors[i].style.backgroundColor = getRadarDBZColor(ticks[i]);
            colors[i].style.float = 'left';
            colors[i].style.zIndex = '2';
        }

        cbTicks.innerHTML += '<br>';
        for (var i = 0; i < ticks.length; i++) {
            cbTicks.innerHTML += ticks[i] ? ticks[i] + '<br>' : '';
        }
            
        return cb;
    },
  
    onRemove: function(map) {
      // Nothing to do here
    }
});

L.control.radarDBZColorbar = function(opts) {
    return new L.Control.RadarDBZColorbar(opts);
}

function getRadarDBZColor(d) {
    return d >= 65 ? '#9600ff' :
           d >= 64 ? '#ab00ff' :
           d >= 63 ? '#c000ff' :
           d >= 62 ? '#d500ff' :
           d >= 61 ? '#ea00ff' :
           d >= 60 ? '#ff00ff' :
           d >= 59 ? '#ea00cc' :
           d >= 58 ? '#d50099' :
           d >= 57 ? '#c00066' :
           d >= 56 ? '#ab0033' :
           d >= 55 ? '#960000' :
           d >= 54 ? '#a00000' :
           d >= 53 ? '#aa0000' :
           d >= 52 ? '#b40000' :
           d >= 51 ? '#be0000' :
           d >= 50 ? '#c80000' :
           d >= 49 ? '#d30000' :
           d >= 48 ? '#de0000' :
           d >= 47 ? '#e90000' :
           d >= 46 ? '#f40000' :
           d >= 45 ? '#ff0000' :
           d >= 44 ? '#ff1800' :
           d >= 43 ? '#ff3000' :
           d >= 42 ? '#ff4800' :
           d >= 41 ? '#ff6000' :
           d >= 40 ? '#ff7800' :
           d >= 39 ? '#ff8800' :
           d >= 38 ? '#ff9800' :
           d >= 37 ? '#ffa800' :
           d >= 36 ? '#ffb800' :
           d >= 35 ? '#ffc800' :
           d >= 34 ? '#ffd300' :
           d >= 33 ? '#ffde00' :
           d >= 32 ? '#ffe900' :
           d >= 31 ? '#fff400' :
           d >= 30 ? '#ffff00' :
           d >= 29 ? '#ccea00' :
           d >= 28 ? '#99d500' :
           d >= 27 ? '#66c000' :
           d >= 26 ? '#33ab00' :
           d >= 25 ? '#009600' :
           d >= 24 ? '#00a000' :
           d >= 23 ? '#00aa00' :
           d >= 22 ? '#00b400' :
           d >= 21 ? '#00be00' :
           d >= 20 ? '#00c800' :
           d >= 19 ? '#00d300' :
           d >= 18 ? '#00de00' :
           d >= 17 ? '#00e900' :
           d >= 16 ? '#00f400' :
           d >= 15 ? '#00ff00' :
           d >= 14 ? '#0000ff' :
           d >= 13 ? '#0012ff' :
           d >= 12 ? '#0024ff' :
           d >= 11 ? '#0036ff' :
           d >= 10 ? '#0048ff' :
           d >= 9  ? '#005bff' :
           d >= 8  ? '#006dff' :
           d >= 7  ? '#007fff' :
           d >= 6  ? '#0091ff' :
           d >= 5  ? '#00a3ff' :
           d >= 4  ? '#00b6ff' :
           d >= 3  ? '#00c8ff' :
           d >= 2  ? '#00daff' :
           d >= 1  ? '#00ecff' :
           d >= 0  ? '#00ffff' :
                     'gray';
}