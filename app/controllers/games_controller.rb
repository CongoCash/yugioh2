class GamesController < ApplicationController

  def index
    @game = Game.find_by_id(params[:id])
  end

end
