import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import csv from "csv-parser";
import RoadEvent from "../models/RoadEvent";
import { authenticateToken } from "../middleware/authMiddleware";



const router = express.Router();
const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });
router.post("/", authenticateToken, upload.single("dataFile"), (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  
    const results: any[] = [];
    const filePath = req.file.path;
  
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        console.log("✅ Parsed rows:", results.length);
      
        try {
         // Inject userId into each row
            const userId = (req as any).user?.userId; 
            const eventsWithUser = results.map((row) => ({
             ...row,
            userId,
         }));

    const inserted = await RoadEvent.insertMany(eventsWithUser);

    res.status(200).json({
      success: true,
      message: "File uploaded, parsed, and saved",
      count: inserted.length,
    });
  } catch (err) {
    console.error("❌ DB save error:", err);
    res.status(500).json({ message: "Failed to save data to database" });
  }
      })
  });

export default router;
