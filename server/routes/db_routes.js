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

router.post("/", (req, res) => {
  let filters = req.body;
  console.log(filters);

  if (
    filters.date_from === "" ||
    filters.date_to === "" ||
    filters.sample === ""
  ) {
    if (filters.date_from === "") {
      filters.date_from = "2020-10-08";
    }
    if (filters.date_to === "") {
      filters.date_to = "2022-10-08";
    }
    if (filters.sample === "") {
      filters.sample = "20";
    }
  }

  db.all(
    "SELECT * FROM estacao1 WHERE Data BETWEEN ? AND ? ORDER BY rowid ? LIMIT ?",
    [filters.date_from, filters.date_to, filters.desc, filters.sample],
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

router.post("/all_param", (req, res) => {
  let filters = req.body;
  console.log(filters);
  db.all(
    "SELECT * FROM estacao1 WHERE Data BETWEEN ? AND ? ORDER BY rowid ? LIMIT ?",
    [filters.date_from, filters.date_to, filters.desc, filters.sample],
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
router.post("/all", (req, res) => {
  db.all("SELECT * FROM estacao1", [], (err, data) => {
    if (err) {
      console.error("Error on GET 'api/datas'");
      res.status(400).json({ error: err.message });
      process.exit(1);
    }

    last_data = data;
    res.send(data);
    console.log("data was sent");
  });
});

module.exports = router;
