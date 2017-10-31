import React, { Component } from 'react'
import CardsModel from '../../models/Card.js'
import Board from '../../containers/board/Board.js'
import './Game.css';

class Game extends Component {

    constructor(){
        super()
        this.state = {
            lifepoints1: 8000, lifepoints2: 8000,
            turn: "player1",
            phase: 0,
            phase_name: ['Draw', 'Main 1', 'Battle', 'Main 2', 'End'],
            deck1: [], deck2: [],
            hand1: [], hand2: [],
            monster_field1: [], monster_field2: [],
            monster_slots1: [false, false, false, false, false],
            monster_slots2: [false, false, false, false, false],
            spell_field1: [], spell_field2: [],
            monster_selected: false, selected_monster: "",
            monster_played: false, has_drawn: false,
            attacker_selected: false, target_selected: false,
            selected_attacker: "", selected_target: "",
            selected_has_attacked: false,
            first_turn: true, winner: "",
            selected_card: ""

        }
    }

    componentWillMount(){
        this.fetchData()
    }

    fetchData(){
        console.log(this.state.monster_slots1)
        var shuffle = require('shuffle-array')

        CardsModel.cards().then((res) => {
            let data = res.data
            let shuffle_deck1 = shuffle(data)
            let hand1 = shuffle_deck1.slice(0,5)
            let deck1 = shuffle_deck1.slice(5)

            this.setState({
                hand1: hand1,
                deck1: deck1,
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
        this.setState({
            monster_selected: false, monster_played: false,
            has_drawn: false,
            selected_monster: "", selected_attacker: "",
            selected_target: "",
            attacker_selected: false, target_selected: false,
            selected_has_attacked: false,
        })

        if (this.state.turn === "player1") {
            if (this.state.phase !== 4) {
                this.setState({
                    phase: this.state.phase+1,
                })
            }
            else {
                this.state.monster_field1.forEach((monster) => {
                    monster.has_changed_battle_position = false
                    monster.has_attacked = false
                })
                this.setState({
                    turn: "player2", phase: 0,
                    first_turn: false
                })
            }
        }
        else if (this.state.turn === "player2") {
            if (this.state.phase !== 4) {
                this.setState({
                    phase: this.state.phase+1,
                })
            }
            else {
                this.state.monster_field2.forEach((monster) => {
                    monster.has_changed_battle_position = false
                    monster.has_attacked = false
                })
                this.setState({
                    turn: "player1", phase: 0,
                    first_turn: false
                })
            }
        }
    }

    drawCard(e) {
        if (!this.state.has_drawn && this.state.phase === 0) {
            if (e.target.alt === "Deck 1" && this.state.turn === 'player1') {
                let new_card = this.state.deck1.shift()
                this.state.hand1.push(new_card)
                this.setState({
                    hand1: this.state.hand1,
                    has_drawn: true,
                })
            }

            else if (e.target.alt === "Deck 2" && this.state.turn === 'player2') {
                let new_card = this.state.deck2.shift()
                this.state.hand2.push(new_card)
                this.setState({
                    hand2: this.state.hand2,
                    has_drawn: true,
                }, function() {
                    console.log(this.state.hand2)
                })
            }
        }
    }

    selectMonster(e) {
        let combined_hands = this.state.hand1.concat(this.state.hand2)
        let monster = combined_hands.find((card) => {
            return card.image_url === e.target.src
        })
        if (this.state.turn === 'player1') {
            this.setState({
                selected_card: monster,
            }, function () {
                console.log(this.state.selected_card, 'selected card')
            })

            if (e.target.className.split(' ')[1] === 'user1'
                && this.state.turn === 'player1' && this.state.phase === 1) {

                this.setState({
                    monster_selected: true,
                    selected_monster: monster,
                })
            }
        }
        else {
            this.setState({
                selected_card: monster,
            }, function () {
                console.log(this.state.selected_card, 'selected_card')
            })
            if (e.target.className.split(' ')[1] === 'user2'
                && this.state.phase === 1) {
                this.setState({
                    monster_selected: true,
                    selected_monster: monster,
                })
            }
        }
    }

    playMonster(e) {
        if (this.state.monster_played === false) {
            if (e.target.innerHTML === "Set Attack") {
                this.state.selected_monster.position = "attack"
                this.state.selected_monster.has_changed_battle_position = true
                this.state.selected_monster.faceup = true
                if (this.state.turn === "player1") {
                    let remove_card = this.state.hand1.findIndex((card) => {
                        return card === this.state.selected_monster
                    })
                    this.state.hand1.splice(remove_card, 1)
                    this.state.monster_field1.push(this.state.selected_monster)
                    this.state.monster_slots1.pop()
                    this.setState({
                        monster_field1: this.state.monster_field1,
                        hand1: this.state.hand1,
                        monster_played: true,
                        monster_selected: false,
                        monster_field1: this.state.monster_field1
                    }, function () {
                        console.log(this.state.monster_field1)
                    })
                }
                else if (this.state.turn === "player2") {
                    let remove_card = this.state.hand2.findIndex((card) => {
                        return card === this.state.selected_monster
                    })
                    this.state.hand2.splice(remove_card, 1)
                    this.state.monster_field2.push(this.state.selected_monster)
                    this.state.monster_slots2.pop()
                    this.setState({
                        monster_field2: this.state.monster_field2,
                        hand2: this.state.hand2,
                        monster_played: true,
                        monster_selected: false,
                        monster_slots2: this.state.monster_slots2
                    }, function () {
                        console.log(this.state.monster_field2)
                    })
                }
            }
            else if (e.target.innerHTML === "Set Defense") {
                this.state.selected_monster.position = "defense"
                if (this.state.turn === "player1") {
                    let remove_card = this.state.hand1.findIndex((card) => {
                        return card === this.state.selected_monster
                    })
                    this.state.hand1.splice(remove_card, 1)
                    this.state.monster_field1.push(this.state.selected_monster)
                    this.state.monster_slots1.pop()
                    this.setState({
                        monster_field1: this.state.monster_field1,
                        hand1: this.state.hand1,
                        monster_played: true,
                        monster_selected: false,
                        monster_slots1: this.state.monster_slots1
                    }, function () {
                        console.log(this.state.monster_field1)
                    })
                }
                else if (this.state.turn === "player2") {
                    let remove_card = this.state.hand2.findIndex((card) => {
                        return card === this.state.selected_monster
                    })
                    this.state.hand2.splice(remove_card, 1)
                    this.state.monster_field2.push(this.state.selected_monster)
                    this.state.monster_slots2.pop()
                    this.setState({
                        monster_field2: this.state.monster_field2,
                        hand2: this.state.hand2,
                        monster_played: true,
                        monster_selected: false,
                        monster_slots2: this.state.monster_slots2
                    }, function () {
                        console.log(this.state.monster_field2)
                    })
                }
            }
        }
    }

    selectAttacker(e) {
        if (this.state.phase === 2) {
            if (this.state.turn === 'player1') {
                if (e.target.className.split(' ')[1] === 'user1') {
                    let selected_monster = this.state.monster_field1.find((monster) => {
                        return monster.image_url === e.target.src
                    })

                    this.setState({
                        selected_attacker: selected_monster,
                        attacker_selected: true,
                        selected_has_attacked: selected_monster.has_attacked,
                        selected_card: selected_monster,
                    }, function () {
                        console.log(this.state.selected_attacker, 'attacker selected user1')
                    })
                }
            }

            else if (this.state.turn === 'player2') {
                if (e.target.className.split(' ')[1] === 'user2') {
                    let selected_monster = this.state.monster_field2.find((monster) => {
                        return monster.image_url === e.target.src
                    })

                    this.setState({
                        selected_attacker: selected_monster,
                        attacker_selected: true,
                        selected_has_attacked: selected_monster.has_attacked,
                        selected_card: selected_monster,
                    }, function () {
                        console.log(this.state.selected_attacker, 'attacker selected user2')
                    })
                }
            }
        }
    }

    selectTarget(e) {
        if (this.state.phase === 2) {
            if (this.state.turn === 'player1') {
                if (e.target.className.split(' ')[1] === 'user2') {
                    let selected_target = this.state.monster_field2.find((target) => {
                        return target.card_name === e.target.innerHTML
                    })

                    this.setState({
                        selected_target: selected_target,
                        target_selected: true,
                        selected_card: selected_target,
                    }, function () {
                        console.log(this.state.selected_target, 'target selected user1 turn')
                    })
                }
            }

            else if (this.state.turn === 'player2') {
                if (e.target.className.split(' ')[1] === 'user1') {
                    let selected_target = this.state.monster_field1.find((target) => {
                        return target.card_name === e.target.innerHTML
                    })

                    this.setState({
                        selected_target: selected_target,
                        target_selected: true,
                        selected_card: selected_target,
                    }, function () {
                        console.log(this.state.selected_target, 'target selected user2 turn')
                    })
                }
            }
        }
    }

    selectAttackTarget(e) {
        let monster = this.state.monster_field1.concat(this.state.monster_field2).find((monster) => {
            return monster.card_name === e.target.innerHTML
        })

        this.setState({
            selected_card: monster
        })
        this.selectAttacker(e)
        this.selectTarget(e)
    }

    attack() {
        if (this.state.attacker_selected && !this.state.selected_attacker.has_attacked) {
            console.log('entering attack')
            console.log(this.state.selected_attacker.has_attacked, 'before')
            this.state.selected_attacker.has_attacked = true
            console.log(this.state.selected_attacker.has_attacked, 'after')
            //direct attack
            if ((this.state.monster_field1.length === 0 || this.state.monster_field2.length === 0)) {
                console.log('direct')
                if (this.state.turn === 'player1') {
                    this.setState({
                        lifepoints2: this.state.lifepoints2 - this.state.selected_attacker.attack
                    }, function () {
                        console.log(this.state.lifepoints2)
                        this.winCondition()
                    })
                }
                else if (this.state.turn === 'player2') {
                    this.setState({
                        lifepoints1: this.state.lifepoints1 - this.state.selected_attacker.attack
                    }, function () {
                        console.log(this.state.lifepoints1)
                        this.winCondition()
                    })
                }
            }

            //attacking a monster in attack mode
            else if (this.state.turn === 'player1') {
                let found_attacker = this.state.monster_field1.findIndex((attacker) => {
                    return attacker === this.state.selected_attacker
                })
                let found_target = this.state.monster_field2.findIndex((target) => {
                    return target === this.state.selected_target
                })
                if (this.state.selected_target.position === 'attack') {
                    console.log('att vs att1')
                    if (this.state.selected_attacker.attack > this.state.selected_target.attack) {
                        this.state.monster_field2.splice(found_target, 1)
                        this.state.monster_slots2.push(false)
                        this.setState({
                            lifepoints2: this.state.lifepoints2 - (this.state.selected_attacker.attack - this.state.selected_target.attack),
                            monster_field2: this.state.monster_field2,
                            monster_slots2: this.state.monster_slots2
                        }, function () {
                            console.log(this.state.lifepoints2)
                            this.winCondition()
                        })
                    }
                    else if (this.state.selected_attacker.attack < this.state.selected_target.attack) {
                        this.state.monster_field1.splice(found_attacker, 1)
                        this.state.monster_slots1.push(false)
                        this.setState({
                            lifepoints1: this.state.lifepoints1 - (this.state.selected_target.attack - this.state.selected_attacker.attack),
                            monster_field1: this.state.monster_field1,
                            monster_slots1: this.state.monster_slots1
                        }, function () {
                            console.log(this.state.lifepoints1)
                            this.winCondition()
                        })
                    }
                }

                //attacking a target in defense position
                else if (this.state.selected_target.position === 'defense') {
                    console.log('att vs def1')
                    if (this.state.selected_attacker.attack > this.state.selected_target.defense) {
                        this.state.monster_field2.splice(found_target, 1)
                        this.state.monster_slots2.push(false)
                        this.setState({
                            monster_field2: this.state.monster_field2,
                            monster_slots2: this.state.monster_slots2
                        }, function () {
                            console.log(this.state.lifepoints2)
                            this.winCondition()
                        })
                    }
                    else if (this.state.selected_attacker.attack < this.state.selected_target.defense) {
                        this.state.monster_field1.splice(found_attacker, 1)
                        this.state.monster_slots1.push(false)
                        this.setState({
                            lifepoints1: this.state.lifepoints1 - (this.state.selected_target.defense - this.state.selected_attacker.attack),
                            monster_field1: this.state.monster_field1,
                            monster_slots1: this.state.monster_slots1
                        }, function () {
                            console.log(this.state.lifepoints1)
                            this.winCondition()
                        })
                    }
                }
            }

            else if (this.state.turn === 'player2') {
                let found_attacker = this.state.monster_field2.findIndex((attacker) => {
                    return attacker === this.state.selected_attacker
                })
                let found_target = this.state.monster_field1.findIndex((target) => {
                    return target === this.state.selected_target
                })
                if (this.state.selected_target.position === 'attack') {
                    if (this.state.selected_attacker.attack > this.state.selected_target.attack) {
                        this.state.monster_field1.splice(found_target, 1)
                        this.state.monster_slots1.push(false)
                        this.setState({
                            lifepoints1: this.state.lifepoints1 - (this.state.selected_attacker.attack - this.state.selected_target.attack),
                            monster_field1: this.state.monster_field1,
                            monster_slots1: this.state.monster_slots1
                        })
                    }
                    else if (this.state.selected_attacker.attack < this.state.selected_target.attack) {
                        this.state.monster_field2.splice(found_attacker, 1)
                        this.state.monster_slots2.push(false)

                        this.setState({
                            lifepoints2: this.state.lifepoints2 - (this.state.selected_target.attack - this.state.selected_attacker.attack),
                            monster_field2: this.state.monster_field1,
                            monster_slots2: this.state.monster_slots2
                        })
                    }
                }


                else if (this.state.selected_target.position === 'defense') {
                    if (this.state.selected_attacker.attack > this.state.selected_target.defense) {
                        this.state.monster_field1.splice(found_target, 1)
                        this.state.monster_slots1.push(false)
                        this.setState({
                            monster_field1: this.state.monster_field1,
                            monster_slots1: this.state.monster_slots1
                        }, function () {
                            this.winCondition()
                        })
                    }
                    else if (this.state.selected_attacker.attack < this.state.selected_target.defense) {
                        this.state.monster_field2.splice(found_attacker, 1)
                        this.state.monster_slots2.push(false)
                        this.setState({
                            lifepoints2: this.state.lifepoints2 - (this.state.selected_target.defense - this.state.selected_attacker.attack),
                            monster_field2: this.state.monster_field2,
                            monster_slots2: this.state.monster_slots2
                        }, function () {
                            this.winCondition()
                        })
                    }
                }
            }

        }
        this.state.selected_attacker.has_attacked = true
        this.setState({
            selected_has_attacked: this.state.selected_attacker.has_attacked
        })
    }

    mainPhase2(e) {
        if (this.state.phase === 3) {
            if (this.state.turn === 'player1') {
                let monster = this.state.monster_field1.find((monster) => {
                    return monster.card_name === e.target.innerHTML
                })
                this.setState({
                    selected_monster: monster,
                    monster_selected: true
                }, function() {
                    console.log(this.state.selected_monster, 'main phase 2 selected monster')
                })
            }
            else if (this.state.turn === 'player2') {
                let monster = this.state.monster_field1.find((monster) => {
                    return monster.card_name === e.target.innerHTML
                })
                this.setState({
                    selected_monster: monster,
                    monster_selected: true
                }, function() {
                    console.log(this.state.selected_monster, 'main phase 2 selected monster')
                })
            }
        }
    }

    mainPhase1And2(e) {
        this.selectAttackTarget(e)
        this.mainPhase2(e)
    }

    switchPosition(e) {
        if (e.target.innerHTML === 'Switch to Defense Mode MP2') {
            this.state.selected_monster.position = 'defense'
        }
        else if (e.target.innerHTML === 'Switch to Attack Mode MP2') {
            this.state.selected_monster.position = 'attack'
        }
    }

    winCondition() {
        if (this.state.lifepoints1 <= 0) {
            this.setState({
                winner: 'Player 2'
            })
        }
        else if (this.state.lifepoints2 <= 0) {
            this.setState({
                winner: 'Player 1'
            })
        }
    }



    render() {
        let phase = (this.state.phase !== 4)
        let attack_button =
            (!this.state.first_turn) && (!this.state.selected_attacker.has_attacked) && (this.state.attacker_selected) &&
            (this.state.phase === 2) &&
            (this.state.target_selected || this.state.monster_field1.length === 0 || this.state.monster_field2.length === 0)
        let winCondition = (this.state.winner.length !== 0)
        console.log(this.state.monster_slots1)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <img onClick={this.drawCard.bind(this)} alt="Deck 2" height="100" width="60" src={"https://i.pinimg.com/originals/ed/b7/02/edb702c8400d4b0c806d964380b03b6a.jpg"}/>
                        <Board
                            hand1={this.state.hand1.map((card) => {
                                return(
                                    <img onClick={this.selectMonster.bind(this)} className="col-sm-2 user1 card" height="100" width="68" src={card.image_url}/>
                                )
                            })}
                            hand2={this.state.hand2.map((card) => {
                                return(
                                    <img onClick={this.selectMonster.bind(this)} className="col-sm-2 user2 card" height="100" width="68" src={card.image_url}/>
                                )
                            })}
                            monster_field1={this.state.monster_field1}
                            monster_slots1 = {this.state.monster_slots1}
                            monster_field2={this.state.monster_field2}
                            monster_slots2 = {this.state.monster_slots2}
                            main_phase1_2={this.mainPhase1And2.bind(this)}
                        />
                        <img onClick={this.drawCard.bind(this)} alt="Deck 1" height="100" width="60" src={"https://i.pinimg.com/originals/ed/b7/02/edb702c8400d4b0c806d964380b03b6a.jpg"}/>
                        <div className="col-sm-2">
                            <button onClick={this.endPhase.bind(this)}>End Phase</button>
                        </div>
                        <div className="col-sm-4">
                            {this.state.monster_selected && !this.state.monster_played && this.state.phase === 1?
                                <span>
                                <button onClick={this.playMonster.bind(this)}>Set Attack</button>
                                <button onClick={this.playMonster.bind(this)}>Set Defense</button>
                            </span>: ""
                            }
                            {!this.state.selected_monster.has_changed_battle_position && !this.state.selected_monster.has_attacked
                            && this.state.phase === 3 && this.state.monster_selected
                            && this.state.selected_monster.position === 'defense'?
                                <span>
                                <button onClick={this.switchPosition.bind(this)}>Switch to Attack Mode MP2</button>
                            </span>: ""
                            }
                            {!this.state.selected_monster.has_changed_battle_position && !this.state.selected_monster.has_attacked
                            && this.state.phase === 3 && this.state.monster_selected
                            && this.state.selected_monster.position === 'attack'?
                                <span>
                                <button onClick={this.switchPosition.bind(this)}>Switch to Defense Mode MP2</button>
                            </span>: ""
                            }
                            {attack_button ?
                                <span>
                                <button onClick={this.attack.bind(this)}>Attack</button>
                            </span> : ""
                            }
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <h1>{winCondition ? <span>{this.state.winner} has won</span>: ""}</h1>
                        <h2>{this.state.turn} - Phase: {phase ? this.state.phase_name[this.state.phase] : this.state.phase_name[this.state.phase]}</h2>
                        <h3>Lifepoints Player 1: {this.state.lifepoints1} --- Lifepoints Player 2: {this.state.lifepoints2}</h3>
                        <hr></hr>
                        {this.state.selected_card ?
                            (<h3><div>{this.state.selected_card.card_name}</div>
                                <div>Attack: {this.state.selected_card.attack}</div>
                                <div>Defense: {this.state.selected_card.defense}</div>
                                <div>Description: <h4>{this.state.selected_card.description}</h4></div>
                                <img src={this.state.selected_card.image_url} height="430" width="295"/>
                            </h3>) : ""
                        }
                    </div>
                </div>
                </div>
        )
    }
}

export default Game