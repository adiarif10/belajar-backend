import express from "express";
import pool from "./db.js";

const app = express();
app.use(express.json());

const port = 3000;

// all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// single users
app.get("/api/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (!result.rows[0]) {
      return res.status(404).json({ message: "id not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// tambah data baru from user
app.post("/api/users", async (req, res) => {
  try {
    const { name, kota } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name, kota) VALUES ($1, $2) RETURNING *",
      [name, kota],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update data
app.put("/api/users/:id", async (req, res) => {
  try {
    // tangkap id
    const id = Number(req.params.id);

    // ambil req body name dan kota
    const { name, kota } = req.body;

    const result = await pool.query(
      "UPDATE users SET name = $1, kota = $2 WHERE id = $3 RETURNING *",
      [name, kota, id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
