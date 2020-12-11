const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();
const db = new sqlite3.Database(
  __dirname + "/../../database/estacao.db",
  (err) => {
    if (err) {
      console.error("Error opening database " + err.message);
      process.exit(1);
    }
  }
);

router.get("/", (req, res) => {
  let filters = req.body;
  console.log(filters);
  db.all(
    "SELECT * FROM estacao1 WHERE Data BETWEEN ? AND ? ORDER BY rowid LIMIT ?",
    [filters.date_from, filters.date_to, filters.limit],
    (err, data) => {
      if (err) {
        console.error("Error on GET 'api/datas'");
        res.status(400).json({ error: err.message });
        process.exit(1);
      }

      last_data = data;
      res.send(data);
      console.log("data was sent");
    }
  );
});

module.exports = router;
