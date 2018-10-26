namespace :forex_data do
  desc 'USD/JPY - 1分おきのデータ取得'
  task :usd_jpy_1min => :environment do
    av = AlphaVintage.new(key="05DY532WZZ00XF1Z")
    res = av.call_api_intraday(from_symbol='USD', to_symbol='JPY', interval='1min')
    res = JSON.parse(res)
    timeseries = res['Time Series FX (1min)'].sort

    last_fetched = FxTimeseriesMin.last.time if FxTimeseriesMin.last

    timeseries.each do |key, value|
      next if DateTime.parse(key) <= last_fetched
      data = FxTimeseriesMin.new
      data.time = DateTime.parse(key)
      data.open = value['1. open']
      data.high = value['2. high']
      data.low = value['3. low']
      data.close = value['4. close']
      data.save
    end
  end
end
