// import 'KMZImageOverlay.js';

const ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
const leafletAttribution = '<a href="https://leafletjs.com" title="Leaflet - 一個互動式地圖的JavaScript函式庫">' + (ukrainianFlag + ' ') + 'Leaflet</a>';
const googleAttribution = '&copy; <a href="https://www.google.com/intl/zh-tw/help/terms_maps.html" target="_blank" title="地圖來源：Google">Google</a>';
const cwbAttribution = '&copy; <a href="https://www.cwb.gov.tw/V8/C/information.html" target="_blank" title="氣象圖資來源：中央氣象局">中央氣象局</a>';
const osmAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" title="地圖來源：OpenStreetMap">OpenStreetMap</a>';

// const xmlWeatherUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0001-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlStationUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0003-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlAutoStationUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0001-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlGaugeUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0003-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const kmlTestUrl = 'kml/test.kml';
const kmzRainUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/DIV2/O-A0040-003.kmz';
const kmzLtngUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/DIV2/O-A0039-001.kmz';
const kmzTempUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/DIV2/O-A0038-002.kmz';
const kmzSatVISUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-B0033-004.kmz';
const kmzSatIRUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-B0033-003.kmz';
const imgRadarUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-A0058-005.png';
const imgConvUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-B0054-001.png';
const imgQPF12Url = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MFC/F-C0035-015.png';
const imgQPF24Url = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MFC/F-C0035-017.png';
const imgSatVISUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-C0042-008.jpg';
const imgSatIRcUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-C0042-002.jpg';
const imgSatIRgUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-C0042-004.jpg';
const imgSatIReUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-C0042-006.jpg';
// const imgWtrMapUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MFC/F-C0035-001.jpg';
// const imgRadarBounds = [[17.992071044171471, 115.001445629639946], [29.004257649173013, 126.514775012745119]];
// const imgRadarBounds = [[17.9875, 114.9875], [29.0125, 126.5125]];
const imgRadarBounds = [[17.72, 115.00], [29.0125, 126.5125]];
const imgQPFBounds = [[21.8, 118.95], [25.8, 122.45]];
const imgSatBounds = [[19.100625745, 115.976888855], [28.29937425, 126.02300114]];
// const imgWtrMapBounds = [[-1, 80], [48, 175]];

var opts = {
    opacityBaseControl: {
        options: {
            sliderImageUrl: "https://unpkg.com/leaflet-transparency@0.0.6/images/opacity-slider2.png",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            opacity: 1,
            position: 'topright',
        }
    },
    opacityOverlayControl: {
        options: {
            sliderImageUrl: "https://unpkg.com/leaflet-transparency@0.0.6/images/opacity-slider2.png",
            backgroundColor: "rgba(229, 227, 223, 0.9)",
            opacity: 0.75,
            position: 'topright',
        }
    },
};

function LatLng(e) {
    console.log('(' + e.latlng.lat.toFixed(2) + ',' + e.latlng.lng.toFixed(2) + ')');
}

