import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BASE_URL } from "./api";
function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/colleges`)
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .catch((err) => console.error(err));
  }, []);

  // Filtering logic
  const filtered = colleges.filter((college) => {
    return (
      college.name.toLowerCase().includes(search.toLowerCase()) &&
      (location === "" || college.location === location) &&
      (maxFees === "" || college.fees <= maxFees)
    );
  });

  // Loading state
  if (!colleges.length) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 animate-pulse">
        Loading colleges...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            College<span className="text-blue-600">Finder</span>
          </h1>
          <p className="text-gray-500 text-sm hidden md:block">
            Discover • Compare • Decide
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-wrap gap-3">

          <input
            type="text"
            placeholder="🔍 Search colleges..."
            className="flex-1 min-w-[200px] px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-2 border rounded-xl"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Tamil Nadu</option>
            <option>Hyderabad</option>
          </select>

          <input
            type="number"
            placeholder="Max Fees"
            className="px-4 py-2 border rounded-xl w-36"
            onChange={(e) => setMaxFees(e.target.value)}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-10 grid md:grid-cols-3 gap-6">
        {filtered.map((college) => (
          <motion.div
            key={college.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 hover:border-blue-200"
          >

            {/* Title */}
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-slate-800">
                {college.name}
              </h2>
              <span className="text-yellow-500 text-sm font-medium">
                ⭐ {college.rating}
              </span>
            </div>

            {/* Location */}
            <p className="text-sm text-gray-500 mt-1">
              📍 {college.location}
            </p>

            {/* Fees */}
            <p className="mt-4 text-blue-600 font-semibold text-lg">
              ₹ {college.fees.toLocaleString()}
            </p>

            {/* Courses */}
            <p className="text-sm text-gray-400 mt-1">
              {college.courses}
            </p>

            {/* Actions */}
            <div className="mt-5 flex justify-between items-center">
              <button
                onClick={() => navigate(`/college/${college.id}`)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
              >
                View Details
              </button>

              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected([...selected, college]);
                  } else {
                    setSelected(
                      selected.filter((c) => c.id !== college.id)
                    );
                  }
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compare Button */}
      {selected.length >= 2 && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => navigate("/compare", { state: selected })}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            Compare ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;