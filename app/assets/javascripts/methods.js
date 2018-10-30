window.methodApp = new Vue({
  el: '#method-app',
  data: function () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        title: '',
        description: ''
      }
    }
  }
})
