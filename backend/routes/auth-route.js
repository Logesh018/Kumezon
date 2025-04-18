import express from 'express';
import { login, logout, signup, refreshtoken, getProfile,toggleRole } from '../controllers/auth-controller.js';
import { protectRoute } from '../middleware/auth-middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resfresh-token", refreshtoken);
router.put("/toggle-role",protectRoute,toggleRole);
router.get("/profile", protectRoute, getProfile);

export default router;