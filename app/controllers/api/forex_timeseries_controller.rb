module Api
  class ForexTimeseriesController < ApplicationController
    protect_from_forgery with: :null_session

    def get_timeseries
      scale = params[:scale]
      case scale
      when 'min_1'
        @timeseries_min = FxTimeseriesMin.last(100)
        render json: @timeseries_min
      when 'min_15'
        @timeseries_min = FxTimeseriesMin.last(1514)
        @timeseries_rst = []
        ti = 0
        @timeseries_min.each_with_index do |tm, i|
          if tm['time'].min % 15 == 0 then
            ti = i
            break
          end
        end
        while ti < 1515 do
          datas = @timeseries_min[ti, 15]
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
          ti += 15
        end
        render json: @timeseries_rst
      end
    end
  end
end
