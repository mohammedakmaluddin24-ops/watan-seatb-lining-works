const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all customers
router.get("/", (req, res) => {
  db.query("SELECT * FROM customers ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

// Add customer
router.post("/", (req, res) => {
  const { company_name, phone, address } = req.body;

  const sql =
    "INSERT INTO customers (company_name, phone, address) VALUES (?, ?, ?)";

  db.query(sql, [company_name, phone, address], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Customer added successfully",
      id: result.insertId,
    });
  });
});
// Update Customer
router.put("/:id", (req, res) => {

  const { id } = req.params;

  const {
    company_name,
    phone,
    address
  } = req.body;

  const sql = `
    UPDATE customers
    SET
      company_name = ?,
      phone = ?,
      address = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      company_name,
      phone,
      address,
      id
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Customer Updated Successfully"
      });

    }
  );

});
// Delete Customer
router.delete("/:id", (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM customers WHERE id = ?",
    [id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Customer Deleted Successfully"
      });

    }
  );

});
module.exports = router;