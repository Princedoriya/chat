const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String]
}, { _id: false });

const WorkSchema = new mongoose.Schema({
  company: String,
  role: String,
  start: String,
  end: String,
  description: String
}, { _id: false });

const LinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  portfolio: String
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  education: [{ institute: String, degree: String, start: String, end: String }],
  skills: [{ name: String, level: String }],
  projects: [ProjectSchema],
  work: [WorkSchema],
  links: LinksSchema,
  createdAt: { type: Date, default: Date.now }
});

// Full-text index for search so that we can search
ProfileSchema.index({
  'projects.title': 'text',
  'projects.description': 'text',
  name: 'text'
});

module.exports = mongoose.model('Profile', ProfileSchema);
