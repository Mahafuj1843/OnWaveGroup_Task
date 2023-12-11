const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname + '/public')));
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user_crud"
})

// Add new users
app.post("/addUser", (req, res) => {
    const sql = "INSERT INTO user (`email`,`password`,`type`,`active`) VALUES (?, ?, ?, ?)";
    const values = [req.body.email, req.body.password, req.body.type, req.body.active];
    db.query(sql, values, (err, result) => {
      if (err) return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "User added successfully" });
    });
  });

  // Get all users
  app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" + err });
    return res.json(result);
  });
});
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});