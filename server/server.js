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

const db = new sqlite3.Database(__dirname + "/../database/users.db",
                                err => {
  if (err) {
    console.error("Error opening database " + err.message);
    process.exit(1);
  }
  
  db.run("\
    CREATE TABLE users(                              \
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
      name NVARCHAR(64) NOT NULL,                    \
      email NVARCHAR(64) NOT NULL,                   \
      message NVARCHAR(200) NOT NULL                 \
    )", err => {
      if (!err) {
        console.log("Created new table 'users'");
      }
    });
});

app.get("/api/users", (req, res, next) => {
  db.all("SELECT * FROM users", [], (err, data) => {
    if (err) {
      console.error("Error on GET 'api/datas'");
      res.status(400).json({"error": err.message});
      process.exit(1);
    }
    //console.log(data);
    last_data = data;
    res.status(200).json(data);
  });
});

app.get("/api/users/:id", (req, res, next) => {
  let id = req.params.id;
  db.all("SELECT * FROM users WHERE id = ?", [id], (err, data) => {
    if (err) {
      console.error("Error on GET 'api/datas/id'");
      res.status(400).json({"error": err.message});
      process.exit(1);
    }
    //console.log(data);
    res.status(200).json(data);
  });
});

app.post("/api/users/", (req, res, next) => {
  let body = req.body;
  console.log("Received: " + JSON.stringify(body));
  
  db.run("INSERT INTO users (name, email, message) VALUES (?, ?, ?)",
    [body.name, body.email, body.message], 
    function(err) {
      if (err) {
        console.error("Error on POST 'api/datas'");
        res.status(400).json({"error": err.message});
        process.exit(1);
      }
      //data = {"id": result.lastID,
      let id = this.lastID;
      data = {"id": id, 
              "name": body.name,
              "email": body.email,
              "message": body.message};
      console.log("responding: " + JSON.stringify(data));
      console.log(data.id);
      res.status(201).json(data);
    });
});

//  socketio events

io.on("connection",(socket)=>{
  console.log("A new user has been connected with ID: ",socket.id);

  socket.on("update_table", (data) => {
    socket.broadcast.emit("update_table","");
    console.log("update tables")
  })
  
})
