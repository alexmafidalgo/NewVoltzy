const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// GET /api/user/profile - Get user profile
router.get('/profile', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, name, email, profile_picture_url, created_at FROM users WHERE id = ?',
      [req.userId]
    );

    if (!users.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user: users[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/user/profile - Update user profile
router.put('/profile', async (req, res) => {
  const { name, profile_picture_url } = req.body;

  try {
    // Build dynamic update query
    const updates = [];
    const values = [];

    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    if (profile_picture_url !== undefined) {
      updates.push('profile_picture_url = ?');
      values.push(profile_picture_url);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    values.push(req.userId);
    await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);

    // Fetch updated user
    const [users] = await pool.query(
      'SELECT id, name, email, profile_picture_url FROM users WHERE id = ?',
      [req.userId]
    );

    return res.json({
      message: 'Profile updated successfully',
      user: users[0]
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
