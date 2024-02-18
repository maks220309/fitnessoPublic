import { Router } from "express";
import userController from "../controllers/user-controller";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware";

const router = Router();

router.post(
	"/registration",
	body("email").isEmail(),
	body("password").isLength({ min: 8, max: 32 }),
	userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/@me", authMiddleware, userController.me);
router.get("/tasksGen", authMiddleware, userController.tasksGen);
router.get("/task/:id", authMiddleware, userController.task);
router.get("/taskComplete/:id", authMiddleware, userController.taskComplete);

export default router;
