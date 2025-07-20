# 🛣️ RoadSense Dashboard

A fullstack web application for uploading, analyzing, and visualizing road condition data from connected vehicles. Built with the MERN stack + TypeScript.

---

## 🚀 Features

- 🔐 **User authentication** (JWT-based)
- 📤 **CSV upload** for road telemetry (speed, timestamp, GPS)
- 💾 **MongoDB** data storage (via Mongoose)
- 📊 **Dashboard with charts** (speed over time, road condition distribution)
- 📁 **CSV export** of filtered road data
- 🔎 **Search/filter** by road condition
- ✅ **Protected routes**
- ⚙️ Built with **React + Node.js + Express + TypeScript**

---

## 🧪 Tech Stack

| Layer      | Tools |
|------------|-------|
| Frontend   | React, TypeScript, Chart.js, React Router |
| Backend    | Node.js, Express, Multer, Mongoose, JWT   |
| Database   | MongoDB Atlas                             |
| Styling    | Plain CSS / Inline (easily replaceable)   |
| DevOps     | Git, GitHub, Postman                      |



## 🧑‍💻 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/roadsense-dashboard.git
cd roadsense-dashboard

# 2. Install frontend
cd client
npm install
npm run dev

# 3. Install backend
cd ../server
npm install
npm run dev

## ✍️ Author

**Joseph Onyenemerem**  
🔗 [GitHub](https://github.com/your-username)  
📧 your@email.com

---

## 📁 Project Structure

roadsense-dashboard/
├── client/ # React frontend
│ └── src/pages/
│ ├── Login.tsx
│ ├── UploadData.tsx
│ ├── Dashboard.tsx
│ └── ViewData.tsx
├── server/ # Node backend
│ ├── routes/
│ ├── models/
│ ├── uploads/
│ └── index.ts
└── README.md