import { Router } from "express";
import db from "../db.js";
import { validateWorkout } from "../validate.js";

const router = Router();

const getSets = db.prepare(`
  SELECT s.id, e.name AS exercise, s.exercise_id, s.weight, s.reps
  FROM sets s JOIN exercises e ON e.id = s.exercise_id
  WHERE s.workout_id = ?
  ORDER BY s.id
`);

// GET /api/workouts — list workouts, newest first
router.get("/", (req, res) => {
  const workouts = db
    .prepare("SELECT * FROM workouts ORDER BY date DESC, id DESC")
    .all();
  res.json(workouts);
});

// GET /api/workouts/:id — one workout with its sets
router.get("/:id", (req, res) => {
  const workout = db
    .prepare("SELECT * FROM workouts WHERE id = ?")
    .get(req.params.id);
  if (!workout) return res.status(404).json({ error: "workout not found" });
  res.json({ ...workout, sets: getSets.all(workout.id) });
});

// POST /api/workouts — create a workout
router.post("/", (req, res) => {
  const error = validateWorkout(req.body);
  if (error) return res.status(400).json({ error });

  const { name, date, notes = "" } = req.body;
  const { lastInsertRowid } = db
    .prepare("INSERT INTO workouts (name, date, notes) VALUES (?, ?, ?)")
    .run(name.trim(), date, String(notes).trim());

  const created = db
    .prepare("SELECT * FROM workouts WHERE id = ?")
    .get(lastInsertRowid);
  res.status(201).json({ ...created, sets: [] });
});

// PUT /api/workouts/:id — update a workout
router.put("/:id", (req, res) => {
  const error = validateWorkout(req.body);
  if (error) return res.status(400).json({ error });

  const { name, date, notes = "" } = req.body;
  const { changes } = db
    .prepare("UPDATE workouts SET name = ?, date = ?, notes = ? WHERE id = ?")
    .run(name.trim(), date, String(notes).trim(), req.params.id);
  if (!changes) return res.status(404).json({ error: "workout not found" });

  const updated = db
    .prepare("SELECT * FROM workouts WHERE id = ?")
    .get(req.params.id);
  res.json({ ...updated, sets: getSets.all(updated.id) });
});

// DELETE /api/workouts/:id — delete a workout (its sets cascade)
router.delete("/:id", (req, res) => {
  const { changes } = db
    .prepare("DELETE FROM workouts WHERE id = ?")
    .run(req.params.id);
  if (!changes) return res.status(404).json({ error: "workout not found" });
  res.status(204).end();
});

export default router;
