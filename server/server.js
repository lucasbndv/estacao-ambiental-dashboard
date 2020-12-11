const PORT = 3000;
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
const io = require("socket.io")(server);
let last_data;

app.use(express.static(__dirname + "/../webpage/"));
app.use(express.json());

console.log("Hosting webpages on: " + __dirname + "../webpage/");

let db_routes = require("./routes/db_routes");

app.use("/db", db_routes);

//  socketio events
io.on("connection", (socket) => {
  console.log("A new user has been connected with ID: ", socket.id);
});

//setInterval(sendData, 2000);

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
