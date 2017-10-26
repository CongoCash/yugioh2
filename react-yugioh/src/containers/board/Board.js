import React, { Component } from 'react'
import DecksModel from '../../models/Deck.js'


class Board extends Component {

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

    componentWillMount(){
        this.fetchData()
    }


    fetchData(){
        var shuffle_player1 = require('shuffle-array')
        var shuffle_player2 = require('shuffle-array')



        DecksModel.all().then( (res) => {
            this.setState({
                deck_player1: shuffle_player1(res.data),
                all_cards: res.data
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


    render() {
        return(
            <div className="container">
                <div className="row hand_p1">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-6">
                        {this.state.current_hand_player2
                    .map((card) => {
                        return (
                            <span className="col-sm-2">
                                        <span onClick={(e) => this.playMonsterCard(e)}>
                                            {card.card_name}</span>
                                    </span>
                        )
                    })}
                    </div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">Lifepoints: {this.props.lifepoints_player2}</div>
                </div>
                <div className="row spell_p2">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div onClick={this.props.drawCardPlayer2} className="col-sm-1 deck_p2">Deck</div>
                    <div className="col-sm-1 spell5_p2">1</div>
                    <div className="col-sm-1 spell4_p2">1</div>
                    <div className="col-sm-1 spell3_p2">1</div>
                    <div className="col-sm-1 spell2_p2">1</div>
                    <div className="col-sm-1 spell1_p2">1</div>
                    <div className="col-sm-1 fusion_p2">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                </div>
                <div className="row monster_p2">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1 graveyard">Graveyard</div>
                    <div className="col-sm-5">{this.props.monster_field_player2}</div>
                    <div className="col-sm-1 fusion1_p2">Fusion</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                </div>
                <div className="row phase">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-3">{this.props.current_phase}</div>
                    <div className="col-sm-3">
                        <button onClick={this.props.end_phase}>End Phase</button>
                        {this.props.attack}
                    </div>
                    <div className="col-sm-1">z</div>
                    <div className="col-sm-1">z</div>
                    <div className="col-sm-1">z</div>
                </div>
                <div className="row monster_p1">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-6">{this.props.monster_field_player1}</div>
                    <div className="col-sm-1 graveyard">Graveyard</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                </div>
                <div className="row spell_p1">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1 fusion1_p1">Fusion</div>
                    <div className="col-sm-1 spell1_p1">Spell</div>
                    <div className="col-sm-1 spell2_p1">Spell</div>
                    <div className="col-sm-1 spell3_p1">Spell</div>
                    <div className="col-sm-1 spell4_p1">Spell</div>
                    <div className="col-sm-1 spell5_p1">Spell</div>
                    <div onClick={this.props.drawCardPlayer1} className="col-sm-1 deck_p2">Deck</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                </div>
                <div className="row hand_p1">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-6">
                    {this.state.current_hand_player1
                    .map((card) => {
                        return (
                            <span className="col-sm-2">
                                        <span onClick={(e) => this.playMonsterCard(e)}>
                                            {card.card_name}</span>
                                    </span>
                        )
                    })}
                    </div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">Lifepoints: {this.props.lifepoints_player1}</div>
                </div>
            </div>
        )
    }
}

export default Board