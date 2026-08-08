import { useEffect, useState } from "react";
import axios from "axios";
import Invoice from "../components/Invoice.jsx";
function Works() {
  const [works, setWorks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    customer_id: "",
    bus_number: "",
    bus_model: "",
    site_location: "",
    billing_date: "",
    work_start_date: "",
    work_completion_date: "",
    total_amount: "",
    advance_payment: "",
    due_amount: 0,
    raw_material_cost: "",
    employee_work_cost: "",
    profit: 0,
    status: "Pending",
  });


  // Get customers
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/customers"
      );

      setCustomers(res.data);

    } catch (err) {
      console.error("Customer loading error:", err);
    }
  };


  // Get work orders
  const fetchWorks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/works"
      );

      setWorks(res.data);

    } catch (err) {
      console.error("Works loading error:", err);
    }
  };


  useEffect(() => {
    fetchCustomers();
    fetchWorks();
  }, []);



  // Input change + calculation
  const handleChange = (e) => {

    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };


    const total =
      Number(updatedForm.total_amount) || 0;

    const advance =
      Number(updatedForm.advance_payment) || 0;

    const raw =
      Number(updatedForm.raw_material_cost) || 0;

    const employee =
      Number(updatedForm.employee_work_cost) || 0;


    updatedForm.due_amount =
      total - advance;


    updatedForm.profit =
      total - raw - employee;


    setForm(updatedForm);
  };



  const editWork = (work) => {

    setEditingId(work.id);

    setForm({

      customer_id: work.customer_id,
      bus_number: work.bus_number,
      bus_model: work.bus_model,
      site_location: work.site_location,

      billing_date: work.billing_date
        ? work.billing_date.split("T")[0]
        : "",

      work_start_date: work.work_start_date
        ? work.work_start_date.split("T")[0]
        : "",

      work_completion_date: work.work_completion_date
        ? work.work_completion_date.split("T")[0]
        : "",

      total_amount: work.total_amount,
      advance_payment: work.advance_payment,
      due_amount: work.due_amount,
      raw_material_cost: work.raw_material_cost,
      employee_work_cost: work.employee_work_cost,
      profit: work.profit,
      status: work.status

    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  // Save Work Order
  const saveWork = async () => {

    if (!form.customer_id) {
      alert("Please select customer");
      return;
    }


    try {
      if (isEditing && editingId) {
        await axios.put(
          `http://localhost:5000/api/works/${editingId}`,
          form
        );

        alert("✅ Work Order Updated Successfully");
      } else {
       if (editingId) {

  await axios.put(
    `http://localhost:5000/api/works/${editingId}`,
    form
  );

  alert("✅ Work Order Updated Successfully");

} else {

  await axios.post(
    "http://localhost:5000/api/works",
    form
  );

  alert("✅ Work Order Saved Successfully");

}
        alert("✅ Work Order Saved Successfully");
      }

      setForm({
        customer_id: "",
        bus_number: "",
        bus_model: "",
        site_location: "",
        billing_date: "",
        work_start_date: "",
        work_completion_date: "",
        total_amount: "",
        advance_payment: "",
        due_amount: 0,
        raw_material_cost: "",
        employee_work_cost: "",
        profit: 0,
        status: "Pending",
      });
      setEditingId(null);
      setIsEditing(false);

      fetchWorks();


    } catch (err) {

      console.error(err);

      alert("❌ Failed to save work order");

    }

  };



  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6">
        Work Orders
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


            {customers.map((customer)=>(
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.company_name}
              </option>
            ))}


          </select>




          <input
            name="bus_number"
            placeholder="Bus Number"
            value={form.bus_number}
            onChange={handleChange}
            className="border p-3 rounded"
          />


          <input
            name="bus_model"
            placeholder="Bus Model"
            value={form.bus_model}
            onChange={handleChange}
            className="border p-3 rounded"
          />



          <input
            name="site_location"
            placeholder="Site Location"
            value={form.site_location}
            onChange={handleChange}
            className="border p-3 rounded"
          />



      {/* Billing Date */}
<div>
  <label className="block font-semibold mb-2">
    Billing Date
  </label>

  <input
    type="date"
    name="billing_date"
    value={form.billing_date}
    onChange={handleChange}
    className="border p-3 rounded w-full"
  />
</div>


{/* Work Start Date */}
<div>
  <label className="block font-semibold mb-2">
    Work Start Date
  </label>

  <input
    type="date"
    name="work_start_date"
    value={form.work_start_date}
    onChange={handleChange}
    className="border p-3 rounded w-full"
  />
</div>


{/* Work Completion Date */}
<div>
  <label className="block font-semibold mb-2">
    Work Completion Date
  </label>

  <input
    type="date"
    name="work_completion_date"
    value={form.work_completion_date}
    onChange={handleChange}
    className="border p-3 rounded w-full"
  />
</div>

          <input
            type="number"
            name="total_amount"
            placeholder="Total Amount"
            value={form.total_amount}
            onChange={handleChange}
            className="border p-3 rounded"
          />



          <input
            type="number"
            name="advance_payment"
            placeholder="Advance Payment"
            value={form.advance_payment}
            onChange={handleChange}
            className="border p-3 rounded"
          />



          <input
            readOnly
            value={form.due_amount}
            className="border p-3 rounded bg-gray-100"
            placeholder="Due Amount"
          />



          <input
            type="number"
            name="raw_material_cost"
            placeholder="Raw Material Cost"
            value={form.raw_material_cost}
            onChange={handleChange}
            className="border p-3 rounded"
          />



          <input
            type="number"
            name="employee_work_cost"
            placeholder="Employee Work Cost"
            value={form.employee_work_cost}
            onChange={handleChange}
            className="border p-3 rounded"
          />



          <input
            readOnly
            value={form.profit}
            className="border p-3 rounded bg-gray-100"
            placeholder="Profit"
          />



          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-3 rounded"
          >

            <option>
              Pending
            </option>

            <option>
              In Progress
            </option>

            <option>
              Completed
            </option>

          </select>


        </div>



        <button
          onClick={saveWork}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
        >
          {editingId ? "Update Work Order" : "Save Work Order"}
        </button>
        <div className="mt-10">

  <h2 className="text-2xl font-bold mb-4">
    Saved Work Orders
  </h2>


  <div className="overflow-x-auto bg-white shadow rounded-xl">

    <table className="min-w-full">

      <thead className="bg-blue-600 text-white">

        <tr>
          <th className="p-3">Customer</th>
          <th className="p-3">Bus No.</th>
          <th className="p-3">Model</th>
          <th className="p-3">Billing Date</th>
          <th className="p-3">Start Date</th>
          <th className="p-3">Completion</th>
          <th className="p-3">Total</th>
          <th className="p-3">Due</th>
          <th className="p-3">Profit</th>
          <th className="p-3">Status</th>
        <th className="p-3">Action / Invoice</th>
        </tr>

      </thead>


      <tbody>

        {works.length === 0 ? (

          <tr>
            <td
              colSpan="11"
              className="text-center p-5"
            >
              No work orders found
            </td>
          </tr>

        ) : (

          works.map((work)=>(

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
  {new Date(work.billing_date).toLocaleDateString("en-GB")}
</td>

<td className="p-3">
  {new Date(work.work_start_date).toLocaleDateString("en-GB")}
</td>

<td className="p-3">
  {new Date(work.work_completion_date).toLocaleDateString("en-GB")}
</td>
              <td className="p-3">
                {work.total_amount}
              </td>

              <td className="p-3">
                {work.due_amount}
              </td>

              <td className="p-3">
                {work.profit}
              </td>

              <td className="p-3">
                {work.status}
              </td>
              <td className="p-3 space-x-2">

  <button
    onClick={() => editWork(work)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={async () => {
      if (window.confirm("Delete this work order?")) {
        await axios.delete(
          `http://localhost:5000/api/works/${work.id}`
        );

        fetchWorks();
      }
    }}
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
  >
    Delete
  </button>

  <Invoice work={work}/>

</td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>

      </div>


    </div>

  );

}


export default Works;
