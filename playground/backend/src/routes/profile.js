const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

/**
 * POST /profile
 * Create or update a profile (upsert by email)
 */
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const profile = await Profile.findOneAndUpdate(
      { email },
      req.body,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /profile
 * Fetch profile(s)
 *  - /profile?email=xyz → fetch by email
 *  - /profile?id=123    → fetch by ID
 *  - /profile           → fetch all profiles
 */
router.get('/', async (req, res) => {
  try {
    const { email, id } = req.query;
    let profile;

    if (id) profile = await Profile.findById(id);
    else if (email) profile = await Profile.findOne({ email });
    else profile = await Profile.find();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
