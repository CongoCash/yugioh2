import React, { Component } from 'react'

class Hand extends Component {



    render() {
        return(
            <div className="row">
                    {this.props.hand}
            </div>
        )
    }
}

export default Hand