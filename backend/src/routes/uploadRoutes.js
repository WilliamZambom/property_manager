import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = Router();

router.post("/", authMiddleware, upload.single("image"), uploadImage);

export default router;
