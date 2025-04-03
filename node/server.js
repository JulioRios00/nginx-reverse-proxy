const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const config = {
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "nodedb",
};

const connection = mysql.createConnection(config);

connection.query(
  `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`,
  (err) => {
    if (err) throw err;
  }
);

app.get("/", (req, res) => {
  const name = `User${Math.floor(Math.random() * 1000)}`;
  connection.query(`INSERT INTO people(name) VALUES(?)`, [name], (err) => {
    if (err) throw err;
    connection.query(`SELECT * FROM people`, (err, results) => {
      if (err) throw err;

      let namesList = results.map((p) => `<li>${p.name}</li>`).join("");
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});