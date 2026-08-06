import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaBus,
  FaMoneyBill,
  FaChartBar,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";


function MainLayout() {

  const navigate = useNavigate();


  const user = localStorage.getItem("user");


  // Protect dashboard pages
  if (!user) {
    return <Navigate to="/" replace />;
  }



  const logout = () => {

    localStorage.removeItem("user");

    navigate("/", { replace: true });

  };



  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />
    },

    {
      name: "Customers",
      path: "/customers",
      icon: <FaUsers />
    },

    {
      name: "Works",
      path: "/works",
      icon: <FaBus />
    },

    {
      name: "Payments",
      path: "/payments",
      icon: <FaMoneyBill />
    },

    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />
    },

  ];



  return (

    <div className="min-h-screen bg-slate-100 flex">


      {/* Sidebar */}

      <aside className="w-72 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white p-6 hidden md:flex flex-col">


        <div className="mb-10">

          <h1 className="text-3xl font-bold">
            🚍 Watan
          </h1>

          <p className="text-gray-400">
            Seat Lining Works
          </p>

        </div>



        <nav className="space-y-3 flex-1">


          {menuItems.map((item)=>(

            <NavLink

              key={item.path}

              to={item.path}

              className={({isActive}) =>

                `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300

                ${
                  isActive

                  ?

                  "bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-lg"

                  :

                  "text-gray-300 hover:bg-white/10 hover:text-white"

                }`

              }

            >

              <span className="text-xl">
                {item.icon}
              </span>


              <span>
                {item.name}
              </span>


            </NavLink>

          ))}


        </nav>



        {/* Profile + Logout */}

        <div className="bg-white/10 rounded-2xl p-4">


          <div className="flex items-center gap-3 mb-5">


            <FaUserCircle className="text-4xl text-cyan-400"/>


            <div>

              <p className="font-semibold">
                Admin
              </p>

              <p className="text-sm text-gray-400">
                Manager
              </p>

            </div>


          </div>



          <button

            onClick={logout}

            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition"

          >

            <FaSignOutAlt />

            Logout

          </button>


        </div>


      </aside>





      {/* Right Side */}

      <div className="flex-1">



        {/* Header */}

        <header className="h-20 bg-white shadow flex items-center justify-between px-8">


          <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-2">


            <FaSearch className="text-gray-400"/>


            <input

              placeholder="Search..."

              className="bg-transparent outline-none"

            />


          </div>




          <div className="flex items-center gap-6">


            <button className="relative">


              <FaBell className="text-xl text-gray-600"/>


              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">

                3

              </span>


            </button>


            <span className="font-semibold">
              Admin
            </span>


          </div>


        </header>





        {/* Pages */}

        <main className="p-8">

          <Outlet />

        </main>


      </div>


    </div>

  );

}


export default MainLayout;