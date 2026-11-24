import { useState } from "react";

const Workouts = function Workouts({ workouts, onAddWorkout }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);

  const selectedWorkout = workouts.find(
    (workout) => workout.id === selectedWorkoutId,
  );

  const closeForm = function closeForm() {
    setShowForm(false);
    setName("");
    setDate("");
    setNotes("");
    setError("");
  };

  const handleSubmit = function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter a workout name.");
      return;
    }

    const workoutDate = new Date(`${date}T00:00:00Z`);

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(workoutDate.getTime()) ||
      workoutDate.toISOString().slice(0, 10) !== date
    ) {
      setError("Please enter a valid workout date.");
      return;
    }

    const newWorkout = {
      id: crypto.randomUUID(),
      name: name.trim(),
      date,
      notes: notes.trim(),
      sets: [],
    };

    onAddWorkout(newWorkout);
    closeForm();
  };

  if (selectedWorkout) {
    const sets = selectedWorkout.sets ?? [];

    return (
      <main>
        <button type="button" onClick={() => setSelectedWorkoutId(null)}>
          Back to Workouts
        </button>

        <h2>{selectedWorkout.name}</h2>
        <time dateTime={selectedWorkout.date}>{selectedWorkout.date}</time>
        <p>{selectedWorkout.notes}</p>

        <h3>Exercises and Sets</h3>

        {sets.length === 0 ? (
          <p>No sets added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th scope="col">Exercise</th>
                <th scope="col">Weight (lb)</th>
                <th scope="col">Reps</th>
              </tr>
            </thead>

            <tbody>
              {sets.map((set) => (
                <tr key={set.id}>
                  <td>{set.exercise}</td>
                  <td>{set.weight}</td>
                  <td>{set.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    );
  }

  return (
    <main>
      <h2>My Workouts</h2>

      <button type="button" onClick={() => setShowForm(true)}>
        New Workout
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <h3>New Workout</h3>

          <div>
            <label htmlFor="workout-name">Workout name</label>
            <input
              id="workout-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="workout-date">Date</label>
            <input
              id="workout-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="workout-notes">Notes</label>
            <textarea
              id="workout-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>

          {error && <p role="alert">{error}</p>}

          <button type="submit">Save Workout</button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </form>
      )}

      {workouts.length === 0 ? (
        <p>No workouts yet. Start by adding your first workout.</p>
      ) : (
        <div>
          {workouts.map((workout) => (
            <article key={workout.id}>
              <h3>
                <button
                  type="button"
                  onClick={() => {
                    closeForm();
                    setSelectedWorkoutId(workout.id);
                  }}
                >
                  {workout.name}
                </button>
              </h3>

              <time dateTime={workout.date}>{workout.date}</time>
              <p>{workout.notes}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Workouts;
