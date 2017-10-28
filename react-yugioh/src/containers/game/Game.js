import React, { Component } from 'react'
import Board from '../board/Board.js'
import DecksModel from '../../models/Deck.js'

class Game extends Component {
    //move axios to board level

    constructor(){
        super()
        this.state = {
            winner: "",
            all_cards: [],
            lifepoints_player1: 8000, lifepoints_player2: 8000,
            lifepoints: 8000,
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
        DecksModel.decks().then( (res) => {
            this.setState({
                all_cards: res.data
            }, function(){
                // console.log(this.state.all_cards)
            })
        })
    }

    checkIfDrawPhasePlayer1() {
        if(this.state.phase_player1[this.state.phase_index_player1] === 'Draw Phase' && this.state.current_turn[0] === 0) {
            return true
        }
        return false
    }

    checkIfDrawPhasePlayer2() {
        if(this.state.phase_player2[this.state.phase_index_player2] === 'Draw Phase' && this.state.current_turn[0] === 0) {
            return true
        }
        return false
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

    getCardInfo(cardName) {
        return this.state.all_cards.find((card) => {
            return card.card_name === cardName
        })
    }

    setMonsterCard(e) {
        console.log(this.state)
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

    monsterFieldPlayer1(e) {
        this.selectAttackerPlayer1(e)
        this.selectAttackedByPlayer2(e)
    }

    monsterFieldPlayer2(e) {
        this.selectAttackerPlayer2(e)
        this.selectAttackedByPlayer1(e)
    }

    winCondition() {
        if (this.state.lifepoints_player1 <= 0) {
            this.setState({
                winner: "Player 2"
            })
        }
        else if (this.state.lifepoints_player2 <= 0) {
            this.setState({
                winner: "Player 1"
            })
        }
    }

    getLifepoints(attack) {
        console.log(this.state.current_turn[0], 'current turn')
        if (this.state.current_turn[0] === 1) {
            this.setState({
                lifepoints_player2: this.state.lifepoints_player2-attack
            }, function() {
                console.log(this.state.lifepoints_player2)
                this.winCondition()
            })
        }
        else if (this.state.current_turn[0] === 2) {
            this.setState({
                lifepoints_player1: this.state.lifepoints_player1-attack
            }, function() {
                this.winCondition()
            })
        }
    }



    render() {
        if (this.checkIfBattlePhasePlayer1()) {
            var attack1 = <button onClick={(e) => this.attackButton()}>Attack</button>
        }

        let winner = this.state.winner != ""

        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 center-page">
                        {winner ? <h1>{this.state.winner} has won!</h1> : ""}
                        <div className="col-sm-12">Lifepoints: {this.state.lifepoints_player2}</div>
                        <Board
                            //deck functions
                            player={'Player 1'} turn={this.state.current_turn}
                            phase_index_player1={this.state.phase_index_player1}
                            phase_index_player2={this.state.phase_index_player2}
                            updatePhaseTurn={this.updatePhaseTurn.bind(this)}
                            // playMonster={this.playMonsterCard.bind(this)}
                            setMonsterCard={this.setMonsterCard.bind(this)}

                            attack = {attack1}
                            lifepoints = {this.state.lifepoints}
                            lifepoints_player1 = {this.state.lifepoints_player1}
                            lifepoints_player2 = {this.state.lifepoints_player2}
                            current_phase = {this.getPhase()}
                            end_phase = {this.endPhase.bind(this)}
                            current_hand_player2 = {this.state.current_hand_player2}
                            checkIfBattlePhasePlayer1={this.checkIfBattlePhasePlayer1.bind(this)}
                            checkIfBattlePhasePlayer2={this.checkIfBattlePhasePlayer2.bind(this)}
                            current_turn={this.state.current_turn}
                            checkDrawPhasePlayer1 = {this.checkIfDrawPhasePlayer1.bind(this)}
                            checkDrawPhasePlayer2 = {this.checkIfDrawPhasePlayer2.bind(this)}
                            getLifepoints={this.getLifepoints.bind(this)}

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
                        <div className="row lifepoints">

                            <div className="col-sm-12">Lifepoints: {this.state.lifepoints_player1}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game