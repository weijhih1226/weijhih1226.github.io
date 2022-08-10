// import 'KMZImageOverlay.js';

window.addEventListener("DOMContentLoaded" , function(){
    // 放置地圖
    let map = L.map('map' , {
        zoom: 7, // 0 - 18
        center: [23.8, 121], // 中心點座標
        preferCanvas: true, // recommended when loading large layers.
        attributionControl: true,
        attribution: 'Licensed by'
    })
    
    // 設定圖層來源
    const baseOpenStreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap', // 商用時必須要有版權出處
        zoomControl: true , // 是否秀出 - + 按鈕
    });
    const googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });
    const googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });
    const googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });
    const kmlRainUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/DIV2/O-A0040-003.kmz';
    // const kmlRainUrl = 'kmz/PNWAshLocations.kmz';
    const imgRadarUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-A0058-005.png';
    // const imgRadarBounds = [[17.992071044171471, 115.001445629639946], [29.004257649173013, 126.514775012745119]];
    // const imgRadarBounds = [[17.9875, 114.9875], [29.0125, 126.5125]];
    const imgRadarBounds = [[17.72, 115.00], [29.0125, 126.5125]];
    const radar = L.imageOverlay(imgRadarUrl, imgRadarBounds, {
        opacity: 0.5
    });

    let baseLayers = {
        '地圖': googleStreets,
        '衛星': googleHybrid,
        '衛星（無地名）': googleSat,
        '開放街圖': baseOpenStreet
    };
    let overlays = {'雷達': radar};

    // Instantiate KMZ layer (async)
    var kmz = L.kmzLayer();
    kmz.on('load', function(e) {
        e.name = '雨量';
        control.addOverlay(e.layer, e.name);
    });
    // Add remote KMZ files as layers (NB if they are 3rd-party servers, they MUST have CORS enabled)
    kmz.load(kmlRainUrl)

    baseLayers['衛星'].addTo(map); // 使用中文地圖作為預設
    radar.addTo(map);
    kmz.addTo(map)
    
    var control = L.control.layers(baseLayers , overlays , { collapsed:false }).addTo(map); // 加入地圖切換控制項
})