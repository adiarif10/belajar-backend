import express from "express";

const app = express();
app.use(express.json());

const port = 3000;

// data dummy
const users = [
  { id: 1, name: "Zayn", kota: "Balikpapan" },
  { id: 2, name: "Emilia", kota: "Jakarta" },
  { id: 3, name: "Rem", kota: "Surabaya" },
];

// all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// single users
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// get data from user
app.post("/api/users", (req, res) => {
  const { name, kota } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    kota,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// update data
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, kota } = req.body;
  user.name = name;
  user.kota = kota;

  res.json(user);
});

// delete user
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.json({ message: "User deleted" });
});

// listen
app.listen(port, () => {
  console.log(`App listening port ${port}`);
});
