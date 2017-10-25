class ApiController < ApplicationController

  def show
    @cards = Card.all()
  end

end
