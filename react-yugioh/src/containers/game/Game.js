import React, { Component } from 'react'
import Deck from '../deck/Deck.js'
import Board from '../board/Board.js'
import DecksModel from '../../models/Deck.js'

class Game extends Component {
    //move axios to board level

    constructor(){
        super()
        this.state = {
            all_cards: [],
            lifepoints_player1: 8000, lifepoints_player2: 8000,
            graveyard_player1: [], graveyard_player2: [],
            deck_player1: [], deck_player2: [],
            current_hand_player1: [], current_hand_player2: [],
            current_turn: [1, 2],
            monster_field_player1: [], monster_field_player2: [],
            spell_field_player1: [], spell_field_player2: [],
            phase_index_player1: 0, phase_index_player2: 2,
            phase_player1: ['Draw Phase', 'Battle Phase', 'End Phase'],
            phase_player2: ['Draw Phase', 'Battle Phase', 'End Phase'],
            attacker: 0, attacked: 0,
            // phase_player1: ['Draw Phase', 'Standby Phase', 'Main Phase 1', 'Battle Phase',
            //     'Main Phase 2', 'End Phase'],
            // phase_player2: ['Draw Phase', 'Standby Phase', 'Main Phase 1', 'Battle Phase',
            //     'Main Phase 2', 'End Phase'],
        }
    }

    componentWillMount(){
        this.fetchData()
    }

    fetchData() {
        DecksModel.all().then( (res) => {
            this.setState({
                all_cards: res.data
            }, function(){
                console.log(this.state.all_cards)
            })
        })
    }

    checkIfBattlePhasePlayer1() {
        if(this.state.phase_player1[this.state.phase_index_player1] === 'Battle Phase' && this.state.current_turn[0] === 1) {
            return true
        }
        return false
    }

    checkIfBattlePhasePlayer2() {
        if(this.state.phase_player2[this.state.phase_index_player2] === 'Battle Phase' && this.state.current_turn[0] === 2) {
            return true
        }
        return false
    }

    updatePhaseTurn() {
        if (this.state.current_turn[0] === 1) {
            this.setState({
                phase_index_player1: 1
            })
        }

        if (this.state.current_turn[0] === 2) {
            this.setState({
                phase_index_player2: 1
            })
        }
    }

    updateHand(hand) {
        console.log('fjfdsj')
        if (this.state.current_turn[0] === 1) {
            this.setState({
                current_hand_player1: hand
            })
        }

        if (this.state.current_turn[0] === 2) {
            this.setState({
                current_hand_player2: hand
            })
        }
    }

    getCardInfo(cardName) {
        return this.state.all_cards.find((card) => {
            return card.card_name === cardName
        })
    }

    playMonsterCard(e) {
        if (this.checkIfBattlePhasePlayer1()) {
            if (this.state.monster_field_player1.length < 5) {
                this.state.monster_field_player1.push(e.target.innerHTML)

                this.setState({
                    monster_field_player1: this.state.monster_field_player1
                })

                let index = this.state.current_hand_player1.findIndex((card) => {
                    return card.card_name === e.target.innerHTML
                })

                console.log(this.state.current_hand_player1)
                this.state.current_hand_player1.splice(index, 1)
            }
        }
        else if (this.checkIfBattlePhasePlayer2()) {
            if (this.state.monster_field_player2.length < 5) {
                this.state.monster_field_player2.push(e.target.innerHTML)

                this.setState({
                    monster_field_player2: this.state.monster_field_player2
                })

                console.log(this.state.current_hand_player2)
                console.log(e.target.innerHTML)
                let index = this.state.current_hand_player2.findIndex((card) => {
                    return card.card_name === e.target.innerHTML
                })

                this.state.current_hand_player2.splice(index, 1)
            }
        }
    }

    directAttack(e){
        let attackerInfo = (this.getCardInfo(this.state.attacker.card_name))
                this.setState({
                    lifepoints_player2: this.state.lifepoints_player2 - attackerInfo.attack

                }, function() {
                    console.log(this.state.lifepoints_player2)
                })
    }

    attack(e) {
        if (this.state.current_turn[0] ===1 && this.state.monster_field_player2.length === 0) {
            this.directAttack(e);
        }
        else if (this.state.current_turn[0] ===2 && this.state.monster_field_player1.length === 0) {
            this.directAttack(e);
        }
        else if (this.state.attacker && this.state.attacked) {
            this.attackMonster(e);
        }
    }

    attackMonster(e) {
        if (this.checkIfBattlePhasePlayer1()) {
            this.setState({
                lifepoints_player2: this.state.lifepoints_player2-
                (this.state.attacker.attack-this.state.attacked.attack)
            })
        }
    }


    getPhase() {
        if (this.state.current_turn[0] === 1) {
            return 'Player 1: ' +  this.state.phase_player1[this.state.phase_index_player1]
        }

        else {
            return 'Player 2: ' +  this.state.phase_player2[this.state.phase_index_player2]
        }
    }

