import React, { Component } from 'react'
import Deck from '../deck/Deck.js'
import Board from '../board/Board.js'
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
            current_turn: [1, 2],
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
        this.fetchData()
    }

    fetchData(){
        var shuffle_player1 = require('shuffle-array')
        var shuffle_player2 = require('shuffle-array')

        DecksModel.all().then( (res) => {
            this.setState({
                deck_player1: shuffle_player1(res.data),
            }, function(){
                this.setDeckPlayer1()
            })
        })

        //Two calls to database because it wasn't shuffling
        DecksModel.all().then( (res) => {
            this.setState({
                deck_player2: shuffle_player2(res.data)
            }, function(){
                this.setDeckPlayer2()
            })
        })

    }

    setDeckPlayer1() {
        let initial_hand_player1 = this.state.deck_player1.slice(0,5)
        let initial_deck_player1 = this.state.deck_player1.slice(5)
        this.setState({
            current_hand_player1: initial_hand_player1,
            deck_player1: initial_deck_player1
        })
    }

    setDeckPlayer2() {
        let initial_hand_player2 = this.state.deck_player2.slice(0,6)
        let initial_deck_player2 = this.state.deck_player2.slice(6)
        this.setState({
            current_hand_player2: initial_hand_player2,
            deck_player2: initial_deck_player2
        })
    }

    drawCard() {
        if (this.state.current_turn[0] === 1) {
            let new_card = this.state.deck_player1.shift()
            let new_deck = this.state.deck_player1
            let new_hand = this.state.current_hand_player1
            new_hand.push(new_card)
            this.setState({
                current_hand_player1: new_hand,
                deck_player1: new_deck
            })
        }

        else if (this.state.current_turn[0] === 2) {
            let new_card = this.state.deck_player2.shift()
            let new_deck = this.state.deck_player2
            let new_hand = this.state.current_hand_player2.push(new_card)
            // console.log(new_hand)
            this.setState({
                current_hand_player2: new_hand,
                deck_player2: new_deck
            })
        }
    }

    playMonsterCard() {
        // let new_monster_field_player1 =
        if (this.state.current_turn === 1) {
            if (this.state.monster_field_player1.length < 5) {
                this.setState({
                    monster_field_player1: this.state.monster_field_player1.push()
                })
            }
        }
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 center-page">
                        <Deck
                            // hand = {this.state.current_hand_player1.map((card) => {
                            //     return (
                            //         <p>{card.card_name}</p>
                            //     )
                            // })}
                        />
                        <Board
                            draw={this.drawCard.bind(this)}
                            current_hand_player1 = {this.state.current_hand_player1
                            .map((card) => {
                                return (
                                    <span onClick=""> {card.card_name} </span>
                                )
                            })}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Game