import express from "express";
import cors from "cors";
import workouts from "./routes/workouts.js";
import exercises from "./routes/exercises.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors()); // Vite dev server runs on a different port
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/workouts", workouts);
app.use("/api/exercises", exercises);

app.use((req, res) => res.status(404).json({ error: "not found" }));

app.listen(PORT, () => {
  console.log(`LiftLog API listening on http://localhost:${PORT}`);
});
