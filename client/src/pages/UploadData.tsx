import React, { useState } from "react";

const UploadData = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [parsedData, setParsedData] = useState<any[]>([]); // Initialize as array

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("dataFile", file);

    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:5000/api/upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, // 🛡 Send token
            },
            body: formData,
      });

      const result = await response.json();
      console.log("Parsed result:", result);
      if (response.ok) {
        setMessage("✅ File uploaded and parsed successfully!");
        setParsedData(result.data); // Store parsed CSV rows
      } else {
        setMessage("❌ Upload failed: " + result.message);
        setParsedData([]);
      }
    } catch (err) {
      setMessage("❌ Upload error: " + (err as Error).message);
      setParsedData([]);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h2>Upload Road Data (CSV)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <br /><br />
        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}

      {/* ✅ Safely render table if parsedData is a valid array */}
      {Array.isArray(parsedData) && parsedData.length > 0 && (
        <table border={1} cellPadding={8} style={{ marginTop: "2rem", width: "100%" }}>
          <thead>
            <tr>
              {Object.keys(parsedData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsedData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value: unknown, i) => (
                  <td key={i}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadData;
