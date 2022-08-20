// import 'KMZImageOverlay.js';

const ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
const leafletAttribution = '<a href="https://leafletjs.com" title="Leaflet - 一個互動式地圖的JavaScript函式庫">' + (ukrainianFlag + ' ') + 'Leaflet</a>';
const googleAttribution = '&copy; <a href="https://www.google.com/intl/zh-tw/help/terms_maps.html" target="_blank" title="地圖來源：Google">Google</a>';
const cwbAttribution = '&copy; <a href="https://www.cwb.gov.tw/V8/C/information.html" target="_blank" title="氣象圖資來源：中央氣象局">中央氣象局</a>';
const osmAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" title="地圖來源：OpenStreetMap">OpenStreetMap</a>';

const geojsonCountyUrl = '../weather/map/geojson/TWN_county.json';
const geojsonTownUrl = '../weather/map/geojson/TWN_town.json';
const geojsonVillageUrl = '../weather/map/geojson/TWN_village_20140501.json';

const xmlStationUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0003-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlAutoStationUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0001-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlGaugeUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0002-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlQPEUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-B0045-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlQPFUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-B0046-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlRadarUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0059-001?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlRainUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0040-004?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
const xmlTempUrl = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0038-003?Authorization=CWB-D8D93D37-13E2-4637-A854-3EEFCEC990CF&downloadType=WEB&format=XML';
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
// const imgRadarBounds = [[17.72, 115.00], [29.0125, 126.5125]];
const imgRadarBounds = [[17.72, 114.95], [29.0125, 126.5125]];
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
        
        // var radar2 = L.imageOverlay(imgRadarUrl, imgRadarBounds, {
        //     opacity: 0.5,
        //     attribution: cwbAttribution,
        // });
        document.querySelector('#radar1').checked = true;
        document.querySelector('#ltng1').checked = true;
        radar = L.xmlPicture(xmlRadarUrl , 'radar' , {
            fillOpacity: 0.5 , 
            attribution: cwbAttribution
        });
        ltng = L.kmzLayer(kmzLtngUrl , {
            attribution: cwbAttribution
        });
        radar.addTo(map).setZIndex(2);
        ltng.addTo(map).setZIndex(1000);
        const baselayers = {};
        const overlays = {
            '雷達-整合回波': radar , 
            '閃電-即時觀測': ltng , 
        };
        const cl = new L.Control.Layers(baselayers , overlays , {collapsed: false}).addTo(map);

		// var xhr = new XMLHttpRequest()
        // xhr.open('get' , geojsonCountyUrl , false)
        // xhr.send(null)
        // var geojsonCountyData = JSON.parse(xhr.responseText);
        // var geojsonCounty = L.geoJSON(geojsonCountyData , {
        //     style: {
        //         color: 'white',
        //         weight: 1,
        //         fillOpacity: 0,
        //     }
        // });

        // xhr.open('get' , geojsonTownUrl , false)
        // xhr.send(null)
        // var geojsonTownData = JSON.parse(xhr.responseText);
        // var geojsonTown = L.geoJSON(geojsonTownData , {
        //     style: {
        //         color: 'white',
        //         weight: 1,
        //         fillOpacity: 0,
        //     }
        // });

        // Instantiate KMZ layer (async)
        // L.kmzImageOverlay = function(url , bounds) {
        //     return new L.KMZImageOverlay(url , bounds)
        // }
        // const rain = L.kmzImageOverlay(kmzRainUrl , imgQPFBounds , {
        //     opacity: 0.5,
        //     attribution: attribution,
        // });

        // geojsonCounty.addTo(map).setZIndex(-1);
        // geojsonTown.setZIndex(1);

        
        // var baselayers = {
        //     '縣市界': geojsonCounty , 
        //     '鄉鎮區界': geojsonTown , 
        //     // '村里界': geojsonVillage , 
        // };
        
        // var overlays = {
        //     '雷達': {
        //         // '回波': radar , 
        //         // '回波2': radar2 , 
        //         '對流胞': conv , 
        //         '1h QPE': qpe , 
        //         '1h QPF': qpf , 
        //     },
        //     '閃電': {
        //         '即時': ltng , 
        //     }, 
        //     '地面': {
        //         '局屬站': station , 
        //         '自動站': autoStation , 
        //         '雨量站': gauge , 
        //         '日累積雨量': rain , 
        //         '氣溫': temp , 
        //     },
        //     'QPF': {
        //         '0-12h': qpf12 , 
        //         '12-24h': qpf24 , 
        //     },
        //     '衛星': {
        //         '可見光': satvistw , 
        //         'IR彩色': satirctw , 
        //         'IR黑白': satirgtw , 
        //         'IR色調強化': satiretw , 
        //     }
        // };
        // var radar = L.xmlPicture(xmlRadarUrl , 'radar' , {
        //     fillOpacity: 0.5 , 
        //     attribution: cwbAttribution
        // });

        document.querySelector('#radar0').addEventListener('click' , function(){
            this.checked = this.checked;
            // if (this.checked) {
            //     console.log(this.checked)
            // } else {
            //     console.log(this.checked)
            // }
        })


        document.querySelector('#radar1').addEventListener('change' , function(){
            if (this.checked) {
                radar = L.xmlPicture(xmlRadarUrl , 'radar' , {
                    fillOpacity: 0.5 , 
                    attribution: cwbAttribution
                });
                radar.addTo(map);
                cl.addOverlay(radar , '雷達-整合回波');
            } else {
                cl.removeLayer(radar);
                radar.remove();
            }
        })

        document.querySelector('#radar2').addEventListener('change' , function(){
            if (this.checked) {
                conv = L.imageOverlay(imgConvUrl, imgRadarBounds, {
                    opacity: 0.5,
                    attribution: cwbAttribution,
                });
                conv.addTo(map);
                cl.addOverlay(conv , '雷達-對流胞偵測');
            } else {
                cl.removeLayer(conv);
                conv.remove();
            }
        })

        document.querySelector('#radar3').addEventListener('change' , function(){
            if (this.checked) {
                qpe = L.xmlPicture(xmlQPEUrl , 'qpe' , {
                    fillOpacity: 0.5 , 
                    attribution: cwbAttribution
                });
                qpe.addTo(map);
                cl.addOverlay(qpe , '雷達-1h QPE');
            } else {
                cl.removeLayer(qpe);
                qpe.remove();
            }
        })

        document.querySelector('#radar4').addEventListener('change' , function(){
            if (this.checked) {
                qpf = L.xmlPicture(xmlQPFUrl , 'qpf' , {
                    fillOpacity: 0.5 , 
                    attribution: cwbAttribution
                });
                qpf.addTo(map);
                cl.addOverlay(qpf , '雷達-1h QPF');
            } else {
                cl.removeLayer(qpf);
                qpf.remove();
            }
        })

        document.querySelector('#ltng1').addEventListener('change' , function(){
            if (this.checked) {
                ltng = L.kmzLayer(kmzLtngUrl , {
                    attribution: cwbAttribution
                });
                ltng.addTo(map);
                cl.addOverlay(ltng , '閃電-即時觀測');
            } else {
                cl.removeLayer(ltng);
                ltng.remove();
            }
        })

        document.querySelector('#stn1').addEventListener('change' , function(){
            if (this.checked) {
                station = L.xmlLayer(xmlStationUrl , {
                    color: '#ff6363' , 
                    fillOpacity: 1 , 
                    radius: 2.5 , 
                    attribution: cwbAttribution
                });
                station.addTo(map);
                cl.addOverlay(station , '測站-局屬氣象站');
            } else {
                cl.removeLayer(station);
                station.remove();
            }
        })
        document.querySelector('#stn2').addEventListener('change' , function(){
            if (this.checked) {
                autoStation = L.xmlLayer(xmlAutoStationUrl , {
                    color: '#ff6363' , 
                    fillOpacity: 1 , 
                    radius: 2.5 , 
                    attribution: cwbAttribution
                });
                autoStation.addTo(map);
                cl.addOverlay(autoStation , '測站-自動氣象站');
            } else {
                cl.removeLayer(autoStation);
                autoStation.remove();
            }
        })
        document.querySelector('#stn3').addEventListener('change' , function(){
            if (this.checked) {
                gauge = L.xmlLayer(xmlGaugeUrl , {
                    color: 'blue' , 
                    fillOpacity: 1 , 
                    radius: 2.5 , 
                    attribution: cwbAttribution
                });
                gauge.addTo(map);
                cl.addOverlay(gauge , '測站-自動雨量站');
            } else {
                cl.removeLayer(gauge);
                gauge.remove();
            }
        })
        document.querySelector('#stn4').addEventListener('change' , function(){
            if (this.checked) {
                rain = L.xmlPicture(xmlRainUrl , 'rain' , {
                    fillOpacity: 0.5 , 
                    attribution: cwbAttribution
                });
                rain.addTo(map);
                cl.addOverlay(rain , '測站-日累積雨量圖');
            } else {
                cl.removeLayer(rain);
                rain.remove();
            }
        })
        document.querySelector('#stn5').addEventListener('change' , function(){
            if (this.checked) {
                temp = L.xmlPicture(xmlTempUrl , 'temp' , {
                    fillOpacity: 0.5 , 
                    attribution: cwbAttribution
                });
                temp.addTo(map);
                cl.addOverlay(temp , '測站-氣溫分布圖');
            } else {
                cl.removeLayer(temp);
                temp.remove();
            }
        })

        document.querySelector('#qpf1').addEventListener('change' , function(){
            if (this.checked) {
                qpf12 = L.imageOverlay(imgQPF12Url, imgQPFBounds, {
                    opacity: 0.7,
                    attribution: cwbAttribution,
                });
                qpf12.addTo(map);
                cl.addOverlay(qpf12 , 'QPF-0-12h');
            } else {
                cl.removeLayer(qpf12);
                qpf12.remove();
            }
        })
        document.querySelector('#qpf2').addEventListener('change' , function(){
            if (this.checked) {
                qpf24 = L.imageOverlay(imgQPF24Url, imgQPFBounds, {
                    opacity: 0.7,
                    attribution: cwbAttribution,
                });
                qpf24.addTo(map);
                cl.addOverlay(qpf24 , 'QPF-12-24h');
            } else {
                cl.removeLayer(qpf24);
                qpf24.remove();
            }
        })

        document.querySelector('#sat1').addEventListener('change' , function(){
            if (this.checked) {
                satvistw = L.imageOverlay(imgSatVISUrl, imgSatBounds, {
                    opacity: 0.5,
                    attribution: cwbAttribution,
                });
                satvistw.addTo(map);
                cl.addOverlay(satvistw , '衛星-可見光雲圖');
            } else {
                cl.removeLayer(satvistw);
                satvistw.remove();
            }
        })
        document.querySelector('#sat2').addEventListener('change' , function(){
            if (this.checked) {
                satirctw = L.imageOverlay(imgSatIRcUrl, imgSatBounds, {
                    opacity: 0.5,
                    attribution: cwbAttribution,
                });
                satirctw.addTo(map);
                cl.addOverlay(satirctw , '衛星-IR彩色雲圖');
            } else {
                cl.removeLayer(satirctw);
                satirctw.remove();
            }
        })
        document.querySelector('#sat3').addEventListener('change' , function(){
            if (this.checked) {
                satirgtw = L.imageOverlay(imgSatIRgUrl, imgSatBounds, {
                    opacity: 0.5,
                    attribution: cwbAttribution,
                });
                satirgtw.addTo(map);
                cl.addOverlay(satirgtw , '衛星-IR黑白雲圖');
            } else {
                cl.removeLayer(satirgtw);
                satirgtw.remove();
            }
        })
        document.querySelector('#sat4').addEventListener('change' , function(){
            if (this.checked) {
                satiretw = L.imageOverlay(imgSatIReUrl, imgSatBounds, {
                    opacity: 0.5,
                    attribution: cwbAttribution,
                });
                satiretw.addTo(map);
                cl.addOverlay(satiretw , '衛星-IR色調強化雲圖');
            } else {
                cl.removeLayer(satiretw);
                satiretw.remove();
            }
        })

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

        new L.Control.Attribution({position: 'bottomright' , prefix: leafletAttribution}).addTo(map);
        new L.Control.Scale({position: 'bottomright' , imperial: false}).addTo(map)
        new L.Control.Locate({position: 'bottomright' , strings: {title: "定位"}}).addTo(map)
        new L.Control.FullScreen({position: 'bottomright' , title: '全螢幕' , titleCancel: '關閉全螢幕'}).addTo(map)
        new L.Control.Search({position: 'topleft' , textPlaceholder: "搜尋"}).addTo(map)
        new L.Control.Zoom({position: 'bottomright' , zoomInTitle: '放大' , zoomOutTitle: '縮小'}).addTo(map);
        new L.Control.Loading({position: 'bottomright'}).addTo(map);
        // new L.Control.GroupedLayers(baselayers , overlays , {collapsed: false , groupCheckboxes: true , exclusiveGroups: ["閃電" , "QPF" , "衛星"] , }).addTo(map);
        
        // map.removeControl(z)
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