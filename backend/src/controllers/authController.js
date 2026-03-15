import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const signToken = (adminId) => {
  return jwt.sign({ sub: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// 3.1 Registrar (cria admin + devolve token)
// Obs: Depois tenho que restringir para não permitir criar vários admins.

export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, email e password são obrigatórios" });
  }

  const exists = await Admin.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: "Email já cadastrado" });
  }

  const passwordHash = await bcrypt.hash(password, 12); // 12 = custo (bom padrão)
  const admin = await Admin.create({ name, email, passwordHash });

  return res.status(201).json({
    token: signToken(admin._id),
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
};

// 3.2 Login (valida email/senha + devolve token)
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email e password são obrigatórios" });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  return res.json({
    token: signToken(admin._id),
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
};
