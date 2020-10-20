let socket = io();
let table_data = [];
let last_id = 0;

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

async function generateTable(table) {
  let div = document.querySelector("div.table_container")
  div.appendChild(table.table);
  
  table.table.id = "customers";
  
  let data = await getData("/api/measure/estacao1");
  data.forEach(d => table.insertRow(d));
  
  let headers = Object.keys(data.shift());
  headers.forEach(h => table.insertHeader(h));
}

setIoEvents();

function setIoEvents(){
  socket.on("update_table",() => {
    //updateTable();
  })
}

function loadCSS(url,doc) {
  doc.setAttribute('type', "text/css" );
  doc.setAttribute('rel', "stylesheet" );
  doc.setAttribute('href', url );
  document.getElementsByTagName("head").item(0).appendChild(doc);
}




function main() {
  let dataTable = new DataTable();
  generateTable(dataTable);
}

main();
