
// Code based on the google-maps-react tutorial by Rachel Njeri
// https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
import React, { Component } from 'react';
import places from './data/places.json';
import { promises } from 'fs';



class MapContainer extends Component {
    flickrKey = 'df28ab91eece9af8243f30ee767e75ac';

    state = {
        places: []
    }


    getPlaces = () => {
        this.setState(
            { places: places.locations }
        );
    }

    initMap = () => {
        // Set initial point
        const ikebukuro = { lat: 35.726081, lng: 139.721864 };
        const map = new window.google.maps.Map(document.getElementById('map'),
            {
                zoom: 15,
                center: ikebukuro
            });
        const markers = [];

        const largeInfoWindow = new window.google.maps.InfoWindow();

        const populateInfoWindow = (marker, infoWindow) => {
            // Iterate through markers
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

    createUrlFromText = (text) => `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.flickrKey}&text=${text}&format=json&nojsoncallback=1`;

    getFlickrPhotos = (url) => fetch(url)
        .then(nonJsonPromise => nonJsonPromise.json())
        .then(jsonResponse => jsonResponse.photos.photo);

    getFirstPhotoUrl = (flickrPhotos) => {
        const firstPhoto = flickrPhotos[0];
        // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
        const imgUrl = `https://farm${firstPhoto.farm}.staticflickr.com/${firstPhoto.server}/${firstPhoto.id}_${firstPhoto.secret}_m.jpg`;
        return imgUrl;
    }

    getFirstPhotoFromPlace = async (place) => {
        const text = place.title;
        const url = this.createUrlFromText(text);
        const photosWrapper = await this.getFlickrPhotos(url);
        return this.getFirstPhotoUrl(photosWrapper);
    }


    async componentDidMount() {
        await this.getPlaces();
        const photos = this.state.places.map(place => this.createUrlFromText(place.title))
            .map(async url => await this.getFlickrPhotos(url));
        const resolvedPhotos = await Promise.all(photos);
        const photoLinks = resolvedPhotos.map(photo => this.getFirstPhotoUrl(photo));
        console.log(photoLinks);
        this.injectScript();

    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}







export default MapContainer;


