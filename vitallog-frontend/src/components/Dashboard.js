// import React, { useEffect, useState } from "react";
// import api from "../api/axios";

// function Dashboard() {
//   const [readings, setReadings] = useState([]);
//   const [metricType, setMetricType] = useState("weight");
//   const [value, setValue] = useState("");
//   const [unit, setUnit] = useState("");
//   const [date, setDate] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [editingId, setEditingId] = useState(null);

//   const token = localStorage.getItem("access");

//   const fetchReadings = async () => {
//     try {
//       const res = await api.get("/api/readings/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReadings(res.data);
//     } catch (err) {
//       console.error("Error fetching readings:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchReadings();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post(
//         "/api/readings/",
//         { metric_type: metricType, value, unit, date },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchReadings();
//       setValue("");
//       setUnit("");
//       setDate("");
//     } catch (err) {
//       console.error("Error adding reading:", err.response?.data || err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this entry?")) return;
//     try {
//       await api.delete(`/api/readings/${id}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchReadings();
//     } catch (err) {
//       console.error("Error deleting:", err.response?.data || err.message);
//     }
//   };

//   const handleEdit = (id) => {
//     setEditingId(id);
//   };

//   const handleSaveEdit = async (reading) => {
//     try {
//       await api.put(`/api/readings/${reading.id}/`, reading, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditingId(null);
//       fetchReadings();
//     } catch (err) {
//       console.error("Error saving edit:", err.response?.data || err.message);
//     }
//   };

//   const filteredReadings = readings
//     .filter((r) => (filter === "all" ? true : r.metric_type === filter))
//     .sort((a, b) =>
//       sortOrder === "desc"
//         ? new Date(b.date) - new Date(a.date)
//         : new Date(a.date) - new Date(b.date)
//     );

//   const uniqueMetrics = [...new Set(readings.map((r) => r.metric_type))];

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">My Health Metrics</h2>
//         <button
//           className="text-sm text-red-600 hover:underline"
//           onClick={() => {
//             localStorage.removeItem("access");
//             localStorage.removeItem("refresh");
//             window.location.href = "/login";
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       <form
//         onSubmit={handleAdd}
//         className="flex flex-wrap gap-2 mb-6 items-center"
//       >
//         <select
//           value={metricType}
//           onChange={(e) => setMetricType(e.target.value)}
//           className="border rounded px-2 py-1"
//         >
//           <option value="weight">Weight</option>
//           <option value="blood_pressure">Blood Pressure</option>
//           <option value="blood_sugar">Blood Sugar</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Value"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           className="border rounded px-2 py-1"
//           required
//         />
//         <input
//           placeholder="Unit"
//           value={unit}
//           onChange={(e) => setUnit(e.target.value)}
//           className="border rounded px-2 py-1"
//           required
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="border rounded px-2 py-1"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//         >
//           Add
//         </button>
//       </form>

//       <div className="flex gap-4 mb-4">
//         <div>
//           <label className="mr-2">Filter:</label>
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border rounded px-2 py-1"
//           >
//             <option value="all">All</option>
//             {uniqueMetrics.map((m) => (
//               <option key={m} value={m}>
//                 {m}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="mr-2">Sort by date:</label>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="border rounded px-2 py-1"
//           >
//             <option value="desc">Newest First</option>
//             <option value="asc">Oldest First</option>
//           </select>
//         </div>
//       </div>

