const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// GET /api/houses - Get user's houses
router.get('/', async (req, res) => {
  try {
    const [houses] = await pool.query(
      'SELECT id, name, address, contracted_power_kva, has_upac, upac_power_kw, created_at FROM houses WHERE user_id = ?',
      [req.userId]
    );
    return res.json({ houses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/houses - Create new house
router.post('/', async (req, res) => {
  const { name, address, contracted_power_kva, has_upac, upac_power_kw } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'House name is required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO houses (user_id, name, address, contracted_power_kva, has_upac, upac_power_kw) VALUES (?, ?, ?, ?, ?, ?)',
      [req.userId, name, address || null, contracted_power_kva || null, has_upac || 0, upac_power_kw || null]
    );

    const houseId = result.insertId;

    // Initialize energy stats for this house
    await pool.query(
      'INSERT INTO current_energy_stats (house_id) VALUES (?)',
      [houseId]
    );

    return res.status(201).json({
      message: 'House created successfully',
      house: { id: houseId, name, address, contracted_power_kva, has_upac, upac_power_kw }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/rooms - Get rooms in a house
router.get('/:houseId/rooms', async (req, res) => {
  const { houseId } = req.params;

  try {
    // Verify house belongs to user
    const [houses] = await pool.query('SELECT id FROM houses WHERE id = ? AND user_id = ?', [houseId, req.userId]);
    if (!houses.length) {
      return res.status(404).json({ message: 'House not found' });
    }

    const [rooms] = await pool.query(
      'SELECT id, name, created_at FROM rooms WHERE house_id = ? ORDER BY name',
      [houseId]
    );
    
    return res.json({ rooms });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/houses/:houseId/rooms - Add new room
router.post('/:houseId/rooms', async (req, res) => {
  const { houseId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Room name is required' });
  }

  try {
    // Verify house belongs to user
    const [houses] = await pool.query('SELECT id FROM houses WHERE id = ? AND user_id = ?', [houseId, req.userId]);
    if (!houses.length) {
      return res.status(404).json({ message: 'House not found' });
    }

    const [result] = await pool.query(
      'INSERT INTO rooms (house_id, name) VALUES (?, ?)',
      [houseId, name]
    );

    return res.status(201).json({
      message: 'Room created successfully',
      room: { id: result.insertId, house_id: houseId, name }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
