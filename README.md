# LiftLog Frontend

The React and Vite frontend for our workout tracker.

## Run locally

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Current features

- Switch between Workouts and Progress.
- Create a workout with a name, date, and optional notes.
- Reject blank workout names and invalid dates.
- Open a workout to view its exercises, weights, and reps.
- Cancel the workout form and clear its inputs.
- Show an empty message when there are no workouts or sets.

## Current limitations

The app uses sample data and React state. Added workouts reset
when the browser refreshes.

The backend API is not connected yet. Temporary workout IDs will
be replaced with IDs returned by the backend during integration.

Progress is currently a placeholder. Editing and deleting workouts,
managing sets, progress charts, and styling are still planned.

## Checks

```bash
npm run lint
npm run build
```
