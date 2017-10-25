import React, { Component } from 'react'
import DecksModel from '../../models/Deck.js'
import './Deck.css'

class Deck extends Component {

    constructor(){
        super()
        this.state = {
            deck_player1: [],
            deck_player2: [],
            current_hand_player1: [],
            current_hand_player2: [],
            current_turn: []
        }
    }
    //
    // componentWillMount(){
    //     this.fetchData()
    // }


    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 center-page">
                        <p>Yugioh</p>
                        {this.props.deck_playerz}
                        <h1>Player 2</h1>
                        {this.props.deck_players}
                        <h1>{this.props.hand}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Deck