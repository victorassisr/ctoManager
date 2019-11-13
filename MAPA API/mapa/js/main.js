var monument = [-77.0353, 38.8895];

mapboxgl.accessToken = 'pk.eyJ1IjoidmljdG9yYXIiLCJhIjoiY2ptcDRoY3p0MTJ1azNxcjBvaXg1M2JpaiJ9.ZZ-n5OCsb0MOyW0qn9jAqQ';

var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: [-74.50, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});


var popup = new mapboxgl.Popup({ offset: 25 })
.setHTML('<h1>Meu marcador</h1><a href="http://www.google.com" alt="Google" title="Google">GOOGLE</a>');
 
// create DOM element for the marker
var el = document.createElement('div');

el.id = 'marker';
 
// create the marker
new mapboxgl.Marker(el)
.setLngLat(monument)
.setPopup(popup) // sets a popup on this marker
.addTo(map);