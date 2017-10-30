import React, { Component } from 'react'

class Monster_field extends Component {


    render() {
        return(
            <div className="row">
                <div className="col-sm-1">1</div>
                <div className="col-sm-5">
                {this.props.monster_field.map((monster) => {
                    return(
                        <span className="col-sm-2">{monster.card_name}</span>
                    )
                })}
                </div>
                <div className="col-sm-1">1</div>
            </div>
        )
    }
}

export default Monster_field