import express from "express";
import {login,signup,logout} from "../controllers/authController.js";
import { authenticateJWT } from "../middlewares/jwtMiddleware.js";


const router = express.Router();

router.post("/login",login);
router.post("/signup", signup);
router.get("/logout", authenticateJWT,logout);

export default router;