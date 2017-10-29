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
            all_cards: '',
            selected_monster: ""
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
                new_card["users_id"] = this.props.owner

                new_deck.push(new_card)
            })
            this.setState({
                deck: shuffle(new_deck),
            }, function(){
                // console.log(this.state.deck)
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
        }, function() {
            // this.props.getCurrentHand(this.state.current_hand)
        })
    }

    drawCard() {
        console.log(this.props.phase_index)
        if (this.props.current_turn[0] === 1 && this.props.owner == 1 && this.props.phase_index=== 0) {
            let new_card = this.state.deck.shift()
            let new_deck = this.state.deck
            let new_hand = this.state.current_hand
            new_hand.push(new_card)
            this.setState({
                current_hand: new_hand,
                deck: new_deck,
            }, function() {
                console.log(this.state.current_hand)
            }, this.props.updatePhaseTurn())
        }

        else if (this.props.current_turn[0] === 2 && this.props.owner ==2 && this.props.phase_index=== 0) {
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
    }

    updateHand(e) {
        if (this.props.isActive && this.props.phase_index === 1) {
            let index = this.state.current_hand.findIndex((card) => {
                return card.join_id == e.target.id
            })

            let monster = this.state.current_hand.find((card) => {
                return card.join_id == e.target.id
            })

            this.state.current_hand.splice(index, 1)
            this.setState({
                current_hand: this.state.current_hand
            })
            this.props.playMonster(monster)
        }
    }


    selectMonster(e) {
        let selected = this.state.current_hand.find((card) => {
            return card.card_name == e.target.innerHTML
        })
        this.setState({
            selected_monster: selected
        }, function() {
            this.props.updateAttDef(this.state.selected_monster)

        })
    }

    render() {

        return(
            <div>
            <div className="col-sm-11">
                {this.props.setAttack}
                {this.props.setDefense}
                {this.state.current_hand
                .map((card) => {
                    return (
                        <span className="col-sm-2">
                                <span id={card.join_id} onClick={(e) => this.selectMonster(e)}>
                                    {card.card_name}</span>
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