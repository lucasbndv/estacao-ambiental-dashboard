let socket = io();
let dataTable = new DataTable();
let dataSet = {};

async function getData(url) {
    let res = await fetch(url, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    }});
    
  let text = await res.text();
  let data = JSON.parse(text);
  
  return data;
}

async function generateTable(table, data) {
  let div = document.querySelector("div.table_container");
  div.appendChild(table.table);
  
  table.table.id = "customers";
  
  data.forEach(d => table.insertRow(d));
  
  table.headers = Object.keys(data[0]);
  table.headers.forEach(h => {
    table.insertHeader(h);
  });
  
  //console.log(dataSet["Alt"]);
}

function loadCSS(url,doc) {
  doc.setAttribute('type', "text/css" );
  doc.setAttribute('rel', "stylesheet" );
  doc.setAttribute('href', url );
  document.getElementsByTagName("head").item(0).appendChild(doc);
}

function initSocketIO(socket) {
  socket.on("update_table",(data) => {
    
    data = JSON.parse(data)[0];
    //console.log(data);

    dataTable.deleteRowPop();
    dataTable.insertRow(data);
    
    Object.keys(dataSet).forEach(k => {
      dataSet[k].pop();
      dataSet[k].unshift(data[k]);
    });
    
    //updateChart(window.chart, dataBase);
    window.chart.update();
  })
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setupChart(chart, dataSet) {
  let keys = Object.keys(dataSet);
  let label = keys[0];
  
  //console.log(Object.keys(dataSet));
  chart.data.labels = dataSet[label];
  
  chart.data.datasets = [];
  keys.forEach(k => {
    d = {
      label: k,
      data: dataSet[k]
    };
    
    chart.data.datasets.push(d);
  });

  chart.update();
}

async function main() {
  let data = await getData("/api/measure/estacao1");
  
  generateTable(dataTable, data);
  //dataTable.table.style.display = "none";
  
  Object.keys(data[0]).forEach(k => {
    dataSet[k] = data.map(d => d[k]);
  });
    
  //console.log(dataSet);
  //console.log(Object.keys(dataSet));
  //console.log(dataSet["Data"]);
  
  setupChart(window.chart, dataSet);
  initSocketIO(socket);
}

main();