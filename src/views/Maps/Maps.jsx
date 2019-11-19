import React from "react";
import axios from "axios";
import mapboxgl from "mapbox";
import {
  withScriptjs,
  withGoogleMap,
  google,
  GoogleMap,
  Marker,
} from "react-google-maps";

let urlAPI = 'http://localhost/caixas.php';

const CustomSkinMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: -18.574251, lng: -46.513584 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    > 
    let urlAPI = 'http://localhost/caixas.php';
    <script src="js/axios.js" type="text/javascript"></script>
    window.onload = () => {
        /*axios.get(urlAPI)
        .then((response) => {
            let boxes = response.data;
            for (let i in boxes) {
                //let popup = new google.maps.Popup({ offset: 25 })
                
                // create DOM element for the marker
                let el = document.createElement('div');
                el.id = 'marker';
                // create the marker
                new google.Maps.Marker(el)
                  .setHTML('<h1>Caixa ID</h1><h3>Detalhes</h3><a href="infoCaixa.html?id='+boxes[i].id+'" alt="Caixa" title="CTO">Detalhes</a>')
                  .setLngLat([boxes[i].long, boxes[i].lat])
                  //.setPopup(popup) // sets a popup on this marker
                  //.addTo(map);
            }
        })
        /*.catch((err) => {
            alert("Houve um erro!");
            console.log(err);
        })*/
}
      <Marker position={{ lat: -18.588630, lng: -46.514887 }} /> {/*linha de teste*/}
    
    </GoogleMap>
  ))
);

export default function Maps() {
  return (
    <CustomSkinMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvAaoxaV3XkC1KttVhVrXzaulXOVqIFkQ "
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />           
  );
}
