//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require chartjs-chart-financial/docs/moment
//= require chartjs-chart-financial/docs/Chart
//= require chartjs-chart-financial/docs/Chart.Financial
// require_tree .

ELEMENT.locale(ELEMENT.lang.ja)

window.tradeApp = new Vue({
  el: "#trade-app",
  components: {
  },
  data: function() {
    return {
      from_currency: 'USD',
      to_currency: 'JPY',
      chartScale: 'min_1',
      lastValue: '',
      prevLastValue: '',
      scaleOptions: [
        {
          value: 'min_1',
          label: '1 min'
        }, {
          value: 'min_5',
          label: '5 min'
        }, {
          value: 'min_10',
          label: '10 min'
        }, {
          value: 'min_15',
          label: '15 min'
        }, {
          value: 'min_30',
          label: '30 min'
        }, {
          value: 'min_60',
          label: '60 min'
        }
      ],
      timeSeries: {},
      showMovingAverage: false,
      movingAverageType: 'simple', // type: simple, exp
      movingAverageWindowLen: 21,
      lowAnalyticsOptions: [
        {
        value: 'moving_average',
        label: '移動平均線',
        children: [{
          value: 'simple',
          label: '単純'
        }, {
          value: 'exp',
          label: '指数'
        }]
      }, {
        value: 'bollinger_band',
        label: 'ボリンジャーバンド',
        children: [{
          value: 'sigma-1',
          label: '1σ'
        }, {
          value: 'sigma-2',
          label: '2σ'
        }]
      }],
      highAnalyticsOptions: [
        {
          value: 'trending',
          label: 'トレンド判定',
          children: [{
            value: 'dow',
            label: 'ダウ理論'
          }]
        }
      ],

      chartElementId: 'myChart'
    }
  },
  computed: {
    chartTimeSeries: function() {
      rst = []
      for (let i in this.timeSeries){
        let row = this.timeSeries[i]
        rst.push({'o': row['open'], 'h': row['high'], 'l': row['low'], 'c': row['close'], 't': Date.parse(row['time'])})
      }
      return rst
    }
  },
  mounted: function () {
    console.log('mounted')
    let params = new URLSearchParams();
    params.append('scale', this.chartScale);
    axios.post('/api/forex_timeseries/get_timeseries', params).then(response => {
      this.timeSeries = response.data
      this.lastValue = response.data[response.data.length -1]['close']
      this.prevLastValue = response.data[response.data.length -2]['close']
    })
  },
  updated: function () {
    console.log('updated')
    this.drawChart()
  },
  methods: {
    roundUnderPoint: function(value, precision) {
      var digit = Math.pow(10, precision);
      value = value * digit
      value = Math.round(value)
      value = value / digit
      return value
    },
    handleSelectScales: function (value) {
      console.log(value)
    },
    handleSelectLowAnalytics: function (value) {
      console.log(value)
    },
    handleSelectHighAnalytics: function (value) {
      console.log(value)
    },
    drawChart: function() {
      console.log('drawChart')
      console.log(this.chartTimeSeries)
      var ctx = document.getElementById('myChart').getContext('2d')
      var container = document.getElementsByClassName('chart-container')[0]
      ctx.canvas.width = container.offsetWidth
      ctx.canvas.height = container.offsetHeight
      new Chart(ctx, {
        type: 'candlestick',
        data: {
          datasets: [{
            color: {
              up: '#0E7AC455',
              down: '#EB214255',
              unchanged: '#999'
            },
            borderColor: {
              up: '#0E7AC455',
              down: '#EB214255',
              unchanged: '#999'
            },
            borderWidth: 1,
            label: this.chartScale,
            data: this.chartTimeSeries,
            fractionalDigitsCount: 3
          }]
        },
        options: {
          responsive: true,
          tooltips: {
            position: 'nearest',
            mode: 'index'
          },
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'series',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              },
              ticks: {
                stepSize: 10
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }]
          }
        }
      })
    }
  }
})
