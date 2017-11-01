class ApiController < ApplicationController

  def cards
    @cards = Card.all()
  end

  def decks
    @decks = Deck.all()
  end

  def allgames
    @games = Game.all()
  end

  def games
    @games = Game.find_by_id(params[:id])
  end

  def yugi
    @yugis = Yugi.all()
  end

  def kaiba
    @kaibas = Kaiba.all()
  end

end
