function Navbar() {
  return (
    <div className="ml-64 h-16 bg-white shadow flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Watan Seat Lining Works
        </h2>
        <p className="text-gray-500 text-sm">
          Business Management System
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold">Admin</p>
          <p className="text-sm text-gray-500">
            Logged In
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">
          A
        </div>

      </div>

    </div>
  );
}

export default Navbar;