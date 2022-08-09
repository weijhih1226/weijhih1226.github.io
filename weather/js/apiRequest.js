const options = {
    // Required: API key
    key: 'x7Uj5Ay3gd9q2Qhuaxd4CtLIRJ24Lx3t', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 23.8,
    lon: 121,
    zoom: 5,
};

windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map

    L.popup()
        .setLatLng([23.8, 121])
        .setContent('Taiwan')
        .openOn(map);
});

function gettingPosition(){
    if(navigator.geolocation){
        return new Promise((resolve, reject) => {
            let option = {
                enableAcuracy:false, // 提高精確度
                maximumAge:0, // 設定上一次位置資訊的有效期限(毫秒)
                timeout:10000 // 逾時計時器(毫秒)
            };
            navigator.geolocation.getCurrentPosition(resolve, reject, option);
        })
    }else{
        alert("Does not support positioning!");
    }
}
function successCallback(position){
    console.log(position);
}
function errorCallback(error) {
    alert(error.message); //error.code
}

function mapCenterControl(map, clickButton) {
    let centerControlDiv = document.createElement('div');

    // Set CSS for the control border.
    let controlUI = document.createElement('button');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = 'none';
    controlUI.style.outline = 'none';
    controlUI.style.width = '40px';
    controlUI.style.height = '40px';
    controlUI.style.borderRadius = '2px';
    controlUI.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginRight = '10px';
    controlUI.style.padding = '0';
    controlUI.title = 'Your Location';
    centerControlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    let controlText = document.createElement('div');
    controlText.style.margin = '10px';
    controlText.style.width = '30px';
    controlText.style.height = '30px';
    controlText.style.backgroundImage = 'url(\'../image/icon/location-pin.svg\')';
    controlText.style.backgroundSize = '20px 20px';
    controlText.style.backgroundPosition = '0px 0px';
    controlText.style.backgroundRepeat = 'no-repeat';
    controlUI.appendChild(controlText);

    // constructor passing in this DIV.
    centerControlDiv.index = 1; // 排列優先度
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv); // 設定按鈕加入地圖的位置

    // Setup the click event listeners.
    controlUI.addEventListener('click', () => clickButton());
}

function initMap() {
    var center = {lat: 23.8, lng: 121};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: center
    });
    mapCenterControl(map,
		() => gettingPosition()
		.then(position => successCallback(position))
	    .catch(error => errorCallback(error))
    )
    // var marker = new google.maps.Marker({
    //   position: center,
    //   map: map
    // });
}