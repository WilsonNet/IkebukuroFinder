
// Code based on the google-maps-react tutorial by Rachel Njeri
// https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
import React, { Component } from 'react';
import places from './data/places.json';



class MapContainer extends Component {

    state = {
        places: []
    }


    getPlaces = () => {
        this.setState(
            { places: places.locations }
        );
    }

    initMap = () => {
        const ikebukuro = { lat: 35.724663768, lng: 139.70666384 };
        const map = new window.google.maps.Map(document.getElementById('map'),
            { 
                zoom: 12, 
                center: ikebukuro 
            });
        const markers = [];

        const largeInfoWindow = new window.google.maps.InfoWindow();

        const populateInfoWindow = (marker, infoWindow) => {
            console.log('oiii', marker);
            if (infoWindow.marker !== marker) {
                infoWindow.marker = marker;
                const content = `<div>${marker.title}</div>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
                infoWindow.addListener('closeclick', () => {
                    infoWindow.setMarker(null);
                })
            }

        }

        const markerFromPlace = (place, index) => {
            const marker = new window.google.maps.Marker({
                title: place.title,
                position: place.position,
                map: map,
                animation: window.google.maps.Animation.DROP,
                id: index
            });
            marker.addListener('click', () => {
                populateInfoWindow(marker, largeInfoWindow);
            })
            markers.push(marker);
        }
        this.state.places.forEach((place, index) => markerFromPlace(place, index));
    }

    injectScript = () => {
        // Inject a <script> tag calling the Google Maps API
        window.initMap = this.initMap;
        const script = window.document.createElement("script");
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1L6dpZycTddMrRIObFEDlTofrNBawlyY&callback=initMap';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }


    componentDidMount() {
        const api = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=836949a9fc14a32fcaf88c66c9ba6b10&text=pokemon+center+ikebukuro&format=json&nojsoncallback=1&api_sig=27a2dafa37f81ba3ecd7bb3a906a31a5';
        fetch(api).then(xd => 
             xd.json()
            ).then(jsonResponse => console.log('promessa', jsonResponse.photos.photo));
        this.getPlaces();
        this.injectScript();
        
    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}







export default MapContainer;


