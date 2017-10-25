import React, { Component } from 'react'
import DecksModel from '../../models/Deck.js'
import './Deck.css'

class Deck extends Component {

    constructor(){
        super()
        this.state = {
            deck_player1: [],
            deck_player2: [],
            current_hand_player1: [],
            current_hand_player2: [],
            current_turn: []
        }
    }

    componentWillMount(){
        this.fetchData()
    }

    // drawCard()

    fetchData(){
        var shuffle_player1 = require('shuffle-array')
        var shuffle_player2 = require('shuffle-array')
        console.log(shuffle_player1([1, 2, 3, 4, 5]))
        console.log(shuffle_player2([1, 2, 3, 4, 5]))

        DecksModel.all().then( (res) => {
            this.setState({
                deck_player1: shuffle_player1(res.data),
            })
        })

        //Two calls to database because it wasn't shuffling
        DecksModel.all().then( (res) => {
            this.setState({
                deck_player2: shuffle_player2(res.data)
            })
        })
    }


    render() {
        return(
            <h1>Start works</h1>
        )
    }
}

export default Deck