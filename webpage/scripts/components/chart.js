var ctx = document.getElementById('myChart1').getContext('2d');

window.chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
      animation: {
        duration: 0
      }  
    }
});
