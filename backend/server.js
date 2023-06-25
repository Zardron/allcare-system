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
import cors from "cors";

const port = process.env.PORT || 8080;
connectDB();
const app = express();

app.use(express.json({ limit: "20MB" }));
app.use(express.urlencoded({ extended: true, limit: "20MB" }));

app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/product", productRoutes);
app.use("/api/appointment", appointmentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
