const PORT = 3000;

const sqlite3 = require("sqlite3");
const express = require("express");

//  Setting up the server
const app = express();
const server = app.listen(process.env.PORT || PORT, "localhost", () => {
  
  let host = server.address().address;
  let port = server.address().port;
  
  //console.log(server.address())
  console.log(`Example app listening at http://${host}:${port}`);
});

//  Global variables
const io = require('socket.io')(server);
let last_data;

app.use(express.static(__dirname + "/../webpage/"));
app.use(express.json())

console.log("Hosting webpages on: " + __dirname + "../webpage/");

const db = new sqlite3.Database(__dirname + "/../database/estacao.db",
                                err => {
  if (err) {
    console.error("Error opening database " + err.message);
    process.exit(1);
  }
});

app.get("/api/measure/estacao1",(req,res) => { 
  db.all("SELECT * FROM estacao1 ORDER BY rowid LIMIT 10", [], (err, data) => {
    if (err) {
      console.error("Error on GET 'api/datas'");
      res.status(400).json({"error": err.message});
      process.exit(1);
    }

    last_data = data;
    res.send(data);
  });
})


//  socketio events
io.on("connection",(socket)=> {
  console.log("A new user has been connected with ID: ",socket.id);
})

setInterval(sendData, 50)

let lastid = 1;
function sendData() {
  db.all("SELECT * FROM estacao1 WHERE rowid = ?", [lastid], (err, data) => {
    
    if (err) {
      console.error(err);
      process.exit(1);
    }
    //console.log(data);
    io.emit("update_table", JSON.stringify(data));
    
    lastid += 1;
  });
}
