const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all colleges
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM colleges");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get single college
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM colleges WHERE id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;   // ✅ VERY IMPORTANT