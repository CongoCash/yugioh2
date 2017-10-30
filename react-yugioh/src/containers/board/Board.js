import React, { Component } from 'react'
import Hand from'../hand/Hand.js'
import Spell_field from'../spell_field/Spell_field.js'
import Monster_field from'../monster_field/Monster_field.js'



class Board extends Component {

    constructor(){
        super()
        // this.state = {
        //     hand: this.props.hand
        // }
    }

    render() {
        return(
            <div>
                <div>
                    <Hand
                        hand={this.props.hand2}
                        deck={this.props.deck2}
                    />
                </div>

                <div>
                    <Spell_field />
                </div>

                <div>
                    <Monster_field
                        monster_field={this.props.monster_field2.map((monster) => {
                            return(
                                <span onClick={this.props.select_attack_target} className="col-sm-2 user2">{monster.card_name}</span>
                            )
                        })}
                    />
                </div>
                <hr></hr>
                <div>
                    <Monster_field
                        monster_field={this.props.monster_field1.map((monster) => {
                            return(
                                <span onClick={this.props.select_attack_target} className="col-sm-2 user1">{monster.card_name}</span>
                            )
                        })}
                    />
                </div>

                <div>
                    <Spell_field />
                </div>

                <div>
                    <Hand
                        hand={this.props.hand1}
                        deck={this.props.deck1}
                    />
                </div>
            </div>
        )
    }
}

export default Board