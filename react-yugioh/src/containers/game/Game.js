import React, { Component } from 'react'
import CardsModel from '../../models/Card.js'
import Board from '../../containers/board/Board.js'

class Game extends Component {

    constructor(){
        super()
        this.state = {
            turn: "player1",
            phase1: 0, phase2: 4,
            phase_name: ['Draw', 'Main 1', 'Battle', 'Main 2', 'End'],
            deck1: [], deck2: [],
            hand1: [], hand2: [],
            monster_field1: [], monster_field2: [],
            spell_field1: [], spell_field2: [],
            monster_selected: false, selected_monster: "",
            monster_played: false, has_drawn: false,
        }
    }

    componentWillMount(){
        this.fetchData()
    }

    fetchData(){
        var shuffle = require('shuffle-array')

        CardsModel.cards().then((res) => {
            let data = res.data
            let shuffle_deck1 = shuffle(data)
            let hand1 = shuffle_deck1.slice(0,5)
            let deck1 = shuffle_deck1.slice(5)

            this.setState({
                hand1: hand1,
                deck1: deck1,
                phase: this.state.phase+1
            })
        })

        CardsModel.cards().then((res) => {
            let data = res.data
            let shuffle_deck2 = shuffle(data)
            let hand2 = shuffle_deck2.slice(0,5)
            let deck2 = shuffle_deck2.slice(5)

            this.setState({
                hand2: hand2,
                deck2: deck2,
            })
        })
    }

    endPhase() {
        if (this.state.turn === "player1") {
            if (this.state.phase1 !== 4) {
                this.setState({
                    phase1: this.state.phase1+1,
                    monster_selected: false,
                    monster_played: false,
                    has_drawn: false,
                })
            }
            else {
                this.setState({
                    turn: "player2",
                    phase2: 0,
                    monster_selected: false,
                    monster_played: false,
                    has_drawn: false,
                })
            }
        }
        else if (this.state.turn === "player2") {
            if (this.state.phase2 !== 4) {
                this.setState({
                    phase2: this.state.phase2+1,
                    monster_selected: false,
                    monster_played: false,
                    has_drawn: false,
                })
            }
            else {
                this.setState({
                    turn: "player1",
                    phase1: 0,
                    monster_selected: false,
                    monster_played: false,
                    has_drawn: false,
                })
            }
        }
    }

    drawCard(e) {
        if (!this.state.has_drawn) {
            if (this.state.phase1 === 0 && e.target.innerHTML === "Deck 1") {
                let new_card = this.state.deck1.shift()
                this.state.hand1.push(new_card)
                this.setState({
                    hand1: this.state.hand1,
                    has_drawn: true,
                })
            }

            else if (this.state.phase2 === 0 && e.target.innerHTML === "Deck 2") {
                let new_card = this.state.deck2.shift()
                this.state.hand2.push(new_card)
                this.setState({
                    hand1: this.state.hand2,
                    has_drawn: true,
                })
            }
        }
    }

    selectMonster(e) {
        if (e.target.className.split(' ')[1] === 'user1'
            && this.state.turn === 'player1' && this.state.phase1 === 1) {
            let monster = this.state.hand1.find((card) => {
                return card.card_name === e.target.innerHTML
            })
            this.setState({
                monster_selected: true,
                selected_monster: monster
            }, function() {
                console.log(this.state.selected_monster)
            })
        }
        else if (e.target.className.split(' ')[1] === 'user2'
            && this.state.turn === 'player2' && this.state.phase2 === 1) {
            let monster = this.state.hand2.find((card) => {
                return card.card_name === e.target.innerHTML
            })
            this.setState({
                monster_selected: true,
                selected_monster: monster
            })
        }
    }

