const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Helper function to verify house ownership
async function verifyHouseOwnership(houseId, userId) {
  const [houses] = await pool.query('SELECT id FROM houses WHERE id = ? AND user_id = ?', [houseId, userId]);
  return houses.length > 0;
}

// GET /api/houses/:houseId/energy/current - Get current energy stats
router.get('/houses/:houseId/energy/current', async (req, res) => {
  const { houseId } = req.params;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Get current stats
    const [stats] = await pool.query(
      `SELECT lights_on_count, current_consumption_kwh, today_consumption_kwh, today_saved_kwh, last_updated
       FROM current_energy_stats WHERE house_id = ?`,
      [houseId]
    );

    if (!stats.length) {
      // Initialize if not exists
      await pool.query('INSERT INTO current_energy_stats (house_id) VALUES (?)', [houseId]);
      return res.json({
        lights_on_count: 0,
        current_consumption_kwh: 0,
        today_consumption_kwh: 0,
        today_saved_kwh: 0
      });
    }

    return res.json(stats[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/energy/hourly - Get hourly consumption for chart
router.get('/houses/:houseId/energy/hourly', async (req, res) => {
  const { houseId } = req.params;
  const { date } = req.query; // Optional: specific date (YYYY-MM-DD), defaults to today

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    const targetDate = date || new Date().toISOString().split('T')[0];

    const [hourlyData] = await pool.query(
      `SELECT hour, consumption_kwh 
       FROM hourly_consumption 
       WHERE house_id = ? AND date = ?
       ORDER BY hour`,
      [houseId, targetDate]
    );

    // Ensure all 24 hours are present (fill with 0 if missing)
    const fullDayData = [];
    for (let hour = 0; hour < 24; hour++) {
      const existing = hourlyData.find(h => h.hour === hour);
      fullDayData.push({
        hour,
        consumption_kwh: existing ? parseFloat(existing.consumption_kwh) : 0
      });
    }

    return res.json({ date: targetDate, hourly_data: fullDayData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/houses/:houseId/energy/by-room - Get consumption per room
router.get('/houses/:houseId/energy/by-room', async (req, res) => {
  const { houseId } = req.params;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Aggregate consumption by room (based on lights in that room)
    const [roomData] = await pool.query(
      `SELECT 
        l.room_name,
        COUNT(*) as light_count,
        SUM(CASE WHEN l.is_on = 1 THEN 1 ELSE 0 END) as lights_on,
        SUM(CASE WHEN l.is_on = 1 THEN l.power_consumption_watts ELSE 0 END) / 1000 as current_consumption_kw,
        SUM(l.power_consumption_watts) / 1000 as total_capacity_kw
       FROM lights l
       WHERE l.house_id = ?
       GROUP BY l.room_name
       ORDER BY l.room_name`,
      [houseId]
    );

    return res.json({ rooms: roomData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/houses/:houseId/energy/update - Update current energy stats (for testing/simulation)
router.post('/houses/:houseId/energy/update', async (req, res) => {
  const { houseId } = req.params;
  const { lights_on_count, current_consumption_kwh, today_consumption_kwh, today_saved_kwh } = req.body;

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    await pool.query(
      `UPDATE current_energy_stats 
       SET lights_on_count = ?, current_consumption_kwh = ?, today_consumption_kwh = ?, today_saved_kwh = ?
       WHERE house_id = ?`,
      [lights_on_count, current_consumption_kwh, today_consumption_kwh, today_saved_kwh, houseId]
    );

    return res.json({ message: 'Energy stats updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/houses/:houseId/energy/hourly - Add/update hourly consumption data (for testing/simulation)
router.post('/houses/:houseId/energy/hourly', async (req, res) => {
  const { houseId } = req.params;
  const { date, hour, consumption_kwh } = req.body;

  if (date === undefined || hour === undefined || consumption_kwh === undefined) {
    return res.status(400).json({ message: 'date, hour, and consumption_kwh are required' });
  }

  try {
    if (!await verifyHouseOwnership(houseId, req.userId)) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Insert or update
    await pool.query(
      `INSERT INTO hourly_consumption (house_id, date, hour, consumption_kwh)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE consumption_kwh = ?`,
      [houseId, date, hour, consumption_kwh, consumption_kwh]
    );

    return res.json({ message: 'Hourly consumption data saved successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
