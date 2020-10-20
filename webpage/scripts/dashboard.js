var ctx = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var chart = new Chart(ctx, {
// The type of chart we want to create
type: 'line',

// The data for our dataset
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
// Configuration options go here
options: {}
});
var chart2 = new Chart(ctx2, {
// The type of chart we want to create
type: 'line',
// The data for our dataset
data: {
    labels: ['1', '5', '9', '13', '17', '21', '25'],
    datasets: [{
        label: 'Mês anterior',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45]
    },
    {
        label: 'Mês Atual',
        backgroundColor: 'rgb(0, 99, 132)',
        borderColor: 'rgb(0, 99, 132)',
        data: [50, 60, 1, 8, 23, 35, 75]
    }
]
},

// Configuration options go here
options: {}
});