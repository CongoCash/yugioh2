json.extract! @cards, card_name, :attack, :defense, :selected, :id
json.url api_cards_url(card, format: :json)