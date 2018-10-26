# TODO: りふぁくたりんぐ

class AlphaVintage
  _ALPHA_VINTAGE_API_URL = "http://www.alphavantage.co/query?"
  _ALPHA_VINTAGE_API_KEY = "05DY532WZZ00XF1Z"

  def initialize(key=None, retries=5, out_format='json', proxy=nil)
    @api_key = key
    @retries = retries
    @out_format = out_format
    @proxy = proxy
  end

  def call_api_intraday(from_symbol='USD', to_symbol='JPY', interval='1min')
    params = {'function': 'FX_INTRADAY',
              'from_symbol': from_symbol,
              'to_symbol': to_symbol,
              'interval': interval,
              'outputsize': 'full',
              'datatype': @out_format,
              'apikey': @api_key}

    request_url = "http://www.alphavantage.co/query?" + params.collect {|k, v| "#{k}=#{v}"}.join('&')
    res = RestClient.get request_url
    return res
  end
end
