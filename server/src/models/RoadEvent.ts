import mongoose from "mongoose";

const RoadEventSchema = new mongoose.Schema({
  timestamp: String,
  latitude: String,
  longitude: String,
  speed: String,
  road_condition: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("RoadEvent", RoadEventSchema);
