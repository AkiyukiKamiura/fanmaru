module Api
  class ForexTimeseriesController < ApplicationController
    protect_from_forgery with: :null_session

    def get_timeseries
      scale = params[:scale]
      case scale
      when 'min_1'
        @timeseries_min = FxTimeseriesMin.last(100)
        render json: @timeseries_min
      when 'min_5'
        @timeseries_rst = shaped_timeseries(5)
        render json: @timeseries_rst
      when 'min_10'
        @timeseries_rst = shaped_timeseries(10)
        render json: @timeseries_rst
      when 'min_15'
        @timeseries_rst = shaped_timeseries(15)
        render json: @timeseries_rst
      when 'min_30'
        @timeseries_rst = shaped_timeseries(30)
        render json: @timeseries_rst
      when 'min_60'
        @timeseries_rst = shaped_timeseries(60)
        render json: @timeseries_rst
      end
    end

    private
    def shaped_timeseries(min)
      @timeseries_min = FxTimeseriesMin.last(min*100 + min-1)
      @timeseries_rst = []
      ti = 0
      @timeseries_min.each_with_index do |tm, i|
        if tm['time'].min % min == 0 then
          ti = i
          break
        end
      end
      while ti < min*100 + min-1 do
        datas = @timeseries_min[ti, min]
        row = {'time': datas.last['time'],
               'open': datas.first['open'],
               'close': datas.last['close'],
               'updated_at': datas.last['updated_at'],
               'created_at': datas.last['created_at']}
        high = datas.first['high']
        low = datas.first['low']
        datas.each do |dt|
          high = dt['high'] if dt['high'] > high
          low = dt['low'] if dt['low'] < low
        end
        row['high'] = high
        row['low'] = low
        @timeseries_rst.push(row)
        ti += min
      end
      return @timeseries_rst
    end
  end
end
