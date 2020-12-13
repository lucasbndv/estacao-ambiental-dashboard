let socket = io();
let dataTable = new DataTable();
let dataSet = {};

// auxiliar functions

async function getData(url, config) {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });

  let text = await res.text();
  let data = JSON.parse(text);

  return data;
}

async function generateTable(table, data) {
  let div = document.querySelector("div.table_container");

  div.appendChild(table.table);
  table.table.id = "customers";

  data.forEach((d) => table.insertRow(d));

  table.headers = Object.keys(data[0]);
  table.headers.forEach((h) => {
    table.insertHeader(h);
  });
}

async function updateTable(table, data) {
  let rows = table.table.rows.length;
  let j = 0;
  for (let i = 0; i < rows; i++) {
    table.deleteRowPop();
    j++;
  }
  console.log(rows);
  console.log(j);

  data.forEach((d) => table.insertRow(d));
}

function loadCSS(url, doc) {
  doc.setAttribute("type", "text/css");
  doc.setAttribute("rel", "stylesheet");
  doc.setAttribute("href", url);
  document.getElementsByTagName("head").item(0).appendChild(doc);
}

function initSocketIO(socket) {
  socket.on("update_table", (data) => {
    data = JSON.parse(data)[0];
    //console.log(data);

    dataTable.deleteRowPop();
    dataTable.insertRow(data);

    Object.keys(dataSet).forEach((k) => {
      dataSet[k].pop();
      dataSet[k].unshift(data[k]);
    });

    //updateChart(window.chart, dataBase);
    window.chart.update();
  });
}

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setupChart(chart, dataSet) {
  let keys = Object.keys(dataSet);
  let label = keys[0];

  chart.data.labels = dataSet[label];

  chart.data.datasets = [];
  keys.forEach((k) => {
    d = {
      label: k,
      data: dataSet[k],
    };

    chart.data.datasets.push(d);
  });

  chart.update();
}

function setupEvents() {
  let search = document.getElementById("search");

  search.addEventListener("click", async (e) => {
    e.preventDefault();

    let date_from = document.getElementById("date_from").value;
    let date_to = document.getElementById("date_to").value;
    let sample = document.getElementById("sample").value;
    let desc = document.getElementById("desc").checked;
    let all = false;

    if (desc) {
      desc = "DESC";
    } else {
      desc = "ASC";
    }

    if (sample === "") {
      all = true;
    }
    let config = { date_from, date_to, sample, desc, all };

    console.log(desc);

    let data = await getData("/db", config);

    updateTable(dataTable, data);

    Object.keys(data[0]).forEach((k) => {
      dataSet[k] = data.map((d) => d[k]);
    });

    console.log(dataSet);

    //setupChart(window.chart, dataSet);
  });
}

// main
async function main() {
  let data = await getData("/db/all", { limit: 15 });

  Object.keys(data[0]).forEach((k) => {
    dataSet[k] = data.map((d) => d[k]);
  });
  generateTable(dataTable, data);

  //setupChart(window.chart, dataSet);
  setupEvents();
  initSocketIO(socket);
}

main();
