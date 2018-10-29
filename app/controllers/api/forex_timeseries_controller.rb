module Api
  class ForexTimeseriesController < ApplicationController
    protect_from_forgery with: :null_session

    def get_timeseries
      scale = params[:scale]
      case scale
      when 'min_1'
        @timeseries_min = FxTimeseriesMin.last(100)
        render json: @timeseries_min
      end
    end
  end
end
