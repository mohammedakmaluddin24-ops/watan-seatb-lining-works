import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaUsers,
  FaBus,
  FaMoneyBillWave,
  FaWallet,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";



function Dashboard() {


  const [data,setData] = useState({

    total_customers:0,
    total_works:0,
    total_revenue:0,
    total_received:0,
    pending_amount:0,
    total_profit:0,

  });



  const [charts,setCharts] = useState({

    monthlyRevenue:[],
    status:[]

  });



  useEffect(()=>{

    fetchDashboard();

    fetchCharts();

  },[]);





  const fetchDashboard = async()=>{

    try{

      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setData(res.data);


    }catch(err){

      console.log(err);

    }

  };





  const fetchCharts = async()=>{

    try{

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/charts"
      );


      setCharts(res.data);


    }catch(err){

      console.log(err);

    }

  };





  const cards=[


    {
      title:"Customers",
      value:data.total_customers,
      icon:<FaUsers/>,
      color:"from-blue-500 to-cyan-400"
    },


    {
      title:"Work Orders",
      value:data.total_works,
      icon:<FaBus/>,
      color:"from-purple-500 to-indigo-500"
    },


    {
      title:"Revenue",
      value:`₹ ${data.total_revenue}`,
      icon:<FaMoneyBillWave/>,
      color:"from-green-500 to-emerald-400"
    },


    {
      title:"Received",
      value:`₹ ${data.total_received}`,
      icon:<FaWallet/>,
      color:"from-yellow-500 to-orange-400"
    },


    {
      title:"Pending",
      value:`₹ ${data.pending_amount}`,
      icon:<FaClock/>,
      color:"from-red-500 to-pink-500"
    },


    {
      title:"Profit",
      value:`₹ ${data.total_profit}`,
      icon:<FaChartLine/>,
      color:"from-teal-500 to-cyan-400"
    },


  ];





return (

<div className="space-y-8">



{/* Hero */}


<div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">


<h1 className="text-4xl font-bold">

Good Evening, Admin 👋

</h1>


<p className="mt-3 text-lg text-blue-100">

Manage your bus seat lining business from one powerful dashboard.

</p>


</div>





{/* Cards */}


<div className="grid md:grid-cols-3 gap-6">


{

cards.map((card,index)=>(


<div

key={index}

className={`bg-gradient-to-br ${card.color} text-white rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300`}

>


<div className="flex justify-between items-center">


<div>


<p className="text-white/80">

{card.title}

</p>


<h2 className="text-3xl font-bold mt-2">

{card.value}

</h2>


</div>


<div className="text-4xl">

{card.icon}

</div>


</div>


</div>


))


}


</div>






{/* Charts */}



<div className="grid lg:grid-cols-2 gap-6">



{/* Revenue */}


<div className="bg-white rounded-3xl shadow p-6">


<h2 className="text-xl font-bold mb-5">

Monthly Revenue

</h2>



<ResponsiveContainer width="100%" height={300}>


<LineChart data={charts.monthlyRevenue}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="revenue"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>






{/* Status */}



<div className="bg-white rounded-3xl shadow p-6">


<h2 className="text-xl font-bold mb-5">

Work Status

</h2>



<ResponsiveContainer width="100%" height={300}>


<PieChart>


<Pie

data={charts.status}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{

charts.status.map((entry,index)=>(


<Cell key={index}/>


))

}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>



</div>






</div>


);


}


export default Dashboard;