    playMonster(e) {
        if (this.state.monster_played === false) {
            if (e.target.innerHTML === "Set Attack") {
                if (this.state.turn === "player1") {
                    let remove_card = this.state.hand1.findIndex((card) => {
                        return card === this.state.selected_monster
                    })
                    this.state.hand1.splice(remove_card, 1)
                    this.state.selected_monster.position = "attack"
                    this.state.monster_field1.push(this.state.selected_monster)
                    this.setState({
                        monster_field1: this.state.monster_field1,
                        hand1: this.state.hand1,
                        monster_played: true,
                        monster_selected: false
                    }, function () {
                        console.log(this.state.monster_field1)
                    })
                }
                else if (this.state.turn === "player2") {
                    let remove_card = this.state.hand2.findIndex((card) => {
                        return card === this.state.selected_monster
                    })
                    this.state.hand2.splice(remove_card, 1)
                    console.log(this.state.selected_monster.position, 'selected mosnter')
                    this.state.selected_monster.position = "attack"
                    this.state.monster_field2.push(this.state.selected_monster)
                    this.setState({
                        monster_field2: this.state.monster_field2,
                        hand2: this.state.hand2,
                        monster_played: true,
                        monster_selected: false
                    }, function () {
                        console.log(this.state.monster_field2)
                    })
                }
            }
            else if (e.target.innerHTML === "Set Defense") {
                if (this.state.turn === "player1") {
                    let remove_card = this.state.hand1.findIndex((card) => {
                        return card === this.state.selected_monster
                    })
                    this.state.hand1.splice(remove_card, 1)
                    this.state.selected_monster.position = "defense"
                    this.state.monster_field1.push(this.state.selected_monster)
                    this.setState({
                        monster_field1: this.state.monster_field1,
                        hand1: this.state.hand1,
                        monster_played: true,
                        monster_selected: false
                    }, function () {
                        console.log(this.state.monster_field1)
                    })
                }
                else if (this.state.turn === "player2") {
                    let remove_card = this.state.hand2.findIndex((card) => {
                        return card === this.state.selected_monster
                    })
                    this.state.hand2.splice(remove_card, 1)
                    console.log(this.state.selected_monster.position, 'selected monster')
                    this.state.selected_monster.position = "defense"
                    this.state.monster_field2.push(this.state.selected_monster)
                    this.setState({
                        monster_field2: this.state.monster_field2,
                        hand2: this.state.hand2,
                        monster_played: true,
                        monster_selected: false
                    }, function () {
                        console.log(this.state.monster_field2)
                    })
                }
            }
        }
    }

    selectAttacker() {
        console.log('attacker selected')
    }

    render() {
        let phase1 = (this.state.phase1 !== 4)
        return(
            <div>
                <h2>{this.state.turn} - Phase: {phase1 ? this.state.phase_name[this.state.phase1] : this.state.phase_name[this.state.phase2]}</h2>
                <span onClick={this.drawCard.bind(this)}>Deck 2</span>
                <Board
                    hand1={this.state.hand1.map((card) => {
                        return(
                            <span onClick={this.selectMonster.bind(this)} className="col-sm-1 user1">{card.card_name}</span>
                        )
                    })}
                    hand2={this.state.hand2.map((card) => {
                        return(
                            <span onClick={this.selectMonster.bind(this)} className="col-sm-1 user2">{card.card_name}</span>
                        )
                    })}
                    monster_field1={this.state.monster_field1}
                    monster_field2={this.state.monster_field2}
                    select_attacker={this.selectAttacker.bind(this)}
                />
                <div className="row">
                    <div className="col-sm-4">
                        <span onClick={this.drawCard.bind(this)}>Deck 1</span>
                    </div>
                    <div className="col-sm-4">
                        <button onClick={this.endPhase.bind(this)}>End Phase</button>
                    </div>
                    <div className="col-sm-4">
                        {this.state.monster_selected && !this.state.monster_played?
                            <span>
                                <button onClick={this.playMonster.bind(this)}>Set Attack</button>
                                <button onClick={this.playMonster.bind(this)}>Set Defense</button>
                            </span>: ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Game