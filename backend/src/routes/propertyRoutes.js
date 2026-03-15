import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  listPublicProperties,
  getPublicPropertyById,
  listAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  deletePropertyImage,
} from "../controllers/propertyController.js";

const router = Router();

// Rotas públicas
router.get("/public", listPublicProperties);
router.get("/public/:id", getPublicPropertyById);

// Rotas privadas
router.get("/", authMiddleware, listAllProperties);
router.post("/", authMiddleware, upload.array("images", 10), createProperty);
router.put("/:id", authMiddleware, upload.array("images", 10), updateProperty);
router.delete("/:id/images/:publicId", authMiddleware, deletePropertyImage);
router.delete("/:id", authMiddleware, deleteProperty);

export default router;
