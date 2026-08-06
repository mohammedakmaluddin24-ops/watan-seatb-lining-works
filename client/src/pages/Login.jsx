import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAlt, FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const login = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );


      if(res.data.success){

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );


        toast.success("Login Successful");


        setTimeout(()=>{
          navigate("/dashboard");
        },1000);

      }


    } catch(err){

      toast.error("Invalid Username or Password");
      console.error(err);

    }


    setLoading(false);

  };



  return (

    <>

      <Toaster position="top-right" />


      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-700 flex items-center justify-center px-6">


        <motion.div

          initial={{
            opacity:0,
            y:40
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:0.8
          }}

          className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10"

        >


          <div className="text-center mb-8">


            <h1 className="text-4xl font-bold text-gray-800">

              Watan Seat

            </h1>


            <h2 className="text-2xl font-bold text-indigo-600">

              Lining Works

            </h2>


            <p className="text-gray-500 mt-3">

              Business Management System

            </p>


          </div>



          <form onSubmit={login}>


            <div className="relative mb-5">


              <FaUserAlt className="absolute top-4 left-4 text-gray-400"/>


              <input

                type="text"

                name="username"

                value={form.username}

                onChange={handleChange}

                placeholder="Username"

                className="w-full pl-12 p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"

                required

              />


            </div>




            <div className="relative mb-6">


              <FaLock className="absolute top-4 left-4 text-gray-400"/>


              <input

                type="password"

                name="password"

                value={form.password}

                onChange={handleChange}

                placeholder="Password"

                className="w-full pl-12 p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"

                required

              />


            </div>



            <button

              type="submit"

              disabled={loading}

              className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 hover:scale-105 transition"

            >

              {loading ? "Signing In..." : "Sign In"}

            </button>



          </form>


        </motion.div>


      </div>


    </>

  );

}


export default Login;