window.addEventListener("DOMContentLoaded" , function(){
    // 放置地圖
    var map = L.map('map' , {
        center: [23.8, 121], // 中心點座標
        zoom: 7, // 0 - 18
        mapTypeId: 'hybrid',
        mapTypeIds: ['streets', 'satellite', 'hybrid', 'terrain', 'openStreets'],
        preferCanvas: true, // recommended when loading large layers.
        attributionControl: false,
        // markerZoomAnimation: false,
        gestureHandling: false,
        zoomControl: false,
        scaleControl: false,
        pegmanControl: {
            position: 'topleft',
            mutant: {
                attribution: '街景資料: ' + googleAttribution,
                pane: "overlayPane",
                type: null, // Non-image map type (used to force a transparent background)
            },
            pano: {
                enableCloseButton: true,
                fullscreenControl: true,
                imageDateControl: true
            },
        },
        locateControl: false,
        fullscreenControl: false,
        layersControl: {inline: true},
        minimapControl: {
            toggleDisplay: true,
            toggleMapTypes: true, // Automatically switch between "satellite" and "roads" layers.
            mapOptions: {
                mapTypeId: 'streets',
            },
            strings: {
                hideText:"隱藏縮圖",
                showText:"顯示縮圖"
            }
        },
        editInOSMControl: false,
        loadingControl: false,
        searchControl: false,
        disableDefaultUI: false,
        rotateControl: false,
        printControl: false,
        resizerControl: false,
        apiKeys: {thunderforest: '5ecc17cc36d44ed1ac63d35df0fd56e7' , google: 'AIzaSyAxfK5uv5MVnV51Y7THaBzNclplGe_PabA'},
        // apiKeys: {thunderforest: '5ecc17cc36d44ed1ac63d35df0fd56e7'},
        plugins: [
            "geojson-vt@3.2.1/geojson-vt.js",
            "leaflet.vectorgrid@1.3.0/dist/Leaflet.VectorGrid.js"
        ],

        // 設定圖層來源
        mapTypes: {
            streets: {
                name: '地圖',
                url: 'http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',
                options: {
                    maxZoom: 20,
                    // maxNativeZoom: 7,
                    subdomains:['mt0','mt1','mt2','mt3'],
                    attribution: googleAttribution,
                },
            },
            satellite: {
                name: '衛星',
                url: 'http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',
                options: {
                    maxZoom: 20,
                    // maxNativeZoom: 7,
                    subdomains:['mt0','mt1','mt2','mt3'],
                    attribution: googleAttribution,
                },
            },
            hybrid: {
                name: '混合',
                url: 'http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',
                options: {
                    maxZoom: 20,
                    // maxNativeZoom: 7,
                    subdomains:['mt0','mt1','mt2','mt3'],
                    attribution: googleAttribution,
                },
            },
            terrain: {
                name: '地形',
                url: 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
                options: {
                    maxZoom: 20,
                    // maxNativeZoom: 7,
                    subdomains:['mt0','mt1','mt2','mt3'],
                    attribution: googleAttribution,
                }
            },
            openStreets: {
                name: '開放街圖',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                options: {
                    maxZoom: 24,
                    maxNativeZoom: 19,
                    attribution: osmAttribution,
                },
            },
        },
    });

    map.on('plugins_loaded', function() {
        
        const radar = L.imageOverlay(imgRadarUrl, imgRadarBounds, {
            opacity: 0.5,
            attribution: cwbAttribution,
        });
        const conv = L.imageOverlay(imgConvUrl, imgRadarBounds, {
            opacity: 0.5,
            attribution: cwbAttribution,
        });
        const qpf12 = L.imageOverlay(imgQPF12Url, imgQPFBounds, {
            opacity: 0.7,
            attribution: cwbAttribution,
        });
        const qpf24 = L.imageOverlay(imgQPF24Url, imgQPFBounds, {
            opacity: 0.7,
            attribution: cwbAttribution,
        });
        const satvistw = L.imageOverlay(imgSatVISUrl, imgSatBounds, {
            opacity: 0.5,
            attribution: cwbAttribution,
        });
        const satirctw = L.imageOverlay(imgSatIRcUrl, imgSatBounds, {
            opacity: 0.5,
            attribution: cwbAttribution,
        });
        const satirgtw = L.imageOverlay(imgSatIRgUrl, imgSatBounds, {
            opacity: 0.5,
            attribution: cwbAttribution,
        });
        const satiretw = L.imageOverlay(imgSatIReUrl, imgSatBounds, {
            opacity: 0.5,
            attribution: cwbAttribution,
        });
    
        // Instantiate KMZ layer (async)
        // L.kmzImageOverlay = function(url , bounds) {
        //     return new L.KMZImageOverlay(url , bounds)
        // }
        // const rain = L.kmzImageOverlay(kmzRainUrl , imgQPFBounds , {
        //     opacity: 0.5,
        //     attribution: attribution,
        // });
        var rain = L.kmzLayer(kmzRainUrl , {attribution: cwbAttribution});
        var ltng = L.kmzLayer(kmzLtngUrl , {attribution: cwbAttribution});
        var temp = L.kmzLayer(kmzTempUrl , {attribution: cwbAttribution});
        // const temp = L.kmzImageOverlay(kmzTempUrl , imgQPFBounds , {
        //     opacity: 0.5,
        //     attribution: attribution,
        // });

        radar.addTo(map);
        ltng.addTo(map);
        
        var overlays = {
            '雷達': {
                '回波': radar , 
                '對流胞': conv , 
            },
            '觀測': {
                '閃電': ltng , 
                '氣溫': temp , 
                '雨量': rain , 
            },
            'QPF': {
                '0-12h': qpf12 , 
                '12-24h': qpf24 , 
            },
            '衛星': {
                '可見光': satvistw , 
                'IR彩色': satirctw , 
                'IR黑白': satirgtw , 
                'IR色調強化': satiretw , 
            }
        };

        // var controlBaseOpacity = new L.Control.OpacitySlider(radar, opts.opacityBaseControl.options);
        // var controlOverlayOpacity = new L.Control.OpacitySlider(rain, opts.opacityOverlayControl.options);
        // controlBaseOpacity.addTo(map);
        // controlOverlayOpacity.addTo(map);

        // fetch(kmlTestUrl)
        // .then(res => res.text())
        // .then(kmltext => {
        //     // Create new kml overlay
        //     const parser = new DOMParser();
        //     const kml = parser.parseFromString(kmltext, 'text/xml');

            
        //     const track = new L.KML(kml);
        //     // console.log(track)
        //     map.addLayer(track);

        //     // Adjust map to show the kml
        //     const bounds = track.getBounds();
        //     map.fitBounds(bounds);
        // });

        fetch(xmlStationUrl)
        .then(res => res.text())
        .then(xmltext => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmltext, 'text/xml');
            const XML = new L.XML(xml);
            for (var i = 0; i < XML.latLngs.length; i++) {
                L.circleMarker(XML.latLngs[i] , {radius: 2.5 , color: '#ff6363' , fillOpacity: 1}).addTo(map);
            }
        });

        fetch(xmlAutoStationUrl)
        .then(res => res.text())
        .then(xmltext => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmltext, 'text/xml');
            const XML = new L.XML(xml);
            for (var i = 0; i < XML.latLngs.length; i++) {
                L.circleMarker(XML.latLngs[i] , {radius: 2.5 , color: '#ff6363' , fillOpacity: 1}).addTo(map);
            }
        });

        fetch(xmlGaugeUrl)
        .then(res => res.text())
        .then(xmltext => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmltext, 'text/xml');
            const XML = new L.XML(xml);
            for (var i = 0; i < XML.latLngs.length; i++) {
                L.circleMarker(XML.latLngs[i] , {radius: 2 , color: 'blue' , fillOpacity: 1}).addTo(map);
            }
        });
        
        new L.Control.GroupedLayers(null , overlays , {collapsed: false , groupCheckboxes: true , exclusiveGroups: ["觀測" , "QPF" , "衛星"] , textAlign: 'left' , }).addTo(map);
        new L.Control.Attribution({position: 'bottomright' , prefix: leafletAttribution}).addTo(map);
        new L.Control.Scale({position: 'bottomright' , imperial: false}).addTo(map)
        new L.Control.Locate({position: 'bottomright' , strings: {title: "定位"}}).addTo(map)
        new L.Control.FullScreen({position: 'bottomright' , title: '全螢幕' , titleCancel: '關閉全螢幕'}).addTo(map)
        new L.Control.Search({position: 'topleft' , textPlaceholder: "搜尋"}).addTo(map)
        new L.Control.Zoom({position: 'bottomright' , zoomInTitle: '放大' , zoomOutTitle: '縮小'}).addTo(map);
        new L.Control.Loading({position: 'bottomright'}).addTo(map);
        
    });


    // console.log(new L.Control({position: 'topright'}).getContainer("test"));

    // map.on('click' , LatLng)
    // map.on('click' , function(e) {
    //     var test = new L.Control.Attribution({position: 'bottomright' , prefix: '(' + e.latlng.lat.toFixed(2) + ',' + e.latlng.lng.toFixed(2) + ')|' + leafletAttribution});
    //     test.addTo(map);
    //     test.remove()
    // })
})

