import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import razorpayRoutes from "./routes/razorpayRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Razorpay routes
app.use("/api/razorpay", razorpayRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
