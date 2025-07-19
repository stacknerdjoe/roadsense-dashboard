import { Router } from "express";
import RoadEvent from "../models/RoadEvent";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const events = await RoadEvent.find({ userId }).sort({ timestamp: -1 });
    res.json({ success: true, data: events });
  } catch (err) {
    console.error("❌ Failed to fetch events:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
