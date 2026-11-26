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

// Keep errors as { error } JSON (e.g. malformed request JSON, database errors).
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status ?? err.statusCode ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "internal server error" : err.message });
});

app.listen(PORT, () => {
  console.log(`LiftLog API listening on http://localhost:${PORT}`);
});
