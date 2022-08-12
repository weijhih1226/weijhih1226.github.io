// import 'KMZImageOverlay.js';

window.addEventListener("DOMContentLoaded" , function(){
    // 放置地圖
    var map = L.map('map' , {
        center: [23.8, 121], // 中心點座標
        zoom: 7, // 0 - 18
        mapTypeId: 'hybrid',
        mapTypeIds: ['streets', 'satellite', 'hybrid', 'terrain', 'openStreets'],
        preferCanvas: true, // recommended when loading large layers.
        attributionControl: true,
        // markerZoomAnimation: false,
        gestureHandling: false,
        zoomControl: false,
        scaleControl: true,
        pegmanControl: true,
        locateControl: true,
        fullscreenControl: true,
        layersControl: true,
        minimapControl: {
            toggleDisplay: true,
            toggleMapTypes: true, // Automatically switch between "satellite" and "roads" layers.
            mapOptions: {
                mapTypeId: 'streets',
            }
        },
        editInOSMControl: false,
        loadingControl: false,
        searchControl: true,
        disableDefaultUI: false,
        rotateControl: false,
        printControl: false,
        resizerControl: false,
        apiKeys: {thunderforest: '5ecc17cc36d44ed1ac63d35df0fd56e7' , google: 'AIzaSyAxfK5uv5MVnV51Y7THaBzNclplGe_PabA'},
        apiKeys: {thunderforest: '5ecc17cc36d44ed1ac63d35df0fd56e7'},
        
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
                    attribution: '&copy; 2022 Google',  // 商用時必須要有版權出處
                },
            },
            satellite: {
                name: '衛星',
                url: 'http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',
                options: {
                    maxZoom: 20,
                    // maxNativeZoom: 7,
                    subdomains:['mt0','mt1','mt2','mt3'],
                    attribution: '&copy; 2022 Google',
                },
            },
            hybrid: {
                name: '混合',
                url: 'http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',
                options: {
                    maxZoom: 20,
                    // maxNativeZoom: 7,
                    subdomains:['mt0','mt1','mt2','mt3'],
                    attribution: '&copy; 2022 Google',
                },
            },
            terrain: {
                name: '地形',
                url: 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
                options: {
                    maxZoom: 20,
                    // maxNativeZoom: 7,
                    subdomains:['mt0','mt1','mt2','mt3'],
                    attribution: '&copy; 2022 Google',
                }
            },
            openStreets: {
                name: '開放街圖',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                options: {
                    maxZoom: 24,
                    maxNativeZoom: 19,
                    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                },
            },
        }
    });

    map.on('plugins_loaded', function() {
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
        const radar = L.imageOverlay(imgRadarUrl, imgRadarBounds, {
            opacity: 0.5,
            zindex: 1000
        });
        const conv = L.imageOverlay(imgConvUrl, imgRadarBounds, {
            opacity: 0.5
        });
        const qpf12 = L.imageOverlay(imgQPF12Url, imgQPFBounds, {
            opacity: 0.7,
            zindex: 1
        });
        const qpf24 = L.imageOverlay(imgQPF12Url, imgQPFBounds, {
            opacity: 0.7,
            zindex: 2
        });
        const satvistw = L.imageOverlay(imgSatVISUrl, imgSatBounds, {
            opacity: 0.5
        });
        const satirctw = L.imageOverlay(imgSatIRcUrl, imgSatBounds, {
            opacity: 0.5
        });
        const satirgtw = L.imageOverlay(imgSatIRgUrl, imgSatBounds, {
            opacity: 0.5
        });
        const satiretw = L.imageOverlay(imgSatIReUrl, imgSatBounds, {
            opacity: 0.5
        });

        var overlays = {'雷達': radar , '對流胞': conv , 'QPF 0-12hr': qpf12 , 'QPF 12-24hr': qpf24 , '可見光': satvistw , 'IR彩色': satirctw , 'IR黑白': satirgtw , 'IR色調強化': satiretw};
    
        // Instantiate KMZ layer (async)
        var rain = L.kmzLayer();
        var ltng = L.kmzLayer();
        var temp = L.kmzLayer();
        rain.on('load', function(e) {
            e.name = '雨量';
            control.addOverlay(e.layer, e.name);
        });
        ltng.on('load', function(e) {
            e.name = '閃電';
            control.addOverlay(e.layer, e.name);
        });
        temp.on('load', function(e) {
            e.name = '氣溫';
            control.addOverlay(e.layer, e.name);
        });

        new L.Control.Zoom({position: 'bottomright'}).addTo(map);
        new L.Control.Loading({position: 'bottomright'}).addTo(map);
        var control = L.control.layers(null , overlays , { collapsed:false }).addTo(map); // 加入地圖切換控制項

        // Add remote KMZ files as layers (NB if they are 3rd-party servers, they MUST have CORS enabled)
        rain.add(kmzRainUrl);
        ltng.add(kmzLtngUrl);
        temp.add(kmzTempUrl); 
        
        radar.addTo(map);
        ltng.addTo(map)
    });
})