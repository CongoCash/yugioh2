class Yugi < ApplicationRecord
  has_many :users, through: :decks
end
