//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
// require_tree .

ELEMENT.locale(ELEMENT.lang.ja)

window.tradeChart = Vue.extend({
  template: "\
    <el-card class='trade-chart' shadow='hover'>\
      <div slot='header' class='clearfix'>\
        <span>GENERAL STATISTIC</span>\
      </div>\
      <el-row>\
        <el-col :span='6' style='height: 100px;'>\
          <div class='currencies'>USD/JPY</div>\
        </el-col>\
        <el-col :span='6' style='height: 70px;'>\
          <div class='values'>{{ this.timeSeries[0]['close'] }}</div>\
        </el-col>\
        <el-col :span='6' style='height: 70px;'>\
          <div class='values'>あれ</div>\
        </el-col>\
        <el-col :span='6' style='height: 70px;'>\
          <div class='values'>あれ</div>\
        </el-col>\
      </el-row>\
      <div class='block'>\
        <el-cascader expand-trigger='hover' :options='analyticsOptions' @change='handleSelectAnalytics'></el-cascader>\
      </div>\
      <div id='myChart' style='height: 800px;'></div>\
    </el-card>",
  data: function() {
    return {
      text: "あいうえお",
      timeSeries: {},
      showMovingAverage: false,
      movingAverageType: 'simple', // type: simple, exp
      movingAverageWindowLen: 21,
      analyticsOptions: [{
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
      }]
    }
  },
  mounted: function () {
    axios.get('/api/forex_timeseries/get_timeseries').then(response => { this.timeSeries = response.data })
  },
  updated: function () {
    this.drawChart()
  },
  methods: {
    handleSelectAnalytics: function (value) {
      console.log(value)
    },
    drawChart: function () {
      var trace1 = {
        increasing: {line: {color: '#17BECF'}},
        decreasing: {line: {color: '#7F7F7F'}},
        line: {color: 'rgba(31,119,180,1)'},
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y',
        x: [],
        close: [],
        high: [],
        low: [],
        open: []
      }
      for (let i in this.timeSeries){
        let v = this.timeSeries[i]
        trace1['x'].push(v['time'])
        trace1['open'].push(v['open'])
        trace1['close'].push(v['close'])
        trace1['high'].push(v['high'])
        trace1['low'].push(v['low'])
      }

      var data = [trace1];

      var layout = {
        dragmode: 'zoom',
        margin: {
          r: 10,
          t: 25,
          b: 40,
          l: 60
        },
        showlegend: false,
        xaxis: {
          autorange: true,
          domain: [0, 1],
          range: [trace1['x'].first, trace1['x'].last],
          rangeslider: {range: [trace1['x'].first, trace1['x'].last]},
          title: 'Date',
          type: 'date'
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [114.609999778, 137.410004222],
          type: 'linear'
        }
      };

      Plotly.plot('myChart', data, layout);

    }
  }
})

window.tradeApp = new Vue({
  el: "#trade-app",
  components: {
    "trade-chart": window.tradeChart
  },
  mounted: function() {
  }
})
