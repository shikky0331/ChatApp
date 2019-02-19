Rails.application.routes.draw do
  devise_for :users, module: :users
  resource :users, only: [:show, :edit, :destroy] do
  # resource :users, only: [:edit, :destroy] do
    member do
      get :from_user, :to_user
    end
  end

  namespace :api, { format: 'json'} do
    resources :messages, only: [:index, :create]
    resources :users, only: [:index, :create]
    resources :current_users, only: [:index]
    resources :friendships, only: [:index, :create, :destroy]
  end

  root 'messages#index'
  get '/users/search', to: 'searches#index'
  get '/api/users/search', to: 'api/users#search'
  post '/api/messages/image', to: 'api/messages#image'

  # get '/users/show/:id', to: 'users#show'

end
