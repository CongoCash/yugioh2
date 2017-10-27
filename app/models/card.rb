class Card < ApplicationRecord
  has_many :cards, through: :decks

end
