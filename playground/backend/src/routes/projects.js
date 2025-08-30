const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

/**
 * GET /projects?skill=react
 * List projects filtered by skill (in project description or profile skills)
 */
router.get('/', async (req, res) => {
  try {
    const { skill } = req.query;
    const profiles = await Profile.find();
    let results = [];

    profiles.forEach(p => {
      p.projects.forEach(pr => {
        const skillMatch = !skill ||
          (pr.description && pr.description.toLowerCase().includes(skill.toLowerCase())) ||
          (p.skills && p.skills.some(s => s.name.toLowerCase() === skill.toLowerCase()));

        if (skillMatch) {
          results.push({
            profileId: p._id,
            ownerName: p.name,
            project: pr
          });
        }
      });
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /projects/skills/top
 * Return aggregated list of top skills
 */
router.get('/skills/top', async (req, res) => {
  try {
    const profiles = await Profile.find();
    const counts = {};

    profiles.forEach(p => {
      (p.skills || []).forEach(s => {
        const n = s.name.toLowerCase();
        counts[n] = (counts[n] || 0) + 1;
      });
    });

    const arr = Object.keys(counts).map(k => ({
      skill: k,
      count: counts[k]
    })).sort((a, b) => b.count - a.count);

    res.json(arr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /projects/search?q=chat
 * Full-text search on project titles, descriptions, and profile names
 */
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const profiles = await Profile.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
