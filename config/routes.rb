Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'

  resource :methods, only: ['show']
  resource :news, only: ['show']

  namespace :api, {format: 'json'} do
    get 'forex_timeseries/get_timeseries'
  end
end
