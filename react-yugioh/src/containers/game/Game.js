import React, { Component } from 'react'
import CardsModel from '../../models/Card.js'
import Board from '../../containers/board/Board.js'

class Game extends Component {

    constructor(){
        super()
        this.state = {
            turn: "player1",
            phase1: 0, phase2: 4,
            deck1: [], deck2: [],
            hand1: [], hand2: [],
            monster_field1: [], monster_field2: [],
            spell_field1: [], spell_field2: [],

        }
    }

    componentWillMount(){
        this.fetchData()
    }

    fetchData(){
        var shuffle = require('shuffle-array')

        CardsModel.cards().then((res) => {
            let data = res.data
            let shuffle_deck1 = shuffle(data)
            let hand1 = shuffle_deck1.slice(0,5)
            let deck1 = shuffle_deck1.slice(5)

            this.setState({
                hand1: hand1,
                deck1: deck1,
            })
        })

        CardsModel.cards().then((res) => {
            let data = res.data
            let shuffle_deck2 = shuffle(data)
            let hand2 = shuffle_deck2.slice(0,5)
            let deck2 = shuffle_deck2.slice(5)

            this.setState({
                hand2: hand2,
                deck2: deck2,
            })
        })
    }

    drawCard(e) {
        if (this.state.phase1 === 0 && e.target.innerHTML === "Deck 1") {
            let new_card = this.state.deck1.shift()
            this.state.hand1.push(new_card)
            this.setState({
                hand1: this.state.hand1
            })
        }

        else if (this.state.phase2 === 0 && e.target.innerHTML === "Deck 2") {
            let new_card = this.state.deck2.shift()
            this.state.hand2.push(new_card)
            this.setState({
                hand1: this.state.hand2
            })
        }
    }


    render() {
        return(
            <div><span onClick={this.drawCard.bind(this)}>Deck 2</span>
                <Board
                    hand1={this.state.hand1.map((card) => {
                        return(
                            <span className="col-sm-1">{card.card_name}</span>
                        )
                    })}
                    hand2={this.state.hand2.map((card) => {
                        return(
                            <span className="col-sm-1">{card.card_name}</span>
                        )
                    })}

                />
                <span onClick={this.drawCard.bind(this)}>Deck 1</span>
            </div>
        )
    }
}

export default Game