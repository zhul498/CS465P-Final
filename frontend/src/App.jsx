import { useState } from "react";
import Workouts from "./template/Workouts";
import Progress from "./template/Progress";

const sampleWorkouts = [
  {
    id: 1,
    name: "Push Day",
    date: "2026-11-16",
    notes: "Chest and shoulders",
    sets: [
      { id: 1, exercise: "Bench Press", weight: 135, reps: 10 },
      { id: 2, exercise: "Bench Press", weight: 135, reps: 8 },
      { id: 3, exercise: "Shoulder Press", weight: 50, reps: 10 },
    ],
  },
  {
    id: 2,
    name: "Leg Day",
    date: "2026-11-14",
    notes: "Squats and leg press",
    sets: [
      { id: 4, exercise: "Squat", weight: 185, reps: 8 },
      { id: 5, exercise: "Squat", weight: 185, reps: 6 },
    ],
  },
];

const App = function App() {
  const [page, setPage] = useState("workouts");
  const [workouts, setWorkouts] = useState(sampleWorkouts);

  const addWorkout = function addWorkout(workout) {
    setWorkouts((previousWorkouts) => [workout, ...previousWorkouts]);
  };

  return (
    <>
      <header>
        <h1>LiftLog</h1>
        <p>Log your workouts and track your progress</p>

        <nav aria-label="Main navigation">
          <button type="button" onClick={() => setPage("workouts")}>
            Workouts
          </button>

          <button type="button" onClick={() => setPage("progress")}>
            Progress
          </button>
        </nav>
      </header>

      {page === "workouts" ? (
        <Workouts workouts={workouts} onAddWorkout={addWorkout} />
      ) : (
        <Progress />
      )}
    </>
  );
};

export default App;
