const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",      // or "localhost"
  port: 3305,
  user: "root",           // <-- change this
  password: "Akmal@123",  // your MySQL root password
  database: "watan_seat_lining",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("✅ Connected to MySQL Database");
});

module.exports = db;