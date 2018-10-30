google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawVisualization);
function drawVisualization () {
  var data = google.visualization.arrayToDataTable(window.tradeApp.gChartDataArray, true)
  var options = window.tradeApp.gChartOptions
  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'))
  chart.draw(data, options);
}

window.tradeApp = new Vue({
  el: "#trade-app",
  components: {
  },
  data: function() {
    return {
      from_currency: 'USD',
      to_currency: 'JPY',
      chartScale: ['min_1'],
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
      ]
    }
  },
  computed: {
    movingAverageTimeseries: function () {
      let rst = []
      for (let i in this.timeSeries){
        if (i == 0){ continue }
        let sliced = this.timeSeries.slice(Math.max(0, i - this.movingAverageWindowLen), i)
        let sliced_close = sliced.map(x => x['close'])
        let ave = sliced_close.sum() / sliced_close.length
        rst.push(ave)
      }
      return rst
    },
    standardDeviationTimeseries: function () {
      let rst = []
      for (let i in this.timeSeries){
        if (i == 0){ continue }
        let sliced = this.timeSeries.slice(Math.max(0, i - this.movingAverageWindowLen), i)
        let sliced_close = sliced.map(x => x['close'])
        let sd = sliced_close.standardDeviation()
        rst.push(sd)
      }
      console.log(rst)
      return rst
    },
    gChartDataArray: function() {
      let rst = []
      let ma = this.movingAverageTimeseries
      let sd = this.standardDeviationTimeseries
      for (let i in this.timeSeries){
        let row = this.timeSeries[i]
        let time = new Date(Date.parse(row['time'])).toLocaleString()
        if (row['open'] <= row['close']){
          rst.push([time, row['low'], row['open'], row['close'], row['high'], ma[i], ma[i]-2*sd[i], ma[i]+2*sd[i]])
        } else {
          rst.push([time, row['high'], row['open'], row['close'], row['low'], ma[i], ma[i]-2*sd[i], ma[i]+2*sd[i]])
        }
      }
      console.log(rst)
      return rst
    },
    gChartOptions: function () {
      var container = document.getElementsByClassName('chart-container')[0]
      return {
               seriesType: "candlesticks",
               series: {
                 1: {type: "line"},
                 2: {type: "line"},
                 3: {type: "line"}
               },
               legend: 'none',
               width: container.offsetWidth,
               height: container.offsetHeight,
               bar: { groupWidth: '75%' },
               fontSize: 12,
               animation: {
                 duration: 500,
                 easing: 'inAndOut',
                 startup: true
               },
               candlestick: {
                 hollowIsRising: true,
                 fallingColor: { strokeWidth: 2, stroke: '#16A6B6', fill: '#16A6B6' }, // red
                 risingColor: { strokeWidth: 2, stroke: '#EE6557', fill: '#EE6557' }   // green
               },
               chartArea: {
                 left: 100,
                 top: 30,
                 width: '90%',
                 height: '80%'
               }
             }
    }
  },
  mounted: function () {
    console.log('mounted')
    this.fetchTimeseries()
  },
  updated: function () {
    console.log('updated')
  },
  methods: {
    roundUnderPoint: function(value, precision) {
      console.log(value)
      var digit = Math.pow(10, precision);
      value = value * digit
      value = Math.round(value)
      value = value / digit
      return value
    },
    fetchTimeseries: function() {
      let params = new URLSearchParams();
      params.append('scale', this.chartScale);
      axios.post('/api/forex_timeseries/get_timeseries', params).then(response => {
        this.timeSeries = response.data
        this.lastValue = response.data[response.data.length -1]['close']
        this.prevLastValue = response.data[response.data.length -2]['close']
      })
    },
    handleSelectScales: function (value) {
      console.log(value)
      this.fetchTimeseries()
      google.charts.setOnLoadCallback(drawVisualization);
    },
    handleSelectLowAnalytics: function (value) {
      console.log(value)
    },
    handleSelectHighAnalytics: function (value) {
      console.log(value)
    }
  }
})
