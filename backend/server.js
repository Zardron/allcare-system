import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8080;
connectDB();
const app = express();

app.use(express.json({ limit: "20MB" }));
app.use(express.urlencoded({ extended: true, limit: "20MB" }));

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  "/api/users",
  express.static(path.join(__dirname, "uploads")),
  userRoutes
);
app.use("/api/company", companyRoutes);
app.use("/api/product", productRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/complaint", complaintRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
