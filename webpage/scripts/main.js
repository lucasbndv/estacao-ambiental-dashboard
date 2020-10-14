
//fetch("/api/datas/")
  //.then(res => res.json())
  //.then(data => {
    //document.getElementById("maindiv").innerHTML = JSON.stringify(data);
    //console.log(data);
  //})
  //.catch( err => console.log("err: " + err));


//  global variable
let socket = io();
let last_id = 0;


socket.on("update_table",(data)=>{
  console.log("koe")
  updateTable();
})

const formElem = document.getElementById("formElem");
formElem.onsubmit = async (e) => {
  e.preventDefault();
  
  let data = {
    "name": formElem.querySelector("input[name='user_name']").value,
    "email": formElem.querySelector("input[name='user_email']").value,
    "message": formElem.querySelector("textarea[name='user_message']").value 
  }
  
  console.log(JSON.stringify(data));
  
  let res = await fetch("/api/users", {
                        method: "POST", 
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data)
                        });
                        
  let text = await res.text();
  console.log("Response: " + text);
  
  let table = document.querySelector("#table-body");
  insertRow(table, JSON.parse(text), last_id);
  socket.emit("update_table","");
};

function insertRow(table, row, index) {
  if (index + 1 > last_id ){
    let tr = document.createElement("tr");
    let id = document.createElement("td");
    id.innerHTML = row.id;
    let name = document.createElement("td");
    name.innerHTML = row.name;
    let email = document.createElement("td");
    email.innerHTML = row.email;
    let message = document.createElement("td");
    message.innerHTML = row.message;
    
    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(email);
    tr.appendChild(message);
    
    table.appendChild(tr);
  }
  
}

async function updateTable() {
  let res = await fetch("/api/users", {
                        method: "GET", 
                        headers: {
                          "Content-Type": "application/json",
                        }});
                        
  let text = await res.text();
  data = JSON.parse(text);
  
  let table = document.querySelector("#table-body");
  data.forEach((row,index) => insertRow(table, row, index));
  last_id = data.length;
  console.log(last_id)
  
  console.log(data);
}

updateTable();
//window.onload = updateTable;

