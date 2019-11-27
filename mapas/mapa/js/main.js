window.onload = () => {
    let urlAPI = 'http://localhost/api/ctos';

    axios.post('http://localhost/api/auth',{
        usuario : "admin",
        senha : "admin"
    }).then(res => {

        axios.get(urlAPI,{
            headers: {
                'X-Access-Token' : res.data.token
            }
        })
            .then((response) => {
                let boxes = response.data;
                for (let i in boxes) {
                    let popup = new mapboxgl.Popup({ offset: 25 })
                        .setHTML('<h1>Caixa ID</h1><h3>Detalhes</h3><a href="infoCaixa.html?id='+boxes[i].idCaixa+'" alt="Caixa" title="CTO">Detalhes</a>');
                    // create DOM element for the marker
                    let el = document.createElement('div');
                    el.id = 'marker';
                    // create the marker
                    new mapboxgl.Marker(el)
                        .setLngLat([boxes[i].longitude, boxes[i].latitude])
                        .setPopup(popup) // sets a popup on this marker
                        .addTo(map);
                }
            })
            .catch((err) => {
                alert("Houve um erro!");
                console.log(err.message);
            });

    });

}


let center = { lat: -18.574251, lng: -46.513584 };

mapboxgl.accessToken = 'pk.eyJ1IjoidmljdG9yYXIiLCJhIjoiY2ptcDRoY3p0MTJ1azNxcjBvaXg1M2JpaiJ9.ZZ-n5OCsb0MOyW0qn9jAqQ';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [center.lng, center.lat], // starting position [lng, lat]
    zoom: 14 // starting zoom
});