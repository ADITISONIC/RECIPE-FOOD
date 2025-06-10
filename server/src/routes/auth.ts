import express from "express";
import { login, register } from "../controllers/authentication";

const router = express.Router();

console.log("auth.ts loaded");
router.post("/register", register);
router.post("/login",login);
// ✅ Export the actual Router instance
export default router;


