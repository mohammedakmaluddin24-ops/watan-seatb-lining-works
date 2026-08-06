import { useEffect, useState } from "react";
import axios from "axios";


function Reports() {


  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState([]);

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");


  const fetchReports = async()=>{

    try{

      const summaryRes = await axios.get(
        "http://localhost:5000/api/reports"
      );


      const detailsRes = await axios.get(
        "http://localhost:5000/api/reports/details"
      );


      setSummary(summaryRes.data);
      setDetails(detailsRes.data);


    }
    catch(err){

      console.error(err);

    }

  };



  useEffect(()=>{

    fetchReports();

  },[]);



  if(!summary){

    return <div className="p-6">
      Loading Reports...
    </div>

  }

const printReport = () => {
  window.print();
};

return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">
Reports Dashboard
</h1>

<div className="flex flex-wrap gap-4 mb-6">

  <input
    type="text"
    placeholder="Search Customer or Bus Number"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-3 rounded w-72"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border p-3 rounded"
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>

  <button
    onClick={printReport}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded"
  >
    Print Report
  </button>

</div>

{/* Summary Cards */}

<div className="grid md:grid-cols-3 gap-5">


<div className="bg-white shadow rounded-xl p-5">
<p>Total Customers</p>
<h2 className="text-3xl font-bold">
{summary.total_customers}
</h2>
</div>



<div className="bg-white shadow rounded-xl p-5">
<p>Total Work Orders</p>
<h2 className="text-3xl font-bold">
{summary.total_work_orders}
</h2>
</div>



<div className="bg-white shadow rounded-xl p-5">
<p>Total Sales</p>
<h2 className="text-3xl font-bold">
₹ {summary.total_sales}
</h2>
</div>



<div className="bg-white shadow rounded-xl p-5">
<p>Payments Received</p>
<h2 className="text-3xl font-bold">
₹ {summary.total_payments}
</h2>
</div>



<div className="bg-white shadow rounded-xl p-5">
<p>Pending Amount</p>
<h2 className="text-3xl font-bold text-red-600">
₹ {summary.pending_amount}
</h2>
</div>



<div className="bg-white shadow rounded-xl p-5">
<p>Total Profit</p>
<h2 className="text-3xl font-bold text-green-600">
₹ {summary.total_profit}
</h2>
</div>



</div>





{/* Detailed Table */}

<div className="mt-10 bg-white shadow rounded-xl overflow-x-auto">


<h2 className="text-2xl font-bold p-5">
Work Report Details
</h2>



<table className="min-w-full">


<thead className="bg-blue-600 text-white">

<tr>

<th className="p-3">
Customer
</th>

<th className="p-3">
Bus No
</th>

<th className="p-3">
Model
</th>

<th className="p-3">
Total
</th>

<th className="p-3">
Paid
</th>

<th className="p-3">
Due
</th>

<th className="p-3">
Profit
</th>

<th className="p-3">
Status
</th>


</tr>

</thead>




<tbody>


{

details.length===0 ? (

<tr>

<td
colSpan="8"
className="text-center p-5"
>

No Records Found

</td>

</tr>

)

:

(

details
  .filter((work) => {

    const matchesSearch =
      work.company_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      work.bus_number
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      work.status === statusFilter;

    return matchesSearch && matchesStatus;

  })
  .map((work) => (


<tr
key={work.id}
className="border-b text-center"
>


<td className="p-3">
{work.company_name}
</td>


<td className="p-3">
{work.bus_number}
</td>


<td className="p-3">
{work.bus_model}
</td>


<td className="p-3">
{work.total_amount}
</td>


<td className="p-3">
{work.paid_amount}
</td>


<td className="p-3">
{work.remaining_amount}
</td>


<td className="p-3">
{work.profit}
</td>


<td className="p-3">
{work.status}
</td>


</tr>


))

)


}


</tbody>


</table>


</div>



</div>

);


}


export default Reports;