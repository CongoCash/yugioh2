class ApiController < ApplicationController

  def cards
    @cards = Card.all()
  end

  def decks
    @decks = Deck.all()
  end

end
