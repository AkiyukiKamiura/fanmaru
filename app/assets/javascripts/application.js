//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
// require_tree .

ELEMENT.locale(ELEMENT.lang.ja)

window.tradeApp = new Vue({
  el: "#trade-app",
  components: {
  },
  data: function() {
    return {
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
  mounted: function () {
    console.log('mounted')
    axios.get('/api/forex_timeseries/get_timeseries').then(response => { this.timeSeries = response.data })
  },
  updated: function () {
    console.log('updated')
    this.drawChart()
  },
  methods: {
    handleSelectLowAnalytics: function (value) {
      console.log(value)
    },
    handleSelectHighAnalytics: function (value) {
      console.log(value)
    },
    drawChart: function() {
      console.log('drawChart')
      var ctx = document.getElementById(this.chartElementId).getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    }
  }
})
