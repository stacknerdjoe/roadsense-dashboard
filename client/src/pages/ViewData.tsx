import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const ViewData = () => {
  const [allData, setAllData] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (result.success) {
          setAllData(result.data);
          setFilteredData(result.data); // default to all
        }
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const result = allData.filter((item) =>
      item.road_condition?.toLowerCase().includes(value)
    );
    setFilteredData(result);
  };

  // ✅ Export handler
  const handleExport = () => {
    if (filteredData.length === 0) return;

    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "road_data_export.csv");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>View Uploaded Road Data</h2>
      <input
        type="text"
        placeholder="Filter by road condition..."
        value={filter}
        onChange={handleFilter}
        style={{ marginBottom: "1rem", padding: "8px", width: "300px" }}
      />

      {/* ✅ Export CSV Button */}
      <button onClick={handleExport} style={{ marginLeft: "1rem", padding: "8px" }}>
        📤 Export CSV
      </button>

      {filteredData.length > 0 ? (
        <table border={1} cellPadding={8} style={{ marginTop: "2rem", width: "100%" }}>
          <thead>
            <tr>
              {Object.keys(filteredData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "2rem" }}>No data to display.</p>
      )}
    </div>
  );
};

export default ViewData;
