json.extract! card, :card_name, :attack, :defense, :id
json.url api_cards_url(card, format: :json)