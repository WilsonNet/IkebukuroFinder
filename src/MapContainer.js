
// Code based on the google-maps-react tutorial by Rachel Njeri
// https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
import React, { Component } from 'react';



class MapContainer extends Component {

    renderMap = () => {
        
    }
    
    initMap = () => {
        // The location of Uluru
         
        const ikebukuro = { lat: 35.724663768, lng: 139.70666384 };
        // The map, centered at Uluru
        const map = new window.google.maps.Map(document.getElementById('map'), { zoom: 12, center: ikebukuro });
        // The marker, positioned at Uluru
        const marker = new window.google.maps.Marker({ position: ikebukuro, map: map });
    }
    componentDidMount() {
        window.initMap = this.initMap;
        const script = window.document.createElement("script");
        const index = window.document.getElementsByTagName("script")[0]
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1L6dpZycTddMrRIObFEDlTofrNBawlyY&callback=initMap';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}







export default MapContainer;


