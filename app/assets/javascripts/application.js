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
    <el-card shadow='hover'>\
      <div slot='header' class='clearfix'>\
        <span>Statistics Chart</span>\
      </div>\
      <div id='myChart' style='height: 800px;'></div>\
      <div>{{ this.timeSeries }}</div>\
    </el-card>",
  data: function() {
    return {
      text: "あいうえお",
      timeSeries: {}
    }
  },
  mounted: function () {
    axios.get('/api/forex_timeseries/get_timeseries').then(response => { this.timeSeries = response.data })
  },
  updated: function () {
    this.drawChart()
  },
  methods: {
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
