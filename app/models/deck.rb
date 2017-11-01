class Deck < ApplicationRecord
  has_many :cards
  has_many :users
  has_many :yugis
  # has_many :kaibas
end
