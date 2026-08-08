import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserPlus
} from "react-icons/fa";


function Customers(){


const [customers,setCustomers]=useState([]);

const [search,setSearch]=useState("");

const [editingId,setEditingId]=useState(null);



const [form,setForm]=useState({

companyName:"",
phone:"",
address:""

});





useEffect(()=>{

fetchCustomers();

},[]);






const fetchCustomers=async()=>{

try{

const res=await axios.get(
"https://watan-seat-lining-works-backend.onrender.com/api/customers"
);


setCustomers(res.data);


}catch(err){

console.log(err);

}

};






const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};






const saveCustomer=async()=>{


if(!form.companyName || !form.phone){

alert("Company and Phone required");

return;

}



try{


if(editingId){


await axios.put(

`http://localhost:5000/api/customers/${editingId}`,

{

company_name:form.companyName,
phone:form.phone,
address:form.address

}

);


alert("Customer Updated");


}

else{


await axios.post(

"http://localhost:5000/api/customers",

{

company_name:form.companyName,
phone:form.phone,
address:form.address

}

);


alert("Customer Added");


}



setForm({

companyName:"",
phone:"",
address:""

});


setEditingId(null);


fetchCustomers();



}catch(err){

console.log(err);

}


};








const editCustomer=(customer)=>{


setEditingId(customer.id);


setForm({

companyName:customer.company_name,

phone:customer.phone,

address:customer.address

});


window.scrollTo({

top:0,

behavior:"smooth"

});


};







const deleteCustomer=async(id)=>{


if(window.confirm("Delete this customer?")){


await axios.delete(

`http://localhost:5000/api/customers/${id}`

);


fetchCustomers();


}



};







const filteredCustomers=

customers.filter((c)=>

c.company_name

.toLowerCase()

.includes(search.toLowerCase())

);







return(


<div className="space-y-8">





{/* Header */}


<div>


<h1 className="text-4xl font-bold text-slate-800">

👥 Customer Management

</h1>


<p className="text-gray-500 mt-2">

Manage your clients and company information

</p>


</div>








{/* Form */}



<motion.div

initial={{opacity:0,y:30}}

animate={{opacity:1,y:0}}

className="bg-white rounded-3xl shadow-xl p-8"

>



<h2 className="text-2xl font-bold mb-6 flex items-center gap-3">


<FaUserPlus className="text-blue-600"/>


{editingId ? "Update Customer":"Add New Customer"}


</h2>






<div className="grid md:grid-cols-3 gap-5">



<input

name="companyName"

value={form.companyName}

onChange={handleChange}

placeholder="Company Name"

className="border p-4 rounded-xl"

/>



<input

name="phone"

value={form.phone}

onChange={handleChange}

placeholder="Phone Number"

className="border p-4 rounded-xl"

/>



<input

name="address"

value={form.address}

onChange={handleChange}

placeholder="Address"

className="border p-4 rounded-xl"

/>



</div>






<button

onClick={saveCustomer}

className="mt-6 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-8 py-3 rounded-xl hover:scale-105 transition"

>


{editingId ? "Update Customer":"Save Customer"}


</button>



</motion.div>








{/* Search */}



<div className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">


<FaSearch className="text-gray-400"/>


<input

placeholder="Search customer..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="outline-none w-full"

/>


</div>









{/* Cards */}



<div className="grid md:grid-cols-3 gap-6">



{

filteredCustomers.map((customer)=>(



<motion.div

key={customer.id}

whileHover={{scale:1.03}}

className="bg-white rounded-3xl shadow-lg p-6"

>




<h2 className="text-xl font-bold flex gap-3 items-center">

<FaBuilding className="text-blue-600"/>

{customer.company_name}

</h2>





<div className="mt-5 space-y-3 text-gray-600">


<p className="flex gap-3">

<FaPhone/>

{customer.phone}

</p>



<p className="flex gap-3">

<FaMapMarkerAlt/>

{customer.address}

</p>



</div>







<div className="flex gap-3 mt-6">


<button

onClick={()=>editCustomer(customer)}

className="flex-1 bg-yellow-500 text-white py-2 rounded-xl flex justify-center gap-2"

>


<FaEdit/>

Edit


</button>





<button

onClick={()=>deleteCustomer(customer.id)}

className="flex-1 bg-red-500 text-white py-2 rounded-xl flex justify-center gap-2"

>


<FaTrash/>

Delete


</button>



</div>





</motion.div>



))


}



</div>




</div>


);


}



export default Customers;
