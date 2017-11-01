Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  root to: 'users#index'
  get '/users/new', to: 'users#new', as: 'new_user'
  post '/users', to: 'users#create'
  get '/users/:id', to: 'users#show', as: 'user'

  get '/login', to: 'sessions#new'
  get '/logout', to: 'sessions#destroy'
  post '/sessions', to: 'sessions#create'

  get 'api/cards', to: 'api#cards'
  get 'api/yugi', to: 'api#yugi'
  get 'api/kaiba', to: 'api#kaiba'
  get 'api/decks', to: 'api#decks'
  get 'api/games', to: 'api#allgames'
  get 'api/games/:id', to: 'api#games'

  get '/start', to: 'start#new'
  post '/games', to: 'start#create'
  get '/games/:id', to: 'games#index', as: 'games_id'
end
