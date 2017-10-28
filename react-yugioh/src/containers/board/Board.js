import React, { Component } from 'react'
import Deck from '../deck/Deck.js'
import Monster_field from '../monster_field/Monster_field.js'

class Board extends Component {

    constructor(){
        super()
        this.state = {
            monster_field_player1: [], monster_field_player2: [],
            attacker: "", target: "",
            graveyard: []
        }
    }


    playMonsterCard(monster, e) {
        if (this.props.checkIfBattlePhasePlayer1()) {
            if (this.state.monster_field_player1.length < 5) {
                this.state.monster_field_player1.push(monster)

                this.setState({
                    monster_field_player1: this.state.monster_field_player1,
                })
            }
        }
        else if (/*current monster belongs to player 2 && */ this.props.checkIfBattlePhasePlayer2()) {
            if (this.state.monster_field_player2.length < 5) {
                this.state.monster_field_player2.push(monster)

                this.setState({
                    monster_field_player2: this.state.monster_field_player2,
                })
            }
        }
    }

    directAttack(e){
        let attackerInfo = this.state.attacker.attack
        this.props.getLifepoints(attackerInfo, this.props.current_turn)
    }

    attack(e) {
        if (this.props.current_turn[0] ===1 && this.state.monster_field_player2.length === 0) {
            this.directAttack(e);
        }
        else if (this.props.current_turn[0] ===2 && this.state.monster_field_player1.length === 0) {
            this.directAttack(e);
        }
        else if (this.state.attacker && this.state.target) {
            this.attackMonster(e);
        }
    }

    attackMonster(e) {
        let attacker = this.state.attacker
        let target = this.state.target
        console.log(attacker)
        if (attacker.attack > target.attack) {
            this.props.getLifepoints(attacker.attack-target.attack)
            this.defeatedMonster(target)
        }
    }

    defeatedMonster(target) {
        console.log(target)
        this.state.graveyard.push(target)

        if (target.users_id == 2) {
            var index_defeated_monster = this.state.monster_field_player2.findIndex((monster) => {
                return monster.join_id === target.join_id
            })
        }

        console.log(this.state.monster_field_player2, 'first')
        this.state.monster_field_player2.splice(index_defeated_monster, 1)
        console.log(this.state.monster_field_player2, 'second')

        this.setState({
            graveyard: this.state.graveyard,
            monster_field_player2: this.state.monster_field_player2
        }, function() {
            console.log(this.state.monster_field_player2)
        })
    }

    selectAttacker(e, owner) {
        console.log('enter attacker')
        if (this.props.current_turn[0] === 1 && this.props.phase_index_player1=== 1 && owner==1) {
            let attacker = this.state.monster_field_player1.find((monster) => {
                return monster.card_name === e.target.innerHTML
            })
            this.setState({
                attacker: attacker
            }, function() {
                console.log(this.state.attacker, 'is the attacker')
            })
        }

        else if (this.props.current_turn[0] === 2 && this.props.phase_index_player2=== 1 && owner==2) {
            let attacker = this.state.monster_field_player2.find((monster) => {
                return monster.card_name === e.target.innerHTML
            })
            console.log(attacker)
            this.setState({
                attacker: attacker
            }, function () {
                console.log(this.state.attacker, 'is the attacker')
            })
        }
    }

    selectTarget(e, owner) {
        console.log(owner)
        if (this.props.current_turn[0] === 1 && this.props.phase_index_player1=== 1 && owner==2) {
            let target = this.state.monster_field_player2.find((monster) => {
                return monster.card_name === e.target.innerHTML
            })
            console.log(target)
            this.setState({
                target: target
            }, function() {
                console.log(this.state.target, 'is the target')
            })
        }

        else if (this.props.current_turn[0] === 2 && this.props.phase_index_player2=== 1 && owner==1) {
            let target = this.state.monster_field_player1.find((monster) => {
                return monster.card_name === e.target.innerHTML
            })
            console.log(target)
            this.setState({
                target: target
            }, function() {
                console.log(this.state.target, 'is the target')
            })
        }
    }

    selectingMonster(e, owner) {
        this.selectAttacker(e, owner)
        this.selectTarget(e, owner)
    }

    clearAttackerTarget() {
        this.setState({
            attacker: "",
            target: ""
        })
        this.props.end_phase()
    }

    render() {

        let show_attack_button = this.state.attacker && this.state.target ;
        let direct_attack_button =
            (this.state.attacker && this.props.current_turn[0] === 1  &&
                this.state.monster_field_player2.length === 0 && this.props.phase_index_player1 === 1)
        || (this.state.attacker && this.props.current_turn[0] === 2  &&
            this.state.monster_field_player1.length === 0 && this.props.phase_index_player2 === 1)

        return(
            <div className="container">
                <div className="row">
                    <Deck
                        owner={2}
                        isActive={this.props.current_turn[0] === 2}
                        playMonster={this.playMonsterCard.bind(this)}
                        updatePhaseTurn={this.props.updatePhaseTurn}
                        current_turn={this.props.current_turn}
                        phase_index={this.props.phase_index_player2}
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
                <Monster_field
                    owner={2}
                    monster_field={this.state.monster_field_player2}
                    select_monster={this.selectingMonster.bind(this)}
                />
                <div className="row phase">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-3">{this.props.current_phase}</div>
                    <div className="col-sm-3">
                        <button onClick={this.clearAttackerTarget.bind(this)}>End Phase</button>
                        {show_attack_button ? <button onClick={this.attack.bind(this)}>Attack</button> : ''}
                        {direct_attack_button ? <button onClick={this.attack.bind(this)}>Direct Attack</button> : ''}
                    </div>
                    <div className="col-sm-1">z</div>
                    <div className="col-sm-1">z</div>
                    <div className="col-sm-1">z</div>
                </div>
                <Monster_field
                    owner={1}
                    monster_field={this.state.monster_field_player1}
                    select_monster={this.selectingMonster.bind(this)}
                />
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
                        owner={1}
                        playMonster={this.playMonsterCard.bind(this)}
                        isActive={this.props.current_turn[0] === 1}
                        current_turn={this.props.current_turn}
                        updatePhaseTurn={this.props.updatePhaseTurn}
                        phase_index={this.props.phase_index_player1}
                    />
                </div>
            </div>
        )
    }
}

export default Board