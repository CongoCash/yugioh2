import React, { Component } from 'react'


class Board extends Component {

    constructor(){
        super()
        this.state = {
            current_hand_player1: [], current_hand_player2: [],
        }
    }

    render() {

        return(
            <div className="container">
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
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1 graveyard">Graveyard</div>
                    <div className="col-sm-5">{this.props.monster_field_player2}</div>
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
                    <div className="col-sm-6">{this.props.monster_field_player1}</div>
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
            </div>
        )
    }
}

export default Board