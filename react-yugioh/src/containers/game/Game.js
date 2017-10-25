import React, { Component } from 'react'
import Deck from '../deck/Deck.js'
import DecksModel from '../../models/Deck.js'

class Game extends Component {

    constructor(){
        super()
        this.state = {
            lifepoints_player1: 8000,
            lifepoints_player2: 8000,
            graveyard_player1: [],
            graveyard_player2: [],
            deck_player1: [],
            deck_player2: [],
            current_hand_player1: [],
            current_hand_player2: [],
            current_turn: [],
            monster_field_player1: [],
            monster_field_player2: [],
            spell_field_player1: [],
            spell_field_player2: [],
            phase_player1: ['Draw Phase', 'Standby Phase', 'Main Phase 1', 'Battle Phase',
            'Main Phase 2', 'End Phase'],
            phase_player2: ['Draw Phase', 'Standby Phase', 'Main Phase 1', 'Battle Phase',
                'Main Phase 2', 'End Phase']
        }
    }

    componentWillMount() {
        this.fetchData(this.startGame())
    }

    // drawCard()

    fetchData(startGame){
        var shuffle_player1 = require('shuffle-array')
        var shuffle_player2 = require('shuffle-array')

        DecksModel.all().then( (res) => {
            this.setState({
                deck_player1: shuffle_player1(res.data),
            }), startGame
        })

        //Two calls to database because it wasn't shuffling
        DecksModel.all().then( (res) => {
            this.setState({
                deck_player2: shuffle_player2(res.data)
            }), startGame
        })

    }

    startGame() {
        let initial_hand_player2 = this.state.deck_player2
        console.log(initial_hand_player2)
        this.setState({
            current_hand_player1: initial_hand_player2
        })
    }


    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 center-page">
                        <Deck
                            hand = {this.state.current_hand_player1}
                            // deck_playerz = {this.state.deck_player1.map((post) => {
                            //     return (
                            //         <p>{post.card_name}</p>
                            //     )
                            // })}
                            //
                            // deck_players = {this.state.deck_player2.map((post2) => {
                            //     return (
                            //         <p>{post2.card_name}</p>
                            //     )
                            // })}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Game