# json.array! @cards, partial: 'api/card', as: :card

json.array! @cards, :id, :card_name, :attack, :defense, :selected