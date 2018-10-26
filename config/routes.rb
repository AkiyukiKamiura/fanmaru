Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'

  namespace :api, {format: 'json'} do
    get 'forex_timeseries/get_timeseries'
  end
end
