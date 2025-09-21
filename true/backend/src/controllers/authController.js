const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    if (await User.findOne({ username })) return res.status(400).json({ message: 'Username exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, passwordHash, displayName });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ accessToken: token, user: { id: user._id, username: user.username, displayName: user.displayName, credits: user.credits } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!(await bcrypt.compare(password, user.passwordHash)))
      return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ accessToken: token, user: { id: user._id, username: user.username, displayName: user.displayName, credits: user.credits } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

