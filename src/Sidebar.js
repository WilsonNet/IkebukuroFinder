import React, { Component } from 'react';

class Sidebar extends Component {
    state = {
        query: ''
    }

    render() {
        return (
            <aside className="sidebar">
                <h1>Huela Muendo</h1>
            </aside>
        )
    }
}

export default Sidebar;