import { Router } from "express";
import { creatGpuController, getAllGpusController } from "../controllers/GpuController";

const router = Router();

router.get("/", getAllGpusController);
router.post("/add", creatGpuController);

export default router;