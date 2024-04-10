import express from "express";
import { Signin, Signup } from "../controllner/auth";

const router = express.Router();
router.post("/auth/signup", Signup);
router.post("/auth/signin", Signin);
export default router;