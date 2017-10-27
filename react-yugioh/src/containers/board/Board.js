import React, { Component } from 'react'
import Deck from '../deck/Deck.js'

class Board extends Component {

    constructor(){
        super()
        this.state = {
            current_hand_player1: [], current_hand_player2: [],
            current_hand: [],
            monster_field_player1: [], monster_field_player2: [],
        }
    }

    getCurrentHand(hand) {
        this.setState({
            current_hand: hand
        })
    }

    playMonsterCard(monster) {
        if (this.props.checkIfBattlePhasePlayer1()) {
            if (this.state.monster_field_player1.length < 5) {
                this.state.monster_field_player1.push(monster)

                this.setState({
                    monster_field_player1: this.state.monster_field_player1,
                })
            }
        }
        else if (this.props.checkIfBattlePhasePlayer2()) {
            if (this.state.monster_field_player2.length < 5) {
                this.state.monster_field_player2.push(monster)

                this.setState({
                    monster_field_player2: this.state.monster_field_player2,
                })
            }
        }
    }

    render() {

        return(
            <div className="container">
                <div className="row">
                    <Deck
                        playMonster={this.playMonsterCard.bind(this)}
                        getCurrentHand={this.getCurrentHand.bind(this)}
                    />
                </div>
                <div className="row spell_p2">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
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
                    <div className="col-sm-1 graveyard">Graveyard</div>
                    <div className="col-sm-6">
                        {this.state.monster_field_player2.map((monster) => {
                            return (
                                <span className="col-sm-2">{monster.card_name}</span>
                            )})}
                    </div>
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
                    <div className="col-sm-6">
                        {this.state.monster_field_player1.map((monster) => {
                            return (
                                <span className="col-sm-2">{monster.card_name}</span>
                            )})}
                    </div>
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
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                </div>
                <div className="row">
                    <Deck
                        playMonster={this.playMonsterCard.bind(this)}
                        getCurrentHand={this.getCurrentHand.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default Board