// L.Control.Pegman = L.Control.Pegman.extend(
//     {
//         onAdd: function(map) {
//             this._map = map;
  
//             this._container = L.DomUtil.create('div', 'leaflet-pegman pegman-control leaflet-bar');
//             this._pegman = L.DomUtil.create('div', 'pegman draggable drag-drop', this._container);
//             this._pegmanButton = L.DomUtil.create('div', 'pegman-button', this._container);
//             this._pegmanMarker = L.marker([0, 0], this.options.marker);
//             this._panoDiv = this.options.panoDiv ? document.querySelector(this.options.panoDiv) : L.DomUtil.create('div', '', this._map._container);
  
//             L.DomUtil.addClass(this._panoDiv, 'pano-canvas');
//             L.DomUtil.addClass(this._map._container, this.options.theme);
  
//             L.DomEvent.disableClickPropagation(this._panoDiv);
//             // L.DomEvent.on(this._container, 'click mousedown touchstart dblclick', this._disableClickPropagation, this);
//             L.DomEvent.on(this._container, 'click mousedown dblclick', this._disableClickPropagation, this);
  
//             this._container.addEventListener('touchstart', this._loadScripts.bind(this, !L.Browser.touch), { once: true });
//             this._container.addEventListener('mousedown', this._loadScripts.bind(this, true), { once: true });
//             this._container.addEventListener('mouseover', this._loadScripts.bind(this, false), { once: true });
  
//             this._loadInteractHandlers();
//             this._loadGoogleHandlers();
  
//             L.DomEvent.on(document, 'mousemove', this.mouseMoveTracking, this);
//             L.DomEvent.on(document, 'keyup', this.keyUpTracking, this);
  
//             this._pegmanMarker.on("dragend", this.onPegmanMarkerDragged, this);
//             this._map.on("click", this.onMapClick, this);
//             this._map.on("layeradd", this.onMapLayerAdd, this);
  
//             return this._container;
//         },
//         pegmanAdd: function() {
//             this._pegmanMarker.addTo(this._map);
//             this._pegmanMarker.setLatLng(this._pegmanMarkerCoords);
//             this.findStreetViewData(this._pegmanMarkerCoords.lat, this._pegmanMarkerCoords.lng);
//             this._updateClasses("pegman-added");
//         },
//     }
// );