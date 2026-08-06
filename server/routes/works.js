const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all work orders
router.get("/", (req, res) => {
  const sql = `
    SELECT works.*, customers.company_name
    FROM works
    JOIN customers ON works.customer_id = customers.id
    ORDER BY works.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});

// Add work order
router.post("/", (req, res) => {
  const {
    customer_id,
    bus_number,
    bus_model,
    site_location,
    billing_date,
    work_start_date,
    work_completion_date,
    total_amount,
    advance_payment,
    due_amount,
    raw_material_cost,
    employee_work_cost,
    profit,
    status,
  } = req.body;

  const sql = `
    INSERT INTO works
    (
      customer_id,
      bus_number,
      bus_model,
      site_location,
      billing_date,
      work_start_date,
      work_completion_date,
      total_amount,
      advance_payment,
      due_amount,
      raw_material_cost,
      employee_work_cost,
      profit,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer_id,
      bus_number,
      bus_model,
      site_location,
      billing_date,
      work_start_date,
      work_completion_date,
      total_amount,
      advance_payment,
      due_amount,
      raw_material_cost,
      employee_work_cost,
      profit,
      status,
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Work Order Saved Successfully",
        id: result.insertId,
      });
    }
  );
});
// Delete work order
router.delete("/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM works WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Work deleted successfully"
      });

    }
  );

});
// Update Work Order
router.put("/:id", (req, res) => {

  const { id } = req.params;

  const {
    customer_id,
    bus_number,
    bus_model,
    site_location,
    billing_date,
    work_start_date,
    work_completion_date,
    total_amount,
    advance_payment,
    due_amount,
    raw_material_cost,
    employee_work_cost,
    profit,
    status
  } = req.body;

  const sql = `
    UPDATE works SET
      customer_id = ?,
      bus_number = ?,
      bus_model = ?,
      site_location = ?,
      billing_date = ?,
      work_start_date = ?,
      work_completion_date = ?,
      total_amount = ?,
      advance_payment = ?,
      due_amount = ?,
      raw_material_cost = ?,
      employee_work_cost = ?,
      profit = ?,
      status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      customer_id,
      bus_number,
      bus_model,
      site_location,
      billing_date,
      work_start_date,
      work_completion_date,
      total_amount,
      advance_payment,
      due_amount,
      raw_material_cost,
      employee_work_cost,
      profit,
      status,
      id
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Work Order Updated Successfully"
      });
    }
  );

});
module.exports = router;