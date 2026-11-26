import { Router } from "express";
import db from "../db.js";

const router = Router();

// GET /api/exercises — list exercises
router.get("/", (req, res) => {
  res.json(db.prepare("SELECT * FROM exercises ORDER BY name").all());
});

export default router;
