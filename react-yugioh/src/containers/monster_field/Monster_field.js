import React, { Component } from 'react'

class Monster_field extends Component {

    constructor(){
        super()
        this.state = {

        }
    }


    render() {

        return(

                <div className="row monster_p1">
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-6">
                        {this.props.monster_field.map((monster) => {
                            return (
                                <span onClick={(e) => this.props.select_monster(e, this.props.owner)} className="col-sm-2">{monster.card_name}</span>
                            )
                        })}
                    </div>
                    <div className="col-sm-1 graveyard">Graveyard</div>
                    <div className="col-sm-1">1</div>
                    <div className="col-sm-1">1</div>
                </div>

        )
    }
}

export default Monster_field