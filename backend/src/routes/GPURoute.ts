import { Router } from "express";
import { createGpuController, getAllGpusController, getGpuBySellerIdController } from "../controllers/GpuController";
import { verifyJwt } from "../middleware/jwtUtil";

const router = Router();

router.post('/create', verifyJwt, createGpuController);
router.get("/", verifyJwt, getAllGpusController);
router.get("/user", verifyJwt, getGpuBySellerIdController);

export default router;