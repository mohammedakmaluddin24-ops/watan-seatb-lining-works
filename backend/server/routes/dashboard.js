const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= Dashboard Summary =================

router.get("/", (req, res) => {

  const sql = `
    SELECT

      (SELECT COUNT(*) FROM customers) AS total_customers,

      (SELECT COUNT(*) FROM works) AS total_works,

      (SELECT COALESCE(SUM(total_amount),0)
       FROM works) AS total_revenue,

      (SELECT COALESCE(SUM(payment_amount),0)
       FROM payments) AS total_received,

      (
        (SELECT COALESCE(SUM(total_amount),0) FROM works)
        -
        (SELECT COALESCE(SUM(payment_amount),0) FROM payments)
      ) AS pending_amount,

      (SELECT COALESCE(SUM(profit),0)
       FROM works) AS total_profit
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);

  });

});

// ================= Dashboard Charts =================

router.get("/charts", (req, res) => {

  const monthlyRevenueQuery = `
    SELECT
      YEAR(billing_date) AS year,
      MONTH(billing_date) AS month_no,
      DATE_FORMAT(MIN(billing_date), '%b') AS month,
      SUM(total_amount) AS revenue

    FROM works

    GROUP BY YEAR(billing_date), MONTH(billing_date)

    ORDER BY year, month_no;
  `;

  const statusQuery = `
    SELECT
      status AS name,
      COUNT(*) AS value

    FROM works

    GROUP BY status;
  `;

  db.query(monthlyRevenueQuery, (err, revenueData) => {

    if (err) {
      return res.status(500).json(err);
    }

    db.query(statusQuery, (err2, statusData) => {

      if (err2) {
        return res.status(500).json(err2);
      }

      res.json({
        monthlyRevenue: revenueData,
        status: statusData,
      });

    });

  });

});

module.exports = router;