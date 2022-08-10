window.addEventListener("DOMContentLoaded" , function(){
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
    const imageUrl = 'https://cwbopendata.s3.ap-northeast-1.amazonaws.com/MSC/O-A0058-005.png';
    // const imageBounds = [[17.992071044171471, 115.001445629639946], [29.004257649173013, 126.514775012745119]];
    // const imageBounds = [[17.9875, 114.9875], [29.0125, 126.5125]];
    const imageBounds = [[17.72, 115.00], [29.0125, 126.5125]];
    const radar = L.imageOverlay(imageUrl, imageBounds, {
        opacity:0.5
    })

    let baseLayers = {
        '地圖': googleStreets,
        '衛星': googleHybrid,
        '衛星（無地名）': googleSat,
        '開放街圖': baseOpenStreet
    };
    let overlays = {'雷達': radar};

    // *** 放置地圖
    let map = L.map('map' , {
        zoom: 8, // 0 - 18
        center: [23.8, 121], // 中心點座標
    })

    baseLayers['衛星'].addTo(map); // 使用中文地圖作為預設
    radar.addTo(map);
    
    L.control.layers(baseLayers , overlays).addTo(map); // 加入地圖切換控制項
})