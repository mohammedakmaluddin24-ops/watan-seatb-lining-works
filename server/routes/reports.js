const express = require("express");
const router = express.Router();
const db = require("../config/db");


// Dashboard summary
router.get("/", (req,res)=>{

const sql = `

SELECT

(SELECT COUNT(*) FROM customers)
AS total_customers,

(SELECT COUNT(*) FROM works)
AS total_work_orders,

(SELECT COALESCE(SUM(total_amount),0)
FROM works)
AS total_sales,

(SELECT COALESCE(SUM(payment_amount),0)
FROM payments)
AS total_payments,

(
(SELECT COALESCE(SUM(total_amount),0)
FROM works)

-

(SELECT COALESCE(SUM(payment_amount),0)
FROM payments)
)

AS pending_amount,

(SELECT COALESCE(SUM(profit),0)
FROM works)
AS total_profit

`;

db.query(sql,(err,result)=>{

if(err)
return res.status(500).json(err);

res.json(result[0]);

});

});





// Detailed report
router.get("/details",(req,res)=>{


const sql = `

SELECT

works.*,

customers.company_name,


(
SELECT COALESCE(SUM(payment_amount),0)

FROM payments

WHERE payments.work_id = works.id

)

AS paid_amount,


(
works.total_amount -

(
SELECT COALESCE(SUM(payment_amount),0)

FROM payments

WHERE payments.work_id = works.id

)

)

AS remaining_amount



FROM works


LEFT JOIN customers

ON works.customer_id = customers.id


ORDER BY works.id DESC


`;



db.query(sql,(err,result)=>{


if(err)

return res.status(500).json(err);



res.json(result);



});


});



module.exports = router;