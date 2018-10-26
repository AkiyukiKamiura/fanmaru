module Api
  class ForexTimeseriesController < ApplicationController
    def get_timeseries
      @timeseries_min = FxTimeseriesMin.last(1440)
      render json: @timeseries_min
    end
  end
end
