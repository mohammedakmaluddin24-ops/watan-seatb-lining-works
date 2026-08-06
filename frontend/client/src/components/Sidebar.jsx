import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBus,
  FaUserTie,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white fixed">

      <h1 className="text-2xl font-bold p-6 border-b border-blue-700">
        Watan Seat Lining
      </h1>

      <nav className="flex flex-col p-4 gap-3">

        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded hover:bg-blue-700"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/customers"
          className="flex items-center gap-3 p-3 rounded hover:bg-blue-700"
        >
          <FaUsers />
          Customers
        </Link>

        <Link
          to="/works"
          className="flex items-center gap-3 p-3 rounded hover:bg-blue-700"
        >
          <FaBus />
          Work Orders
        </Link>
<Link
 to="/reports"
 className="block px-4 py-2 hover:bg-gray-200"
>
 Reports
</Link>
        <Link
          to="/employees"
          className="flex items-center gap-3 p-3 rounded hover:bg-blue-700"
        >
          <FaUserTie />
          Employees
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 p-3 rounded hover:bg-blue-700"
        >
          <FaChartBar />
          Reports
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;