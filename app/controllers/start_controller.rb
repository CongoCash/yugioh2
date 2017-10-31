class StartController < ApplicationController

  def new
    @game = Game.new
    @active = Game.where(winner:'')
  end

  def create
    @game = Game.create()
  end

end
