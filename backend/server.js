const express = require("express");

const app = express();
const port = 5001;

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "LiftLog backend is working!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
