json.extract! @decks, :ids, :users_id, :cards_id
json.url api_cards_url(deck, format: :json)