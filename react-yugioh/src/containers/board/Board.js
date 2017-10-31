import React, { Component } from 'react'
import Hand from'../hand/Hand.js'
import Spell_field from'../spell_field/Spell_field.js'
import Monster_field from'../monster_field/Monster_field.js'
import './Board.css';



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
                                <span onClick={this.props.main_phase1_2} className="col-sm-1 user2 card">{monster.card_name}</span>
                            )
                        })}
                        monster_slots={this.props.monster_slots2.map((slot) => {
                            return(
                                <img className="col-sm-1 user2 card" height="100" width="68" src="https://i.imgur.com/tqeeCjU.png" />
                            )
                        })}
                        // monster_slots={for 0..this.props.length_monster_field1}
                    />
                </div>
                <hr></hr>
                <div>
                    <Monster_field
                        monster_field={this.props.monster_field1.map((monster) => {
                            return(
                                <img onClick={this.props.main_phase1_2} className="col-sm-1 user1 card" height="100" width="60" src={monster.image_url}/>
                            )
                        })}
                        monster_slots={this.props.monster_slots1.map((slot) => {
                            return(
                                <img className="col-sm-1 user2 card" height="100" width="68" src="https://i.imgur.com/tqeeCjU.png" />
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