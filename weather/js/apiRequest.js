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