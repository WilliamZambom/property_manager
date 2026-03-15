import dns from "node:dns/promises";
import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/database.js";

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);
console.log(await dns.getServers());

await connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
