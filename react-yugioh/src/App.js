import React, { Component } from 'react';
// import Deck from '../src/containers/deck/Deck.js'
import Game from '../src/containers/game/Game.js'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Game />
            </div>
        );
    }
}

export default App;