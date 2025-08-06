import express from 'express';
import cors from "cors";
import usersRoute from "./routes/UsersRoute";
import gpuRoute from "./routes/GPURoute";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use("/api/users", usersRoute);
app.use("/api/gpu", gpuRoute);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;