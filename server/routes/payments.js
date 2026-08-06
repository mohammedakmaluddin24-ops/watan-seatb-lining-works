const express = require("express");
const router = express.Router();
const db = require("../config/db");


// Get all payments
router.get("/", (req,res)=>{

 const sql = `
SELECT 
payments.*,
customers.company_name,
works.bus_number,
works.total_amount,

(
works.total_amount -
(
SELECT COALESCE(SUM(payment_amount),0)
FROM payments p2
WHERE p2.work_id = works.id
)

) AS remaining_amount


FROM payments

JOIN customers
ON payments.customer_id = customers.id

JOIN works
ON payments.work_id = works.id

ORDER BY payments.id DESC
`;

    db.query(sql,(err,result)=>{

        if(err)
            return res.status(500).json(err);


        res.json(result);

    });

});



// Add payment
router.post("/",(req,res)=>{


const {
    customer_id,
    work_id,
    payment_amount,
    payment_date,
    payment_method,
    notes
}=req.body;



const sql = `
INSERT INTO payments
(customer_id,work_id,payment_amount,payment_date,payment_method,notes)

VALUES (?,?,?,?,?,?)
`;



db.query(
sql,
[
customer_id,
work_id,
payment_amount,
payment_date,
payment_method,
notes
],

(err,result)=>{

if(err)
return res.status(500).json(err);


res.json({
message:"Payment saved",
id:result.insertId
});


});


});


module.exports = router;