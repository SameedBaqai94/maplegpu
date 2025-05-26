import { Router } from "express";
import { createUsersController, signInUserController } from "../controllers/UsersController";

const router = Router();

router.post("/register", createUsersController);
router.post("/signin", signInUserController);

export default router;