import React, { Component } from 'react';
import MapContainer from './MapContainer';

class MainScreen extends Component {
    state = { 
        
    }

    render () {
        return (
            <main className="main-screen"> 
                <MapContainer />
            </main>
        )
    }
}

export default MainScreen;