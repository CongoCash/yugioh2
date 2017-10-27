import React, { Component } from 'react'
import DecksModel from '../../models/Deck.js'
import CardsModel from '../../models/Card.js'
import './Deck.css'

class Deck extends Component {

    constructor(){
        super()
        this.state = {
            deck: [],
            current_hand: [],
            all_cards: ''
        }
    }

    componentWillMount(){
        this.fetchData()
    }


    fetchData(){
        var shuffle = require('shuffle-array')

        CardsModel.cards().then( (res) => {
            this.setState({
                all_cards: res.data
            })
        })

        DecksModel.decks().then((res) => {
            let new_deck = []
            res.data.forEach((data) => {
                let new_card = this.state.all_cards.find((card) => {
                    return card.id === data.cards_id
                })
                new_card["join_id"] = data.id
                new_deck.push()
                new_deck.push(new_card)
            })
            this.setState({
                deck: shuffle(new_deck),
            }, function(){
                console.log(this.state.deck, 'helo')
                this.setDeck()
            })
        })

    }

    setDeck() {
        let initial_hand = this.state.deck.slice(0,5)
        let initial_deck = this.state.deck.slice(5)
        this.setState({
            current_hand: initial_hand,
            deck: initial_deck
        })
    }

    drawCard() {
        if (this.props.turn[0] === 1 && this.props.phase=== 0) {
            let new_card = this.state.deck.shift()
            let new_deck = this.state.deck
            let new_hand = this.state.current_hand
            new_hand.push(new_card)
            this.setState({
                current_hand: new_hand,
                deck: new_deck,
                // phase_index_player1: this.state.phase_index_player1+1
            }, function() {
                console.log(this.state.current_hand)
            }, this.props.updatePhaseTurn())
        }

        else if (this.props.turn[0] === 2 && this.props.phase_player2=== 0) {
            let new_card = this.state.deck.shift()
            let new_deck = this.state.deck
            let new_hand = this.state.current_hand
            new_hand.push(new_card)
            this.setState({
                current_hand: new_hand,
                deck: new_deck,
                // phase_index_player1: this.state.phase_index_player1+1
            }, this.props.updatePhaseTurn())
        }
        this.props.updateHand(this.state.current_hand)
    }

    render() {

        return(
            <div>
            <div className="col-sm-12">
                {this.props.setAttack}
                {this.props.setDefense}
                {this.state.current_hand
                .map((card) => {
                    return (
                        <span className="col-sm-2">
                                <span id={card.join_id} onClick={(e) => this.props.setMonsterCard(e)}>
                                    {card.card_name} </span>

                        </span>
                    )
                })}
            </div>
                <div onClick={this.drawCard.bind(this)} className="col-sm-1 deck_p1">{this.props.player} Deck</div>
            </div>
        )
    }
}

export default Deck