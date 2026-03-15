import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token ausente" });
    }

    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(payload.sub).select("_id name email");
    if (!admin) return res.status(401).json({ message: "Usuário inválido" });

    req.admin = admin; // disponível nas rotas
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};

export default authMiddleware;
