// Add console.log to check to see if out code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Dark tile layer.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both map.

let baseMaps = {
    Street : streets,
    Dark: dark
}

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/calvogeorge/Mapping_Earthquakes/main/Major_Airports/static/js/majorAirports.json"

// Grabbing out GeoJSON data
d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJson layer with the retrived Data.
    L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h4>Airport Code: "+feature.properties.faa+"</h4><hr><h4>Airport Name: "+feature.properties.name+"</h4>")
        }
    }).addTo(map);
});