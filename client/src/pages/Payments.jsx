import { useEffect, useState } from "react";
import axios from "axios";


function Payments() {


  const [payments, setPayments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [works, setWorks] = useState([]);


  const [form, setForm] = useState({

    customer_id: "",
    work_id: "",
    payment_amount: "",
    payment_date: "",
    payment_method: "Cash",
    notes: ""

  });



  const fetchData = async()=>{

    try{

      const customerRes =
      await axios.get(
        "http://localhost:5000/api/customers"
      );


      const workRes =
      await axios.get(
        "http://localhost:5000/api/works"
      );


      const paymentRes =
      await axios.get(
        "http://localhost:5000/api/payments"
      );


      setCustomers(customerRes.data);
      setWorks(workRes.data);
      setPayments(paymentRes.data);


    }
    catch(err){

      console.error(err);

    }

  };



  useEffect(()=>{

    fetchData();

  },[]);




  const handleChange=(e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };





  const savePayment=async()=>{


    if(!form.customer_id || !form.work_id){

      alert("Select customer and work order");

      return;

    }



    try{


      await axios.post(

        "http://localhost:5000/api/payments",

        form

      );


      alert("Payment Saved ✅");


      setForm({

        customer_id:"",
        work_id:"",
        payment_amount:"",
        payment_date:"",
        payment_method:"Cash",
        notes:""

      });


      fetchData();


    }
    catch(err){

      console.error(err);

      alert("Payment failed");

    }


  };




return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">
Payments
</h1>



<div className="bg-white shadow rounded-xl p-6">


<div className="grid md:grid-cols-2 gap-4">



<select
name="customer_id"
value={form.customer_id}
onChange={handleChange}
className="border p-3 rounded"
>

<option value="">
Select Customer
</option>


{
customers.map(c=>(

<option
key={c.id}
value={c.id}
>

{c.company_name}

</option>

))

}


</select>




<select

name="work_id"

value={form.work_id}

onChange={handleChange}

className="border p-3 rounded"

>


<option value="">
Select Work Order
</option>


{

works
.filter(
w =>
!form.customer_id ||
w.customer_id == form.customer_id
)
.map(w=>(

<option

key={w.id}

value={w.id}

>

{w.bus_number}

</option>

))

}



</select>





<input

type="number"

name="payment_amount"

placeholder="Payment Amount"

value={form.payment_amount}

onChange={handleChange}

className="border p-3 rounded"

/>





<input

type="date"

name="payment_date"

value={form.payment_date}

onChange={handleChange}

className="border p-3 rounded"

/>





<select

name="payment_method"

value={form.payment_method}

onChange={handleChange}

className="border p-3 rounded"

>

<option>
Cash
</option>

<option>
Bank
</option>

<option>
UPI
</option>

</select>





<input

name="notes"

placeholder="Notes"

value={form.notes}

onChange={handleChange}

className="border p-3 rounded"

/>



</div>



<button

onClick={savePayment}

className="mt-5 bg-blue-600 text-white px-6 py-3 rounded"

>

Save Payment

</button>



</div>





<div className="mt-8 bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">
Payment History
</h2>



<table className="min-w-full">


<thead className="bg-blue-600 text-white">

<tr>

<th className="p-3">
Customer
</th>

<th className="p-3">
Bus
</th>

<th className="p-3">
Amount
</th>

<th className="p-3">
Date
</th>

<th className="p-3">
Method
</th>

<th className="p-3">
Remaining
</th>

</tr>

</thead>



<tbody>


{

payments.map(p=>(


<tr
key={p.id}
className="border-b text-center"
>


<td className="p-3">
{p.company_name}
</td>


<td className="p-3">
{p.bus_number}
</td>


<td className="p-3">
{p.payment_amount}
</td>


<td className="p-3">
{
p.payment_date
?
new Date(p.payment_date)
.toLocaleDateString("en-GB")
:
""
}
</td>


<td className="p-3">
{p.payment_method}
</td>


<td className="p-3">
{p.remaining_amount}
</td>



</tr>


))

}


</tbody>



</table>


</div>



</div>

);


}


export default Payments;