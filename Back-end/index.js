import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./src/api/config/db.js";
import Routes from "./src/api/Routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();
Routes(app);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
