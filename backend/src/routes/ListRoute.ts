import { Router } from "express";
import { createListController } from "../controllers/ListController";
import { verifyJwt } from "../middleware/jwtUtil";

const router = Router();

router.post("/create", verifyJwt, createListController);
export default router;