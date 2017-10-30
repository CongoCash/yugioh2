import React, { Component } from 'react'

class Monster_field extends Component {


    render() {
        return(
            <div className="row">
                <div className="col-sm-1">1</div>
                <div className="col-sm-5">
                    {this.props.monster_field}
                </div>
                <div className="col-sm-1">1</div>
            </div>
        )
    }
}

export default Monster_field