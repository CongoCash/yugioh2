import React, { Component } from 'react'
import './Hand.css';

class Hand extends Component {



    render() {
        return(
            <div className="row card">
                <div className="col-sm-6">
                    {this.props.hand}
                </div>
            </div>
        )
    }
}

export default Hand