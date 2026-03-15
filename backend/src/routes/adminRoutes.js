import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({ admin: req.admin });
});

export default router;
