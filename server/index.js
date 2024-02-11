const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let students = [];

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:4000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Allow specific methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get("/get-student", (req, res) => {
  const idToSearch = req.query?.id;
  for (let i = 0; i < students.length; i++) {
    if (students[i]["id"] == idToSearch) {
      return res.status(200).send({ student: students[i] });
    }
  }
  return res.status(404).send("Not found");
});

app.post("/add-student", (req, res) => {
  const id = req.body?.id;
  const name = req.body?.name;
  students.push({ id, name });
  return res.status(200).send({ students, message: "Successfully added" });
});

app.delete("/delete-student", (req, res) => {
  const idToDelete = req.body?.id;
  for (let i = 0; i < students.length; i++) {
    if (students[i]["id"] == idToDelete) {
      students.splice(i, 1);
      return res.status(200).send({ students });
    }
  }
  return res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
