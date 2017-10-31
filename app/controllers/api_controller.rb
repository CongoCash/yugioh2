class ApiController < ApplicationController

  def cards
    @cards = Card.all()
  end

  def decks
    @decks = Deck.all()
  end

  def games
    @games = Game.find_by_id(params[:id])
  end

end