    endPhase() {
        if (this.state.current_turn[0] === 1) {
            if (this.state.phase_index_player1 < this.state.phase_player1.length-1) {
                this.setState({
                    phase_index_player1: this.state.phase_index_player1 + 1
                })
            }
            else {
                this.setState({
                    current_turn: [2, 1],
                    phase_index_player2: 0
                })
            }
        }

        else if (this.state.current_turn[0] === 2) {
            if (this.state.phase_index_player2 < this.state.phase_player2.length-1) {
                this.setState({
                    phase_index_player2: this.state.phase_index_player2 + 1
                })
            }
            else {
                this.setState({
                    current_turn: [1, 2],
                    phase_index_player1: 0
                })
            }
        }
    }

    attackButton(e) {
        console.log(this.state.attacker, 'this is the attacker')
        if (this.checkIfBattlePhasePlayer1()){
            console.log(this.state.all_cards, 'zzzzzj')
            var attackerCard = this.state.all_cards.find((card) => {
                console.log("found attackerCard")
                return card.card_name === this.state.attacker
            });
            var attackedCard = this.state.all_cards.find((card) => {
                return card.card_name === this.state.attacked
            });
            this.setState({
                attacker: attackerCard,
                attacked: attackedCard
            }, function () {
                console.log(this.state.attacker, 'before')
                this.attack(e)
                console.log(this.state.attacker, 'after')
            })
        }
    }

    selectAttackerPlayer2(e) {
        if (this.state.phase_player2[this.state.phase_index_player2] === "Battle Phase") {
            this.setState({
                attacker: e.target.innerHTML
            })
        }
    }

    selectAttackedByPlayer1(e) {
        if (this.state.phase_player1[this.state.phase_index_player1] === "Battle Phase") {
            this.setState({
                attacked: e.target.innerHTML
            })
        }
    }


    selectAttackerPlayer1(e) {
        if (this.state.phase_player1[this.state.phase_index_player1] === "Battle Phase") {
            this.setState({
                attacker: e.target.innerHTML
            }, function() {
                console.log(this.state.attacker, 'the attacker has been selected')
            })
        }
    }

    selectAttackedByPlayer2(e) {
        if (this.state.phase_player2[this.state.phase_index_player2] === "Battle Phase") {
            this.setState({
                attacked: e.target.innerHTML
            })
        }
    }

    monsterFieldPlayer1(e) {
        this.selectAttackerPlayer1(e)
        this.selectAttackedByPlayer2(e)
    }

    monsterFieldPlayer2(e) {
        this.selectAttackerPlayer2(e)
        this.selectAttackedByPlayer1(e)
    }

    render() {
        if (this.checkIfBattlePhasePlayer1()) {
            var attack1 = <button onClick={(e) => this.attackButton()}>Attack</button>
        }

        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 center-page">
                        <div className="col-sm-2">Empty Area</div>
                        <Deck player={'Player 2'} turn={this.state.current_turn}
                              phase_player2={this.state.phase_index_player2}
                              updatePhaseTurn={this.updatePhaseTurn.bind(this)}
                              playMonster={this.playMonsterCard.bind(this)}
                              updateHand={this.updateHand.bind(this)}
                        />
                        <div className="col-sm-2">Empty Area</div>
                        <div className="col-sm-1">Lifepoints: {this.state.lifepoints_player2}</div>
                        <Board
                            attack = {attack1}
                            lifepoints_player1 = {this.state.lifepoints_player1}
                            lifepoints_player2 = {this.state.lifepoints_player2}
                            current_phase = {this.getPhase()}
                            end_phase = {this.endPhase.bind(this)}
                            current_hand_player2 = {this.state.current_hand_player2}

                            monster_field_player1 = {this.state.monster_field_player1
                            .map((monster) => {
                                return (
                                    <span onClick={(e) => this.monsterFieldPlayer1(e)}>
                                        {monster}
                                    </span>
                                )
                            })}
                            monster_field_player2 = {this.state.monster_field_player2
                            .map((monster) => {
                                return (
                                    <span onClick={(e) => this.monsterFieldPlayer2(e)}>
                                        {monster}
                                    </span>
                                )
                            })}
                        />
                        <div className="row hand_p1">
                            <div className="col-sm-1">1</div>
                            <div className="col-sm-1">1</div>
                            <div className="col-sm-1">1</div>
                                <Deck player={"Player 1"} updatePhaseTurn={this.updatePhaseTurn.bind(this)}
                                      turn={this.state.current_turn} phase={this.state.phase_index_player1}
                                      playMonster={this.playMonsterCard.bind(this)}
                                      updateHand={this.updateHand.bind(this)}
                                />
                            <div className="col-sm-1">1</div>
                            <div className="col-sm-1">Lifepoints: {this.state.lifepoints_player1}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game