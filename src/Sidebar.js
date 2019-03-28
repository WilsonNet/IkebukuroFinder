import React, { Component } from 'react';

class Sidebar extends Component {
    state = {
        query: ''
    }

    render() {
        const { query } = this.state;
        return (
            <aside className="sidebar">
                <h1>Huela Muendo</h1>
            <input
                type="text"
                placeholder="Search places!"
                value={query}
            />
            </aside>
        )
    }
}

export default Sidebar;