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

    getCardInfo(cardName) {
        return this.state.all_cards.findIndex((card) => {
            console.log(card)
            return card.card_name === cardName
        })
    }

    // componentWillMount() {
    //     this.fetchData()
    // }
    //
    // fetchData(){
    //     var shuffle_player1 = require('shuffle-array')
    //     var shuffle_player2 = require('shuffle-array')
    //
    //
    //
    //     DecksModel.all().then( (res) => {
    //         this.setState({
    //             deck_player1: shuffle_player1(res.data),
    //             all_cards: res.data
    //         }, function(){
    //             this.setDeckPlayer1()
    //         })
    //     })
    //
    //     //Two calls to database because it wasn't shuffling
    //     DecksModel.all().then( (res) => {
    //         this.setState({
    //             deck_player2: shuffle_player2(res.data)
    //         }, function(){
    //             this.setDeckPlayer2()
    //         })
    //     })
    // }

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

    drawCardPlayer1() {
        if (this.state.current_turn[0] === 1 && this.state.phase_index_player1 === 0) {
            let new_card = this.state.deck_player1.shift()
            let new_deck = this.state.deck_player1
            let new_hand = this.state.current_hand_player1
            new_hand.push(new_card)
            this.setState({
                current_hand_player1: new_hand,
                deck_player1: new_deck,
                phase_index_player1: this.state.phase_index_player1+1
            })
        }
    }

    drawCardPlayer2() {
        if (this.state.current_turn[0] === 2 && this.state.phase_index_player2 === 0) {
            let new_card = this.state.deck_player2.shift()
            let new_deck = this.state.deck_player2
            let new_hand = this.state.current_hand_player2
            new_hand.push(new_card)
            this.setState({
                current_hand_player2: new_hand,
                deck_player2: new_deck,
                phase_index_player2: this.state.phase_index_player2+1
            })
        }
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

                this.state.current_hand_player1.splice(index, 1)
            }
        }
        else if (this.checkIfBattlePhasePlayer2()) {
            if (this.state.monster_field_player2.length < 5) {
                this.state.monster_field_player2.push(e.target.innerHTML)

                this.setState({
                    monster_field_player2: this.state.monster_field_player2
                })

                let index = this.state.current_hand_player2.findIndex((card) => {
                    return card.card_name === e.target.innerHTML
                })

                this.state.current_hand_player2.splice(index, 1)
            }
        }
    }

    directAttack(e){
        let attackerInfo = (this.getCardInfo(this.state.attacker.card_name))
        console.log(attackerInfo)
                // this.setState({
                //     lifepoints_player2: this.state.lifepoints_player2 - card.attack
                //
                // }, function() {
                //     console.log(this.state.lifepoints_player2)
                // })
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
        if (this.checkIfBattlePhasePlayer1()){
            var attackerCard = this.state.all_cards.find((card) => {
                return card.card_name === this.state.attacker
            });
            var attackedCard = this.state.all_cards.find((card) => {
                return card.card_name === this.state.attacked
            });
            this.setState({
                attacker: attackerCard,
                attacked: attackedCard
            }, function () {
                this.attack(e)
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
            var attack1 = <button onClick={(e) => this.attackButton(() => {
                    console.log('zzz')
            })}>Attack</button>
        }

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
                            attack = {attack1}
                            lifepoints_player1 = {this.state.lifepoints_player1}
                            lifepoints_player2 = {this.state.lifepoints_player2}
                            current_phase = {this.getPhase()}
                            drawCardPlayer1={this.drawCardPlayer1.bind(this)}
                            drawCardPlayer2={this.drawCardPlayer2.bind(this)}
                            end_phase = {this.endPhase.bind(this)}

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
                    </div>
                </div>
            </div>
        )
    }
}

export default Game