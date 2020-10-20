
//fetch("/api/datas/")
  //.then(res => res.json())
  //.then(data => {
    //document.getElementById("maindiv").innerHTML = JSON.stringify(data);
    //console.log(data);
  //})
  //.catch( err => console.log("err: " + err));


//  global variable
let socket = io();
let table_data = [];
let last_id = 0;

setIoEvents();

async function updateTable() {
    let res = await fetch("/api/measure/data", {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    }});
    
  let text = await res.text();
  let data = JSON.parse(text);
  let table_data = document.getElementById("tableData")
  
  
  data.forEach((row,index) => insertRow(table_data, row, data.length,index));
  last_id = data.length;
  
  console.log(data);
}

function setIoEvents(){
  socket.on("update_table",() => {
    updateTable();
  })
}

function insertRow(table, row, length , index) {
  //  Cleaning the table before add data
  if (index == 0){
    table.innerHTML = ""
  }

  table.insertAdjacentHTML("beforeend",
  `<tr>
  <td>${row.Data}</td>
  <td>${row.Tmg}</td>
  <td>${row.T}</td>
  <td>${row.Tint}</td>
  <td>${row.UR}</td>
  <td>${row.Td}</td>
  <td>${row.Patm}</td>
  <td>${row.Prp10}</td>
  <td>${row.Prp30}</td>
  <td>${row.Prp60}</td>
  <td>${row.Pprp24}</td>
  <td>${row.Lat}</td>
  <td>${row.Lon}</td>
  <td>${row.Alt}</td>
  <td>${row.Satelite}</td>
  </tr>`)

  // if data not enough (10), fill the empty rows
  if(index + 1 == length  && length < 10){
    for (let i = 0 ; i + length < 10 ; i++){
      table.insertAdjacentHTML("beforeend",
        `<tr>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        </tr>`)
    }
  }
}

function loadCSS(url,doc) {
  doc.setAttribute('type', "text/css" );
  doc.setAttribute('rel', "stylesheet" );
  doc.setAttribute('href', url );
  document.getElementsByTagName("head").item(0).appendChild(doc);
}
