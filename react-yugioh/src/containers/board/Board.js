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
                    <Monster_field />
                </div>

                <div>
                    <Monster_field />
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