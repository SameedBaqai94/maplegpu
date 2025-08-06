import { Router } from "express";
import { createUsersController, signInUserController, verifyJWTController } from "../controllers/UsersController";
import { verifyJwt } from "../middleware/jwtUtil";

const router = Router();

router.post("/register", createUsersController);
router.post("/login", signInUserController);
//router.get("/current", verifyJwt, verifyJWTController);

export default router;