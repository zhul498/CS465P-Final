import Database from "better-sqlite3";

const db = new Database(process.env.DB_PATH ?? "liftlog.db");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS exercises (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL UNIQUE,
    muscle_group TEXT
  );

  CREATE TABLE IF NOT EXISTS workouts (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    date  TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS sets (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_id  INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL REFERENCES exercises(id),
    reps        INTEGER NOT NULL,
    weight      REAL NOT NULL
  );
`);

// Seed a few common lifts so the exercise list isn't empty on first run.
const seed = db.prepare(
  "INSERT OR IGNORE INTO exercises (name, muscle_group) VALUES (?, ?)",
);
const starterExercises = [
  ["Bench Press", "Chest"],
  ["Shoulder Press", "Shoulders"],
  ["Squat", "Legs"],
  ["Deadlift", "Back"],
  ["Barbell Row", "Back"],
];
starterExercises.forEach(([name, group]) => {
  seed.run(name, group);
});

export default db;
