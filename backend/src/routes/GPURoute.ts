import { Router } from "express";
import { createGpuController } from "../controllers/GpuController";
import { verifyJwt } from "../middleware/jwtUtil";

const router = Router();

router.post('/create', verifyJwt, createGpuController);

export default router;