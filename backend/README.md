# LiftLog Backend

Express + SQLite (better-sqlite3) REST API for LiftLog.

## Run it

```bash
cd backend
npm install
npm run dev     # restarts on file changes
```

The API runs on `http://localhost:3000`. A `liftlog.db` file is created on first run
and seeded with a few exercises.

## Routes (done in this PR)

| Method | Route                | What it does               |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/workouts`      | List workouts (newest first) |
| POST   | `/api/workouts`      | Create a workout           |
| GET    | `/api/workouts/:id`  | One workout + its sets     |
| PUT    | `/api/workouts/:id`  | Update a workout           |
| DELETE | `/api/workouts/:id`  | Delete a workout + its sets |
| GET    | `/api/exercises`     | List exercises             |

Workout body: `{ "name": "Push Day", "date": "2026-11-16", "notes": "optional" }`

`GET /api/workouts/:id` returns the same shape as the frontend sample data:

```json
{ "id": 1, "name": "Push Day", "date": "2026-11-16", "notes": "",
  "sets": [{ "id": 1, "exercise": "Bench Press", "exercise_id": 1, "weight": 135, "reps": 10 }] }
```

## TODO

- [ ] `POST /api/workouts/:id/sets`, `PUT /api/sets/:id`, `DELETE /api/sets/:id`
- [ ] `GET /api/exercises/:id/progress` (chart data + PR)
- [ ] Tests
- [ ] Accounts / JWT (optional, if time)
