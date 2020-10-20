var ctx = document.getElementById('myChart1').getContext('2d');

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
        datasets: [{
            label: 'Média diária',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        },
        {
            label: "Dado de hoje",
            backgroundColor: 'rgb(0, 99, 132)',
            borderColor: 'rgb(0, 99, 132)',
            data: [10,20,10,4,40,60,90]
        }
      ]
    },
    options: {}
});
