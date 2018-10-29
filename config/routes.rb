Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'

  resource :methods, only: ['show']
  resource :news, only: ['show']
  resource :users, only: []

  namespace :api, {format: 'json'} do
    post 'forex_timeseries/get_timeseries'
  end
end