//       <table className="w-full text-left border-t border-b">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="py-2 px-4">Date</th>
//             <th className="py-2 px-4">Metric</th>
//             <th className="py-2 px-4">Value</th>
//             <th className="py-2 px-4">Unit</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredReadings.map((r) => (
//             <tr key={r.id} className="border-t">
//               <td className="py-2 px-4">{r.date}</td>
//               <td className="py-2 px-4">{r.metric_type}</td>
//               <td className="py-2 px-4">
//                 {editingId === r.id ? (
//                   <input
//                     value={r.value}
//                     onChange={(e) =>
//                       setReadings((prev) =>
//                         prev.map((x) =>
//                           x.id === r.id ? { ...x, value: e.target.value } : x
//                         )
//                       )
//                     }
//                     className="border px-2 py-1 rounded"
//                   />
//                 ) : (
//                   r.value
//                 )}
//               </td>
//               <td className="py-2 px-4">
//                 {editingId === r.id ? (
//                   <input
//                     value={r.unit}
//                     onChange={(e) =>
//                       setReadings((prev) =>
//                         prev.map((x) =>
//                           x.id === r.id ? { ...x, unit: e.target.value } : x
//                         )
//                       )
//                     }
//                     className="border px-2 py-1 rounded"
//                   />
//                 ) : (
//                   r.unit
//                 )}
//               </td>
//               <td className="py-2 px-4">
//                 {editingId === r.id ? (
//                   <button
//                     onClick={() => handleSaveEdit(r)}
//                     className="text-green-600 hover:underline mr-2"
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleEdit(r.id)}
//                     className="text-blue-600 hover:underline mr-2"
//                   >
//                     Edit
//                   </button>
//                 )}
//                 <button
//                   onClick={() => handleDelete(r.id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [metricType, setMetricType] = useState("weight");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [last30DaysOnly, setLast30DaysOnly] = useState(false);

  const token = localStorage.getItem("access");

  const fetchReadings = async () => {
    try {
      const res = await api.get("/api/readings/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReadings(res.data);
    } catch (err) {
      console.error("Error fetching readings:", err.response?.data || err.message);
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  const uniqueMetrics = [...new Set(readings.map((r) => r.metric_type))];

  const filteredReadings = readings
    .filter((r) => {
      if (filter !== "all" && r.metric_type !== filter) return false;

      if (last30DaysOnly) {
        const today = new Date();
        const readingDate = new Date(r.date);
        const diffInDays = (today - readingDate) / (1000 * 60 * 60 * 24);
        if (diffInDays > 30) return false;
      }

      return true;
    })
    .sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      metric_type: metricType,
      value,
      unit,
      date,
    };

    try {
      if (editingId) {
        await api.put(`/api/readings/${editingId}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await api.post("/api/readings/", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setValue("");
      setUnit("");
      setDate("");
      fetchReadings();
    } catch (err) {
      console.error("Error saving reading:", err.response?.data || err.message);
      alert("Error saving reading. Check console for details.");
    }
  };

  const handleEdit = (reading) => {
    setEditingId(reading.id);
    setMetricType(reading.metric_type);
    setValue(reading.value);
    setUnit(reading.unit);
    setDate(reading.date);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reading?")) return;
    try {
      await api.delete(`/api/readings/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReadings();
    } catch (err) {
      console.error("Error deleting reading:", err.response?.data || err.message);
      alert("Error deleting reading");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Health Metrics</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6">
        <select
          value={metricType}
          onChange={(e) => setMetricType(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="weight">Weight</option>
          <option value="blood_pressure">Blood Pressure</option>
          <option value="blood_sugar">Blood Sugar</option>
        </select>
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <input
          placeholder="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <div className="flex gap-4 mb-4 flex-wrap">
        <div>
          <label className="mr-2">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            {uniqueMetrics.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2">Sort by date:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={last30DaysOnly}
            onChange={(e) => setLast30DaysOnly(e.target.checked)}
            className="h-4 w-4 text-blue-600"
          />
          <span>Last 30 days only</span>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Metric</th>
              <th className="py-2 px-4 text-left">Value</th>
              <th className="py-2 px-4 text-left">Unit</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReadings.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-2 px-4">{r.date}</td>
                <td className="py-2 px-4">{r.metric_type}</td>
                <td className="py-2 px-4">{r.value}</td>
                <td className="py-2 px-4">{r.unit}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(r)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredReadings.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No data to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
